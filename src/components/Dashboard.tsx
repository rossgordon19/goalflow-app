import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, getDoc } from 'firebase/firestore';
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
  const [loading, setLoading] = useState(true);

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
        }[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          completed: doc.data().completed,
          period: doc.data().period,
        }));
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

  const activeGoals = goals.filter((goal) => !goal.completed);
  const completedGoals = goals.filter((goal) => goal.completed);
  const weekGoals = activeGoals.filter((goal) => goal.period === 'week');
  const monthGoals = activeGoals.filter((goal) => goal.period === 'month');
  const yearGoals = activeGoals.filter((goal) => goal.period === 'year');

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#004449] text-black px-4 md:px-0">
      <h1 className="text-4xl font-bold mb-8 text-[#d7ffc2]">Dashboard</h1>
      <div className="bg-white rounded shadow-md p-4 w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0">
            <input
              type="text"
              placeholder="New goal"
              className="border p-2 flex-grow"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
            />
            <select
              className="border p-2"
              value={goalPeriod}
              onChange={(e) => setGoalPeriod(e.target.value)}
            >
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
            <button
              className="w-full md:w-auto bg-blue-500 text-white p-2"
              onClick={handleAddGoal}
            >
              Add
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <h2 className="font-bold text-lg">This Week</h2>
              <div className="space-y-2">
                {weekGoals.map((goal) => (
                  <GoalItem
                    key={goal.id}
                    goal={goal}
                    updateGoal={updateGoal}
                    deleteGoal={handleDeleteGoal}
                    editGoal={handleEditGoal}
                    editingGoalId={editingGoalId}
                    editingGoalName={editingGoalName}
                    setEditingGoalName={setEditingGoalName}
                    saveEditedGoal={saveEditedGoal}
                  />
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-bold text-lg">This Month</h2>
              <div className="space-y-2">
                {monthGoals.map((goal) => (
                  <GoalItem
                    key={goal.id}
                    goal={goal}
                    updateGoal={updateGoal}
                    deleteGoal={handleDeleteGoal}
                    editGoal={handleEditGoal}
                    editingGoalId={editingGoalId}
                    editingGoalName={editingGoalName}
                    setEditingGoalName={setEditingGoalName}
                    saveEditedGoal={saveEditedGoal}
                  />
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-bold text-lg">This Year</h2>
              <div className="space-y-2">
                {yearGoals.map((goal) => (
                  <GoalItem
                    key={goal.id}
                    goal={goal}
                    updateGoal={updateGoal}
                    deleteGoal={handleDeleteGoal}
                    editGoal={handleEditGoal}
                    editingGoalId={editingGoalId}
                    editingGoalName={editingGoalName}
                    setEditingGoalName={setEditingGoalName}
                    saveEditedGoal={saveEditedGoal}
                  />
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-bold text-lg">Completed Goals</h2>
              <div className="space-y-2">
                {completedGoals.map((goal) => (
                  <GoalItem
                    key={goal.id}
                    goal={goal}
                    updateGoal={updateGoal}
                    deleteGoal={handleDeleteGoal}
                    editGoal={handleEditGoal}
                    editingGoalId={editingGoalId}
                    editingGoalName={editingGoalName}
                    setEditingGoalName={setEditingGoalName}
                    saveEditedGoal={saveEditedGoal}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 text-[#d7ffc2]">Number of completed goals: {completedGoals.length}</div>
    </div>
  );
};

interface GoalItemProps {
  goal: {
    id: string;
    name: string;
    completed: boolean;
    period: string;
  };
  updateGoal: (goalId: string) => Promise<void>;
  deleteGoal: (goalId: string) => Promise<void>;
  editGoal: (goalId: string, goalName: string) => void;
  editingGoalId: string | null;
  editingGoalName: string;
  setEditingGoalName: React.Dispatch<React.SetStateAction<string>>;
  saveEditedGoal: () => Promise<void>;
}

const GoalItem: React.FC<GoalItemProps> = ({
  goal,
  updateGoal,
  deleteGoal,
  editGoal,
  editingGoalId,
  editingGoalName,
  setEditingGoalName,
  saveEditedGoal,
}) => {
  return (
    <div className="flex justify-between items-center border p-2">
      {editingGoalId === goal.id ? (
        <>
          <input
            type="text"
            className="border p-2 flex-grow"
            value={editingGoalName}
            onChange={(e) => setEditingGoalName(e.target.value)}
          />
          <button
            className="ml-2 p-2 bg-green-500 text-white"
            onClick={saveEditedGoal}
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </>
      ) : (
        <>
          <p className={goal.completed ? 'line-through' : ''}>{goal.name}</p>
          <div className="space-x-2">
            <button className="p-2" onClick={() => updateGoal(goal.id)}>
              <FontAwesomeIcon icon={faCheck} />
            </button>
            <button className="p-2" onClick={() => editGoal(goal.id, goal.name)}>
              <FontAwesomeIcon icon={faPen} />
            </button>
            <button className="p-2" onClick={() => deleteGoal(goal.id)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
