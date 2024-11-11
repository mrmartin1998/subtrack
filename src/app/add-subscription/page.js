"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function AddSubscription() {
  const [formData, setFormData] = useState({ name: "", price: "", dueDate: "" });
  const searchParams = useSearchParams();
  const router = useRouter();

  const isEditing = searchParams.get("edit") === "true";
  const editingId = parseFloat(searchParams.get("id"));

  useEffect(() => {
    if (isEditing) {
      const subscriptions =
        JSON.parse(localStorage.getItem("subscriptions")) || [];
      const editingSubscription = subscriptions.find(
        (sub) => sub.id === editingId
      );
      if (editingSubscription) {
        setFormData(editingSubscription);
      }
    }
  }, [isEditing, editingId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const subscriptions =
      JSON.parse(localStorage.getItem("subscriptions")) || [];
    let updatedSubscriptions;

    if (isEditing) {
      // Replace the subscription with the edited one
      updatedSubscriptions = subscriptions.map((sub) =>
        sub.id === editingId ? { ...sub, ...formData } : sub
      );
    } else {
      // Add a new subscription
      const newSubscription = {
        id: Math.random(),
        ...formData,
        price: parseFloat(formData.price),
      };
      updatedSubscriptions = [...subscriptions, newSubscription];
    }

    localStorage.setItem("subscriptions", JSON.stringify(updatedSubscriptions));
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">
          {isEditing ? "Edit Subscription" : "Add Subscription"}
        </h2>
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
