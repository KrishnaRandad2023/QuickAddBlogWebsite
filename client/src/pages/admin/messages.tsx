import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";

type Message = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

const AdminMessagesPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredMessages = messages.filter((msg) =>
    [msg.name, msg.email, msg.subject].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [, navigate] = useLocation();

  // 🚨 Protect route
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "true") {
      setIsAuthenticated(true);
    } else {
      navigate("/admin/login");
    }
  }, []);

  // 🧠 Auto logout after 10 minutes of inactivity
  useEffect(() => {
    const logoutTimer = setTimeout(() => {
      localStorage.removeItem("isAdmin");
      window.location.href = "/admin/login";
    }, 10 * 60 * 1000); // 10 minutes

    const resetTimer = () => clearTimeout(logoutTimer);
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    return () => {
      clearTimeout(logoutTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, []);

  // ✅ Fetch messages
  useEffect(() => {
    if (!isAuthenticated) return;

    fetch("/api/messages", {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ADMIN_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
        setLoading(false);
      });
  }, [isAuthenticated]);

  // 🗑️ Delete message
  const handleDelete = async (id: number) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this message?"
      );
      if (!confirm) return;

      await fetch(`/api/messages/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_ADMIN_TOKEN}`,
        },
      });

      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin/login");
  };

  if (!isAuthenticated) return null;

  if (loading) {
    return <div className="p-6">Loading messages...</div>;
  }
  const exportToCSV = () => {
    const headers = ["ID", "Name", "Email", "Subject", "Message", "Created At"];
    const rows = messages.map((msg) => [
      msg.id,
      msg.name,
      msg.email,
      msg.subject,
      msg.message.replace(/\n/g, " "), // prevent breaking rows
      new Date(msg.createdAt).toLocaleString(),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((row) => row.map(String).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "contact_messages.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Contact Messages</h1>
        <button
          onClick={exportToCSV}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          📥 Export CSV
        </button>
        <input
          type="text"
          placeholder="Search by name, email, or subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded"
        />

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((msg) =>  (
            <div key={msg.id} className="border p-4 rounded shadow relative">
              <button
                onClick={() => handleDelete(msg.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
              >
                🗑️ Delete
              </button>

              <div className="mb-2">
                <strong>Name:</strong> {msg.name}
              </div>
              <div className="mb-2">
                <strong>Email:</strong> {msg.email}
              </div>
              <div className="mb-2">
                <strong>Subject:</strong> {msg.subject}
              </div>
              <div className="mb-2">
                <strong>Message:</strong>
                <p className="ml-2">{msg.message}</p>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(msg.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessagesPage;
