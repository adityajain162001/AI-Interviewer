"use client";  // Mark this as a Client Component

import React, { useState } from "react";
import InstructionScreen from './instruction/page';  // Correct import path
import QuestionScreen from './question/page'; // Assuming you have a Question Screen

export default function Home() {
  const [startTest, setStartTest] = useState(false);

  const handleStartTest = () => {
    setStartTest(true);
  };

  return (
    <div>
      {!startTest ? (
        <InstructionScreen onStart={handleStartTest} />
      ) : (
        <QuestionScreen />
      )}
    </div>
  );
}