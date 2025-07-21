import React, { useEffect, useState, useCallback } from "react";
import { useRBAC } from "../rbac/RBACProvider";

const fetchEmployees = () => {
  try {
    return JSON.parse(localStorage.getItem("employees") || "[]");
  } catch {
    return [];
  }
};

const DashboardPage = () => {
  const { role } = useRBAC();
  const [employees, setEmployees] = useState(fetchEmployees());
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const syncEmployees = () => setEmployees(fetchEmployees());
    window.addEventListener("storage", syncEmployees);
    return () => window.removeEventListener("storage", syncEmployees);
  }, []);

  const handleStatus = useCallback((id, status) => {
    setEmployees((prev) => {
      const updated = prev.map((emp) =>
        emp.id === id ? { ...emp, status } : emp
      );
      localStorage.setItem("employees", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const openDetails = useCallback((emp) => {
    setSelectedEmp(emp);
    setShowModal(true);
  }, []);
  const closeModal = useCallback(() => {
    setShowModal(false);
    setSelectedEmp(null);
  }, []);

  const renderPhoto = (photo) => {
    if (!photo) return "—";
    if (
      typeof photo === "string" &&
      (photo.startsWith("blob:") ||
        photo.startsWith("data:") ||
        photo.startsWith("http"))
    )
      return (
        <img
          src={photo}
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover border"
        />
      );
    if (photo instanceof File || photo instanceof Blob)
      return (
        <img
          src={URL.createObjectURL(photo)}
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover border"
        />
      );
    return "—";
  };

  const renderFileLink = (file) => {
    if (!file) return "—";
    if (
      typeof file === "string" &&
      (file.startsWith("blob:") ||
        file.startsWith("data:") ||
        file.startsWith("http"))
    )
      return (
        <a
          href={file}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          View
        </a>
      );
    if (file instanceof File || file instanceof Blob)
      return (
        <a
          href={URL.createObjectURL(file)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          View
        </a>
      );
    return "—";
  };

  if (role === "HR") {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-2">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow border border-gray-200 p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            All Employees
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 text-left font-semibold text-gray-700">
                    Photo
                  </th>
                  <th className="py-2 px-4 text-left font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="py-2 px-4 text-left font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="py-2 px-4 text-left font-semibold text-gray-700">
                    Role
                  </th>
                  <th className="py-2 px-4 text-left font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="py-2 px-4 text-left font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {employees.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-gray-500">
                      No employees found.
                    </td>
                  </tr>
                ) : (
                  employees.map((emp) => (
                    <tr
                      key={emp.id}
                      className="border-t border-gray-200 hover:bg-blue-50 transition"
                    >
                      <td className="py-2 px-4">{renderPhoto(emp.photo)}</td>
                      <td className="py-2 px-4">
                        {emp.firstName} {emp.lastName}
                      </td>
                      <td className="py-2 px-4">{emp.email}</td>
                      <td className="py-2 px-4">{emp.role}</td>
                      <td className="py-2 px-4 capitalize">{emp.status}</td>
                      <td className="py-2 px-4 flex gap-2">
                        <button
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                          onClick={() => handleStatus(emp.id, "approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                          onClick={() => handleStatus(emp.id, "rejected")}
                        >
                          Reject
                        </button>
                        <button
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                          onClick={() => openDetails(emp)}
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {showModal && selectedEmp && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 w-full max-w-lg relative animate-fadeIn">
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  &times;
                </button>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  Employee Details
                </h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-gray-700 w-32">
                      Photo:
                    </span>
                    {renderPhoto(selectedEmp.photo)}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-gray-700 w-32">
                      Name:
                    </span>
                    <span>
                      {selectedEmp.firstName} {selectedEmp.lastName}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-gray-700 w-32">
                      Email:
                    </span>
                    <span>{selectedEmp.email}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-gray-700 w-32">
                      Role:
                    </span>
                    <span>{selectedEmp.role}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-gray-700 w-32">
                      Resume:
                    </span>
                    {renderFileLink(selectedEmp.resume)}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-gray-700 w-32">
                      ID Proof:
                    </span>
                    {renderFileLink(selectedEmp.idProof)}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-gray-700 w-32">
                      Status:
                    </span>
                    <span className="capitalize font-semibold">
                      {selectedEmp.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const onboarding = employees.find((e) => e.role === "Employee");
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-2">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow border border-gray-200 p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
        {onboarding ? (
          <>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Your Onboarding Details
            </h2>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-gray-700 w-40">Photo:</span>
                {renderPhoto(onboarding.photo)}
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-gray-700 w-40">Name:</span>
                <span>
                  {onboarding.firstName} {onboarding.lastName}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-gray-700 w-40">Email:</span>
                <span>{onboarding.email}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-gray-700 w-40">Role:</span>
                <span>{onboarding.role}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-gray-700 w-40">
                  Resume:
                </span>
                {renderFileLink(onboarding.resume)}
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-gray-700 w-40">
                  ID Proof:
                </span>
                {renderFileLink(onboarding.idProof)}
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-gray-700 w-40">
                  Status:
                </span>
                <span className="capitalize font-semibold">
                  {onboarding.status}
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="text-gray-500">No onboarding data found.</div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
