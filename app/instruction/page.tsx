"use client";  // Mark this as a Client Component

import React from "react";

interface InstructionScreenProps {
  onStart: () => void;
}

export default function InstructionScreen({ onStart }: InstructionScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">Welcome to the AI Interview Test</h2>
      <p className="text-lg mb-4">Before you begin, please follow the instructions below:</p>
      <ul className="text-left mb-6 list-inside">
        <li>1. Ensure your camera and microphone are properly set up.</li>
        <li>2. Follow the on-screen instructions for recording your answers.</li>
        <li>3. Make sure you have a stable internet connection.</li>
        <li>4. Click &apos;Start Test&rsquo; to begin the interview.</li>
      </ul>
      <button
        onClick={onStart}
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Start Test
      </button>
    </div>
  );
}
