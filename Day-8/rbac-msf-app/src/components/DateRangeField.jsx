import React from 'react';


const DateRangeField = ({ startDate, endDate, onChange, error }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center space-x-4">
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">Start Date</label>
          <input
            type="date"
            value={startDate || ''}
            onChange={e => onChange({ startDate: e.target.value, endDate })}
            className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">End Date</label>
          <input
            type="date"
            value={endDate || ''}
            onChange={e => onChange({ startDate, endDate: e.target.value })}
            className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      {error && <span className="text-red-600 ml-2 text-sm">{error}</span>}
    </div>
  );
};

export default DateRangeField;
