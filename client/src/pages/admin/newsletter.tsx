import { useEffect, useState } from "react";
import { useLocation } from "wouter";

type Subscriber = {
  id: number;
  email: string;
  createdAt: string;
  active: boolean;
};

const NewsletterAdminPage = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [, navigate] = useLocation();

  // 🧠 Protect the route
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      navigate("/admin/login");
    }
  }, []);

  // 📩 Fetch subscribers
  useEffect(() => {
    fetch("/api/newsletter-subscribers", {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ADMIN_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSubscribers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching subscribers:", err);
        setLoading(false);
      });
  }, []);

  if (!localStorage.getItem("isAdmin")) return null;

  if (loading) {
    return <div className="p-6">Loading subscribers...</div>;
  }

  const exportToCSV = () => {
    const headers = ["ID", "Email", "Created At", "Active"];
    const rows = subscribers.map((sub) => [
      sub.id,
      sub.email,
      new Date(sub.createdAt).toLocaleString(),
      sub.active ? "Yes" : "No",
    ]);
  
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows]
        .map((row) => row.map(String).join(","))
        .join("\n");
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "newsletter_subscribers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Newsletter Subscribers</h1>
        <button
          onClick={exportToCSV}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          📥 Export CSV
        </button>
      </div>
  
      {subscribers.length === 0 ? (
        <p>No subscribers yet.</p>
      ) : (
        <ul className="space-y-2">
          {subscribers.map((sub) => (
            <li key={sub.id} className="p-4 border rounded shadow-sm">
              <div><strong>Email:</strong> {sub.email}</div>
              <div className="text-sm text-gray-500">
                Subscribed on: {new Date(sub.createdAt).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">
                Status: {sub.active ? "✅ Active" : "❌ Inactive"}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}; 

export default NewsletterAdminPage;
