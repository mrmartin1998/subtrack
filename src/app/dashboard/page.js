"use client";

import { useState, useEffect } from "react";
import SubscriptionCard from "./components/SubscriptionCard";
import QuickStats from "./components/QuickStats";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null); // Add error state
  const router = useRouter();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const token = localStorage.getItem("token"); // Retrieve the token

      if (!token) {
        // Redirect to login if token doesn't exist
        router.push("/auth/login");
        return;
      }

      try {
        const res = await fetch("/api/subscriptions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setSubscriptions(data.data); // Set fetched subscriptions
          setError(null); // Clear any previous errors
        } else if (res.status === 401) {
          // Handle unauthorized access
          router.push("/auth/login");
        } else {
          setError("Failed to load subscriptions");
        }
      } catch (error) {
        console.error("Failed to fetch subscriptions:", error);
        setError("An error occurred while fetching subscriptions");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchSubscriptions();
  }, [router]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`/api/subscriptions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setSubscriptions((prev) => prev.filter((sub) => sub._id !== id)); // Filter out deleted subscription
        setError(null); // Clear any error messages
      } else {
        setError("Failed to delete subscription");
      }
    } catch (error) {
      console.error("Error deleting subscription:", error);
      setError("An error occurred while deleting the subscription");
    }
  };

  const handleEdit = (subscription) => {
    router.push(`/add-subscription?edit=true&id=${subscription._id}`); // Redirect to the edit page
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => router.reload()}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Reload
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <QuickStats subscriptions={subscriptions} />
      <button
        onClick={() => router.push("/add-subscription")}
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
      >
        Add Subscription
      </button>
      {subscriptions.length === 0 ? (
        <p className="text-gray-700 mt-4">No subscriptions available. Add a new subscription to get started!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {subscriptions.map((sub) => (
            <SubscriptionCard
              key={sub._id}
              subscription={sub}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}
