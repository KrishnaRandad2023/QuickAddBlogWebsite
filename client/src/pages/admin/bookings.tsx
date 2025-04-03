import { useEffect, useState } from "react";
import { useLocation } from "wouter";

type Booking = {
  id: number;
  name: string;
  email: string;
  company: string;
  phone: string;
  notes: string;
  date: string;
  time: string;
  consultationType: string;
  createdAt: string;
};

const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [, navigate] = useLocation();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      navigate("/admin/login");
    }
  }, []);

  useEffect(() => {
    fetch("/api/bookings", {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ADMIN_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setLoading(false);
      });
  }, []);

  if (!localStorage.getItem("isAdmin")) return null;

  if (loading) {
    return <div className="p-6">Loading bookings...</div>;
  }
  const exportToCSV = () => {
    const headers = [
      "ID", "Name", "Email", "Company", "Phone", "Consultation Type", "Date", "Time", "Notes", "Created At"
    ];
  
    const rows = bookings.map((b) => [
      b.id,
      b.name,
      b.email,
      b.company || "-",
      b.phone || "-",
      b.consultationType,
      b.date,
      b.time,
      b.notes?.replace(/\n/g, " ") || "-",
      new Date(b.createdAt).toLocaleString(),
    ]);
  
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((r) => r.map(String).join(",")).join("\n");
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "call_bookings.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
  <h1 className="text-2xl font-bold">Consultation Bookings</h1>
  <button
    onClick={exportToCSV}
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  >
    📥 Export CSV
  </button>
</div>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li key={booking.id} className="border p-4 rounded shadow-sm">
              <div className="font-semibold">{booking.consultationType}</div>
              <div><strong>Name:</strong> {booking.name}</div>
              <div><strong>Email:</strong> {booking.email}</div>
              <div><strong>Company:</strong> {booking.company || "—"}</div>
              <div><strong>Phone:</strong> {booking.phone || "—"}</div>
              <div><strong>Notes:</strong> {booking.notes || "—"}</div>
              <div className="text-sm text-muted-foreground mt-2">
                {booking.date} at {booking.time} • booked on {new Date(booking.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminBookingsPage;
