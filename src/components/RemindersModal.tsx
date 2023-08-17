import React, { useState } from 'react';

const RemindersModal = ({ isOpen, closeModal }) => {
  const [email, setEmail] = useState('');
  const [reminderMessage, setReminderMessage] = useState('');
  const [reminderFrequency, setReminderFrequency] = useState('daily');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleReminderMessageChange = (e) => {
    setReminderMessage(e.target.value);
  };

  const handleReminderFrequencyChange = (e) => {
    setReminderFrequency(e.target.value);
  };

  const handleSetReminders = (e) => {
    e.preventDefault();
    // Logic to set reminders goes here
  };

  if (!isOpen) return null;
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div
        className="inline-block align-bottom bg-[#004449] text-[#d7ffc2] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-labelledby="modal-headline"
      >
        <div className="bg-[#004449] px-10 py-10 sm:px-6 flex flex-col items-center">
          <button
            onClick={closeModal}
            className="ml-auto bg-transparent border-0 text-[#d7ffc2] hover:text-gray-700"
            aria-label="Close modal"
          >
            <span className="sr-only">Close modal</span>
            <span aria-hidden="true">X</span>
          </button>
          <h3
            className="text-lg leading-6 font-medium text-[#d7ffc2]"
            id="modal-headline"
          >
            Set Reminders
          </h3>
          <form className="mt-4 w-full sm:w-64" onSubmit={handleSetReminders}>
            <input
              className="w-full p-2 border border-gray-300 rounded mb-2 text-black"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
              aria-label="Email"
            />
            <textarea
              className="w-full p-2 border border-gray-300 rounded mb-2 text-black h-32 resize-y"
              placeholder="Reminder Message"
              value={reminderMessage}
              onChange={handleReminderMessageChange}
              required
              aria-label="Reminder Message"
            />
            <select
              className="w-full p-2 border border-gray-300 rounded mb-2 text-black"
              value={reminderFrequency}
              onChange={handleReminderFrequencyChange}
              aria-label="Reminder Frequency"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <button
              type="submit"
              className="w-full p-2 bg-[#d7ffc2] text-black rounded flex justify-center items-center mb-2"
            >
              Set Reminders
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RemindersModal;
