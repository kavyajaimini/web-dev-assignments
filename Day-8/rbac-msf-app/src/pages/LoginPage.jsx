
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { defaultPermissions } from "../rbac/permissions";




const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "", role: "HR" });
  const [error, setError] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (user) {
      if (user.role === "HR") {
        navigate("/dashboard", { replace: true });
      } else if (user.role === "Employee") {
        navigate("/onboarding", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username.trim() || !form.password.trim()) {
      setError("Username and password are required.");
      return;
    }
    if (form.role !== "HR" && form.role !== "Employee") {
      setError("Invalid role selected.");
      return;
    }
    if (form.role === "HR" && !form.username.toLowerCase().startsWith("hr")) {
      setError("HR username must start with 'hr'.");
      return;
    }
    if (form.role === "Employee" && !form.username.toLowerCase().startsWith("employee")) {
      setError("Employee username must start with 'employee'.");
      return;
    }
    if (form.password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }
    login({
      id: form.username,
      name: form.username,
      role: form.role,
      permissions: defaultPermissions[form.role] || [],
    });
    if (form.role === "HR") {
      navigate("/dashboard");
    } else {
      navigate("/onboarding");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 px-2">
      <div className="bg-white border border-blue-100 rounded-2xl shadow p-6 sm:p-8 w-full max-w-sm flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-5 text-blue-900 tracking-tight">
          Login
        </h1>
        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium text-gray-700 mb-1" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="border border-blue-100 bg-blue-50 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="border border-blue-100 bg-blue-50 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
              autoComplete="current-password"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-1" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
              className="border border-blue-100 bg-blue-50 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
              
            >
              <option value="HR">HR</option>
              <option value="Employee">Employee</option>
            </select>
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 bg-blue-700 text-white font-medium rounded hover:bg-blue-800 transition"

          >
            Login
          </button>
        </form>
        {/* <div className="mt-4 text-xs text-gray-500 text-center">
          <div>Demo HR: <b>hr / hr123</b></div>
          <div>Demo Employee: <b>employee / emp123</b></div>
        </div> */}
      </div>
    </div>
  );
};

export default LoginPage;
