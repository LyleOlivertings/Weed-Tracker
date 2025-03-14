'use client';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-green-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Weed Strain Tracker</h1>
        <div>
          {session ? (
            <div className="flex items-center gap-4">
              <span>Welcome, {session.user.name}</span>
              <button 
                onClick={() => signOut()}
                className="bg-white text-green-600 px-4 py-2 rounded hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <a href="/login" className="hover:underline">Login</a>
              <a href="/register" className="hover:underline">Register</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}