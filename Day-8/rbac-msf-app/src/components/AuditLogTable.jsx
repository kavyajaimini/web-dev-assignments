import React from 'react';


const AuditLogTable = ({ logs }) => {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Action</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">User</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Date</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id} className="border-t border-gray-200">
              <td className="py-2 px-4">{log.action}</td>
              <td className="py-2 px-4">{log.user}</td>
              <td className="py-2 px-4">{log.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditLogTable;
