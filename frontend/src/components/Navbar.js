import React from 'react';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();

  // Check if the current page is Admin
  const isAdminPage = router.pathname === '/admin';

  return (
    <nav className="bg-blue-800 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Travel Agency</h1>
        <ul className="flex space-x-4">
          {isAdminPage ? (
            // Show only "Bookings" on Admin Page
            <li>
              <button
                onClick={() => router.push('/bookings')}
                className="hover:text-gray-300 transition"
              >
                Bookings
              </button>
            </li>
          ) : (
            // Default Navbar Links
            <>
              <li>
                <button
                  onClick={() => router.push('/')}
                  className="hover:text-gray-300 transition"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push('/admin')}
                  className="hover:text-gray-300 transition"
                >
                  Admin Panel
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push('/bookings')}
                  className="hover:text-gray-300 transition"
                >
                  Bookings
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
