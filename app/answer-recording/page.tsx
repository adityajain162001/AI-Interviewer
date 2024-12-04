"use client";  // Mark this component as a Client Component

import React, { useRef, useState } from "react";

export default function AnswerRecording() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [chunks, setChunks] = useState<Blob[]>([]);
  const [isRecordingStarted, setIsRecordingStarted] = useState(false); // To track if recording has started

  // Start recording
  const startRecording = async () => {
    try {
      // Request access to the user's camera and microphone
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      // Display the video feed in the video element
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Create a MediaRecorder to record the stream
      mediaRecorderRef.current = new MediaRecorder(stream);

      // Collect chunks of the recording
      mediaRecorderRef.current.ondataavailable = (event) => {
        setChunks((prevChunks) => [...prevChunks, event.data]);
      };

      // When the recording stops, process and create the video URL
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const videoUrl = URL.createObjectURL(blob);
        setVideoUrl(videoUrl); // Store the recorded video
      };

      mediaRecorderRef.current.start();
      setRecording(true);
      setIsRecordingStarted(true);  // Mark that recording has started
    } catch (err) {
      console.error("Error accessing media devices.", err);
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div>
      <h2>Record Your Answer</h2>
      <div>
        {/* Display live video feed */}
        <video ref={videoRef} autoPlay muted />
        {/* Display recorded video if available */}
        {videoUrl && (
          <div>
            <h3>Recorded Answer:</h3>
            <video src={videoUrl} controls />
          </div>
        )}
      </div>
      
      {/* Recording buttons */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={startRecording}
          disabled={recording || isRecordingStarted}
          style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px" }}
        >
          Start Recording
        </button>
        <button
          onClick={stopRecording}
          disabled={!recording}
          style={{ padding: "10px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "5px", marginLeft: "10px" }}
        >
          Stop Recording
        </button>
      </div>

      {/* Feedback after recording */}
      {isRecordingStarted && !recording && <p>Your answer has been recorded!</p>}
    </div>
  );
}
