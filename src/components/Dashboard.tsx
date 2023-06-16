import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#004449] text-black">
      <h1 className="text-4xl font-bold mb-8 text-[#d7ffc2]">GoalFlow Dashboard</h1>

      <div className="bg-white rounded shadow-md p-4 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Long-Term Goals</h2>

        <ul className="space-y-2">
          <li className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-black">Goal 1</span>
            </div>
            <button className="text-red-500">
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </li>
          <li className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-black">Goal 2</span>
            </div>
            <button className="text-red-500">
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </li>
          {/* ... */}
        </ul>

        <h2 className="text-lg font-bold my-4">Short-Term Goals</h2>

        <ul className="space-y-2">
          <li className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-black">Goal A</span>
            </div>
            <button className="text-red-500">
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </li>
          <li className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-black">Goal B</span>
            </div>
            <button className="text-red-500">
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </li>
          {/* ... */}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
