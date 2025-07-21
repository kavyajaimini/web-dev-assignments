import React from 'react';

const EmployeeOnboardChoiceModal = ({ open, onClose, onContinue, onViewDashboard }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative flex flex-col items-center">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4 text-blue-700">Already Onboarded?</h2>
        <p className="mb-6 text-gray-700 text-center">It looks like you may have already onboarded as an employee. What would you like to do?</p>
        <div className="flex flex-col gap-4 w-full">
          <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold" onClick={onViewDashboard}>
            View Dashboard
          </button>
          <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 font-semibold" onClick={onContinue}>
            Onboard as New Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeOnboardChoiceModal;
