"use client";

import { useState, useEffect } from "react";
import SubscriptionCard from "./components/SubscriptionCard";
import QuickStats from "./components/QuickStats";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [subscriptions, setSubscriptions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedSubscriptions =
      JSON.parse(localStorage.getItem("subscriptions")) || [];
    setSubscriptions(storedSubscriptions);
  }, []);

  const handleDelete = (id) => {
    const updatedSubscriptions = subscriptions.filter((sub) => sub.id !== id);
    setSubscriptions(updatedSubscriptions);
    localStorage.setItem("subscriptions", JSON.stringify(updatedSubscriptions));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <QuickStats subscriptions={subscriptions} />
      <button
        onClick={() => router.push("/add-subscription")}
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
      >
        Add Subscription
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {subscriptions.map((sub) => (
          <SubscriptionCard
            key={sub.id}
            subscription={sub}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
