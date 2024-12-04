"use client";  // Add this line to make it a Client Component

import React, { useState } from "react";

const questions = [
  { id: 1, text: "What are your strengths?", audio: "/audio/question1.mp3" },
  { id: 2, text: "Where do you see yourself in 5 years?", audio: "/audio/question2.mp3" },
];

export default function Question() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTestCompleted, setIsTestCompleted] = useState(false); // Track if the test is completed

  const handleNext = () => {
    if (currentQuestion === questions.length - 1) {
      setIsTestCompleted(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      {!isTestCompleted ? (
        <>
          <h1 className="text-xl font-bold mb-4">{questions[currentQuestion].text}</h1>
          <audio
            controls
            src={questions[currentQuestion].audio}
            className="mt-4"
            aria-label={`Question audio ${currentQuestion + 1}`}
          />
          <button
            onClick={handleNext}
            aria-label={currentQuestion === questions.length - 1 ? "Finish the test" : "Go to the next question"}
            className={`mt-6 px-6 py-2 rounded text-white transition-all duration-300 ${
              currentQuestion === questions.length - 1
                ? "bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300"
                : "bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
            }`}
          >
            {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
          </button>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Test Completed!</h2>
          <p className="text-lg">Thank you for completing the test.</p>
        </div>
      )}
    </div>
  );
}
