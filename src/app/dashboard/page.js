"use client"; // For Next.js App Router
import { useState } from "react";
import SubscriptionCard from "./components/SubscriptionCard";
import QuickStats from "./components/QuickStats";

export default function Dashboard() {
    const [subscriptions, setSubscriptions] = useState([
      { id: 1, name: "Netflix", price: 15.99, dueDate: "2024-11-15" },
      { id: 2, name: "Spotify", price: 9.99, dueDate: "2024-11-20" },
      { id: 3, name: "Disney+", price: 7.99, dueDate: "2024-11-25" },
    ]);
  
    const handleDelete = (id) => {
      setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
    };
  
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
        <QuickStats subscriptions={subscriptions} />
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
  