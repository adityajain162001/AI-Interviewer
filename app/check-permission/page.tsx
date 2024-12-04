import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CheckPermission() {
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  const checkPermissions = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setPermissionsGranted(true);
    } catch (err) {
      console.error("Permission denied:", err);
      setPermissionsGranted(false);
    }
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-xl font-bold">Checking Permissions...</h1>
      {permissionsGranted ? (
        <Link href="/question">
          <button className="mt-6 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Proceed to Questions
          </button>
        </Link>
      ) : (
        <p className="mt-4 text-red-500">Please enable camera and microphone permissions.</p>
      )}
    </div>
  );
}
