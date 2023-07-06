import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

const Dashboard: React.FC = () => {
  const [goals, setGoals] = useState<{ id: string; name: string }[]>([]);
  const usersCollectionRef = collection(db, 'goals');

  useEffect(() => {
    const getGoals = async () => {
      const data = await getDocs(usersCollectionRef);
      console.log(data); // Check the fetched data in the browser console
      setGoals(data.docs.map((doc) => ({ id: doc.id, name: doc.data().name })));
    };

    getGoals();
  }, []);

  const handleDeleteGoal = (goalId: string) => {
    // Implement delete functionality here
    console.log(`Deleting goal with ID: ${goalId}`);
  };

  const handleAddGoal = () => {
    // Implement add goal functionality here
    console.log('Adding a new goal');
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#004449] text-black">
      <h1 className="text-4xl font-bold mb-8 text-[#d7ffc2]">
        GoalFlow Dashboard
      </h1>
      <div className="bg-white rounded shadow-md p-4 w-full max-w-md">
        <ul className="space-y-2">
          {goals.map((goal) => (
            <li key={goal.id} className="flex items-center justify-between">
              <input type="checkbox" className="mr-2" />
              <span className="flex-grow">{goal.name}</span>
              <FontAwesomeIcon
                icon={faTrashAlt}
                onClick={() => handleDeleteGoal(goal.id)}
              />
            </li>
          ))}
        </ul>
        <div className="flex justify-center mt-4">
          <input
            type="text"
            placeholder="Add Goal"
            className="py-2 px-4 border border-gray-300 rounded-l mr-2"
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
