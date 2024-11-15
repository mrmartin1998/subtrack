"use client";

import { useState } from "react";

export default function Signup() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      setSuccess("Account created successfully!");
      setError(null);
    } else {
      const { message } = await res.json();
      setError(message || "Signup failed");
      setSuccess(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Signup</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
