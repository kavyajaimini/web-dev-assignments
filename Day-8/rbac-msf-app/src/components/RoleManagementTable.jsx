import React from 'react';


const RoleManagementTable = ({ roles, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Role</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Permissions</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map(role => (
            <tr key={role.id} className="border-t border-gray-200">
              <td className="py-2 px-4">{role.name}</td>
              <td className="py-2 px-4">{role.permissions.join(', ')}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => onEdit(role)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(role)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleManagementTable;
