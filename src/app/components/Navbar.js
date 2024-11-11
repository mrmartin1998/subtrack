import Link from "next/link";

export default function Navbar() {
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
        </div>
      </div>
    </nav>
  );
}
