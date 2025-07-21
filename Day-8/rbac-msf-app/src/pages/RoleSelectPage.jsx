import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRBAC } from "../rbac/RBACProvider";
import EmployeeOnboardChoiceModal from "../components/EmployeeOnboardChoiceModal";

const RoleSelectPage = () => {
  const navigate = useNavigate();
  const { setRole, setPermissions } = useRBAC();
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);

  const getEmployeeRecord = () => {
    const all = JSON.parse(localStorage.getItem("employees") || "[]");
    return all.find((e) => e.role === "Employee");
  };

  const handleSelect = (role) => {
    setRole(role);
    if (role === "HR") {
      setPermissions(["manage_users", "view_dashboard"]);
      navigate("/dashboard");
    } else {
      setPermissions(["view_dashboard", "submit_form"]);
      if (getEmployeeRecord()) {
        setShowEmployeeModal(true);
      } else {
        navigate("/onboarding");
      }
    }
  };

  const handleViewDashboard = () => {
    setShowEmployeeModal(false);
    navigate("/dashboard");
  };
  const handleOnboardNew = () => {
    setShowEmployeeModal(false);
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 px-2">
      <div className="bg-white border border-blue-100 rounded-2xl shadow p-6 sm:p-8 w-full max-w-sm flex flex-col items-center">
        <h1 className="text-xl sm:text-2xl font-bold mb-5 text-blue-900 tracking-tight">
          Select Your Role
        </h1>
        <button
          className="w-full py-2 sm:py-3 mb-3 sm:mb-4 rounded bg-blue-700 text-white font-medium border border-blue-800 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-200 text-base sm:text-lg transition"
          onClick={() => handleSelect("HR")}
        >
          HR
        </button>
        <button
          className="w-full py-2 sm:py-3 rounded bg-gray-100 text-blue-900 font-medium border border-gray-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 text-base sm:text-lg transition"
          onClick={() => handleSelect("Employee")}
        >
          Employee
        </button>
      </div>
      <EmployeeOnboardChoiceModal
        open={showEmployeeModal}
        onClose={() => setShowEmployeeModal(false)}
        onViewDashboard={handleViewDashboard}
        onContinue={handleOnboardNew}
      />
    </div>
  );
};

export default RoleSelectPage;
