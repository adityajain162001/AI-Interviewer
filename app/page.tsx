"use client";  // Mark this component as a Client Component

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CheckPermission() {
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setPermissionGranted(true);
      } catch (err) {
        setPermissionGranted(false);
      }
    };

    checkPermissions();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">Check Permission</h2>
      {permissionGranted ? (
        <p>Permissions granted! You can proceed to the next step.</p>
      ) : (
        <p>Permission denied! Please enable camera access.</p>
      )}
      <Link href="/next-step">
        <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Proceed
        </button>
      </Link>
    </div>
  );
}
