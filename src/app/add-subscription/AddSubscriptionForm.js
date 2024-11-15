"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function AddSubscriptionForm() {
  const [formData, setFormData] = useState({ name: "", price: "", dueDate: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const isEditing = searchParams.get("edit") === "true";
  const editingId = searchParams.get("id");

  useEffect(() => {
    if (isEditing) {
      const fetchSubscription = async () => {
        const token = localStorage.getItem("token");
        setLoading(true);
        try {
          const res = await fetch(`/api/subscriptions/${editingId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.ok) {
            const { data } = await res.json();
            setFormData(data);
            setError(null);
          } else {
            setError("Failed to load subscription for editing");
          }
        } catch (err) {
          console.error(err);
          setError("An error occurred while loading subscription data");
        } finally {
          setLoading(false);
        }
      };
      fetchSubscription();
    }
  }, [isEditing, editingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    if (!formData.name || !formData.price || !formData.dueDate) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await fetch(
        isEditing ? `/api/subscriptions/${editingId}` : "/api/subscriptions",
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        setSuccess(
          isEditing
            ? "Subscription updated successfully!"
            : "Subscription added successfully!"
        );
        router.push("/dashboard");
      } else {
        const { message } = await res.json();
        setError(message || "Failed to save subscription");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while saving the subscription");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">
          {isEditing ? "Edit Subscription" : "Add Subscription"}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: parseFloat(e.target.value) })
              }
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Due Date</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {isEditing ? "Update Subscription" : "Add Subscription"}
          </button>
        </form>
      </div>
    </div>
  );
}
