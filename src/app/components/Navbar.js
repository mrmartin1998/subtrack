"use client";

import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { token, isHydrated, logout } = useAuth(); // Get hydration state
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  // Prevent rendering until hydration is complete
  if (!isHydrated) {
    return null;
  }

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/dashboard" className="font-bold text-lg">
          SubTrack
        </Link>
        <div className="space-x-4">
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/add-subscription" className="hover:underline">
            Add Subscription
          </Link>
          <Link href="/profile" className="hover:underline">
            Profile
          </Link>
          {token ? (
            <button
              onClick={handleLogout}
              className="hover:underline bg-red-500 px-2 py-1 rounded"
            >
              Logout
            </button>
          ) : (
            <Link href="/auth/login" className="hover:underline">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
