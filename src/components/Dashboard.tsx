import { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPen, faCheck } from '@fortawesome/free-solid-svg-icons';
import { getAuth } from 'firebase/auth';

const Dashboard: React.FC = () => {
  const [newGoal, setNewGoal] = useState('');
  const [goalPeriod, setGoalPeriod] = useState('week');
  const [goals, setGoals] = useState<
    { id: string; name: string; completed: boolean; period: string }[]
  >([]);
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [editingGoalName, setEditingGoalName] = useState('');
  const [loading, setLoading] = useState(true); // New state variable

  const auth = getAuth();

  const handleAddGoal = async () => {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      const goalsCollectionRef = collection(userDocRef, 'goals');
      const docRef = await addDoc(goalsCollectionRef, {
        name: newGoal,
        period: goalPeriod,
        completed: false,
      });
      const createdGoal = {
        id: docRef.id,
        name: newGoal,
        period: goalPeriod,
        completed: false,
      };
      setGoals((prevGoals) => [...prevGoals, createdGoal]);
      setNewGoal('');
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const goalsCollectionRef = collection(userDocRef, 'goals');
        const querySnapshot = await getDocs(goalsCollectionRef);
        const data: {
          id: string;
          name: string;
          completed: boolean;
          period: string;
        }[] = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            completed: doc.data().completed,
            period: doc.data().period,
          }))
          .filter((goal) => !goal.completed);
        setGoals(data);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const updateGoal = async (goalId: string) => {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      const goalRef = doc(userDocRef, 'goals', goalId);
      const goalSnapshot = await getDoc(goalRef);
      const completed = goalSnapshot.data()?.completed;

      await updateDoc(goalRef, { completed: !completed });

      setGoals((prevGoals) =>
        prevGoals.map((goal) =>
          goal.id === goalId ? { ...goal, completed: !completed } : goal
        )
      );
    }
  };

  const handleDeleteGoal = async (goalId: string) => {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      const goalRef = doc(userDocRef, 'goals', goalId);
      await deleteDoc(goalRef);
      setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId));
    }
  };

  const handleEditGoal = (goalId: string, goalName: string) => {
    setEditingGoalId(goalId);
    setEditingGoalName(goalName);
  };

  const saveEditedGoal = async () => {
    const user = auth.currentUser;
    if (user && editingGoalId) {
      const userDocRef = doc(db, 'users', user.uid);
      const goalRef = doc(userDocRef, 'goals', editingGoalId);
      await updateDoc(goalRef, { name: editingGoalName });
      setGoals((prevGoals) =>
        prevGoals.map((goal) =>
          goal.id === editingGoalId ? { ...goal, name: editingGoalName } : goal
        )
      );
      setEditingGoalId(null);
      setEditingGoalName('');
    }
  };

  const weekGoals = goals.filter((goal) => goal.period === 'week');
  const monthGoals = goals.filter((goal) => goal.period === 'month');
  const yearGoals = goals.filter((goal) => goal.period === 'year');

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#004449] text-black px-4 sm:px-0">
      <h1 className="text-4xl font-bold mb-8 text-[#d7ffc2]">
        GoalFlow Dashboard
      </h1>
      <div className="bg-white rounded shadow-md p-4 w-full max-w-md">
        <div className="flex items-center justify-center mb-4">
          <input
            type="text"
            placeholder="Enter your goal here"
            className="mr-2 p-2 flex-grow border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
          />
          <select
            className="mr-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={goalPeriod}
            onChange={(e) => setGoalPeriod(e.target.value)}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <button
            className="p-2 bg-[#004449] text-white rounded hover:bg-[#0eff80] hover:text-black"
            onClick={handleAddGoal}
          >
            Set Goal
          </button>
        </div>

        {loading ? (
          <p className="text-center text-xl text-gray-600">Loading...</p>
        ) : goals.length === 0 ? (
          <p className="text-center text-xl text-gray-600">
            You currently have no set goals.
          </p>
        ) : (
          <>
            <h2 className="font-bold text-2xl">This Week:</h2>
            <ul className="space-y-2">
              {weekGoals.map((goal) => (
                <li
                  key={goal.id}
                  className={`flex justify-between items-center p-2 ${
                    goal.completed ? 'line-through' : ''
                  }`}
                >
                  <div>
                    <input
                      type="checkbox"
                      checked={goal.completed}
                      onChange={() => updateGoal(goal.id)}
                      className="mr-2"
                    />
                    {editingGoalId === goal.id ? (
                      <input
                        type="text"
                        value={editingGoalName}
                        onChange={(e) => setEditingGoalName(e.target.value)}
                        className="mr-2"
                      />
                    ) : (
                      <span>{goal.name}</span>
                    )}
                  </div>
                  <div>
                    {editingGoalId === goal.id ? (
                      <button onClick={saveEditedGoal}>
                        <div className="icon-container mr-4">
                          <FontAwesomeIcon icon={faCheck} />
                        </div>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditGoal(goal.id, goal.name)}
                      >
                        <div className="icon-container mr-4">
                          <FontAwesomeIcon icon={faPen} />
                        </div>
                      </button>
                    )}
                    <button onClick={() => handleDeleteGoal(goal.id)}>
                      <div className="icon-container mr-4">
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </div>
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <h2 className="font-bold text-2xl">This Month:</h2>
            <ul className="space-y-2">
              {monthGoals.map((goal) => (
                <li
                  key={goal.id}
                  className={`flex justify-between items-center p-2 ${
                    goal.completed ? 'line-through' : ''
                  }`}
                >
                  <div>
                    <input
                      type="checkbox"
                      checked={goal.completed}
                      onChange={() => updateGoal(goal.id)}
                      className="mr-2"
                    />
                    {editingGoalId === goal.id ? (
                      <input
                        type="text"
                        value={editingGoalName}
                        onChange={(e) => setEditingGoalName(e.target.value)}
                        className="mr-2"
                      />
                    ) : (
                      <span>{goal.name}</span>
                    )}
                  </div>
                  <div>
                    {editingGoalId === goal.id ? (
                      <button onClick={saveEditedGoal}>
                        <div className="icon-container mr-4">
                          <FontAwesomeIcon icon={faCheck} />
                        </div>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditGoal(goal.id, goal.name)}
                      >
                        <div className="icon-container mr-4">
                          <FontAwesomeIcon icon={faPen} />
                        </div>
                      </button>
                    )}
                    <button onClick={() => handleDeleteGoal(goal.id)}>
                      <div className="icon-container mr-4">
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </div>
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <h2 className="font-bold text-2xl">This Year:</h2>
            <ul className="space-y-2">
              {yearGoals.map((goal) => (
                <li
                  key={goal.id}
                  className={`flex justify-between items-center p-2 ${
                    goal.completed ? 'line-through' : ''
                  }`}
                >
                  <div>
                    <input
                      type="checkbox"
                      checked={goal.completed}
                      onChange={() => updateGoal(goal.id)}
                      className="mr-2"
                    />
                    {editingGoalId === goal.id ? (
                      <input
                        type="text"
                        value={editingGoalName}
                        onChange={(e) => setEditingGoalName(e.target.value)}
                        className="mr-2"
                      />
                    ) : (
                      <span>{goal.name}</span>
                    )}
                  </div>
                  <div>
                    {editingGoalId === goal.id ? (
                      <button onClick={saveEditedGoal}>
                        <div className="icon-container mr-4">
                          <FontAwesomeIcon icon={faCheck} />
                        </div>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditGoal(goal.id, goal.name)}
                      >
                        <div className="icon-container mr-4">
                          <FontAwesomeIcon icon={faPen} />
                        </div>
                      </button>
                    )}
                    <button onClick={() => handleDeleteGoal(goal.id)}>
                      <div className="icon-container mr-4">
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </div>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
