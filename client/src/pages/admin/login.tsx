import { useState } from "react";
import { useLocation } from "wouter";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [, navigate] = useLocation();
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Set your admin password here (can be moved to env later)
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin/messages");
    }
     else {
      setError("Invalid password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form onSubmit={handleLogin} className="p-6 bg-white shadow rounded w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <input
          type="password"
          placeholder="Enter Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full p-2 mb-4 rounded"
        />
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
