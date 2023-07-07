import { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashAlt,
  faPlus,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { getAuth } from 'firebase/auth';

const Dashboard: React.FC = () => {
  const [newGoal, setNewGoal] = useState('');
  const [goals, setGoals] = useState<
    { id: string; name: string; completed: boolean }[]
  >([]);
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [editingGoalName, setEditingGoalName] = useState('');

  const usersCollectionRef = collection(db, 'goals');
  const auth = getAuth();

  // Create Goal
  const handleAddGoal = async () => {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      const goalsCollectionRef = collection(userDocRef, 'goals');
      const docRef = await addDoc(goalsCollectionRef, {
        name: newGoal,
        completed: false,
      });
      const createdGoal = { id: docRef.id, name: newGoal, completed: false };
      setGoals((prevGoals) => [...prevGoals, createdGoal]);
      setNewGoal('');
    }
  };

  // Read Goal
  useEffect(() => {
    const getGoals = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const goalsCollectionRef = collection(userDocRef, 'goals');
        const querySnapshot = await getDocs(goalsCollectionRef);
        const data: { id: string; name: string; completed: boolean }[] = querySnapshot.docs.map(
          (doc) => ({
            id: doc.id,
            name: doc.data().name,
            completed: doc.data().completed,
          })
        );
        setGoals(data);
      }
    };

    getGoals();
  }, [auth]);

  // Update Goal
  const updateGoal = async (goalId: string) => {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      const goalRef = doc(userDocRef, 'goals', goalId);
      await updateDoc(goalRef, { name: editingGoalName });
      setGoals((prevGoals) =>
        prevGoals.map((goal) =>
          goal.id === goalId ? { ...goal, name: editingGoalName } : goal
        )
      );
      setEditingGoalId(null);
    }
  };

  // Delete Goal
  const handleDeleteGoal = async (goalId: string) => {
    await deleteDoc(doc(db, 'goals', goalId));
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId));
    console.log(`Deleting goal with ID: ${goalId}`);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#004449] text-black">
      <h1 className="text-4xl font-bold mb-8 text-[#d7ffc2]">
        GoalFlow Dashboard
      </h1>
      <div className="bg-white rounded shadow-md p-4 w-full max-w-md">
        <ul className="space-y-2">
          {goals.map((goal) => (
            <li
              key={goal.id}
              className={`flex items-center justify-between ${
                goal.completed ? 'line-through text-gray-400' : ''
              }`}
            >
              {editingGoalId === goal.id ? (
                <>
                  <input
                    type="text"
                    value={editingGoalName}
                    onChange={(e) => setEditingGoalName(e.target.value)}
                    className="flex-grow py-2 px-4 border border-gray-300 rounded-l mr-2"
                  />
                  <button
                    className="flex items-center justify-center"
                    onClick={() => updateGoal(goal.id)}
                  >
                    <span
                      className="checkmark"
                      onClick={() => updateGoal(goal.id)}
                    >
                      {'\u2713'}
                    </span>
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={goal.completed}
                    onChange={() => updateGoal(goal.id)}
                  />
                  <span className="flex-grow">{goal.name}</span>
                  <button>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="mr-2"
                      onClick={() => {
                        setEditingGoalId(goal.id);
                        setEditingGoalName(goal.name);
                      }}
                    />
                  </button>
                  <button>
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      onClick={() => handleDeleteGoal(goal.id)}
                    />
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
        <div className="flex justify-center mt-4">
          <input
            type="text"
            placeholder="Add Goal"
            className="py-2 px-4 border border-gray-300 rounded-l mr-2"
            value={newGoal}
            onChange={(event) => {
              setNewGoal(event.target.value);
            }}
          />
          <button
            className="flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-r hover:bg-blue-600"
            onClick={handleAddGoal}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add Goal
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
