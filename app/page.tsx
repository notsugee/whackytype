"use client";
import { useState } from "react";
import Header from "./components/Header";

export default function Home() {
  const starterText = "Lorem Ipsum is simply dummy Ipsum.";
  const [startTime, setStartTime] = useState<number | undefined>(undefined);
  const [score, setScore] = useState(0);
  const [words, setWords] = useState(0);
  const [text, setText] = useState({
    default: "",
    highlighted: "",
  });
  const wpm = startTime
    ? (words / ((new Date().getTime() - startTime) / 60000)).toFixed(0)
    : "0";

  return (
    <>
      <Header />
      <div className="mx-auto max-w-3xl relative top-28 items-center justify-items-center">
        <p>score: {score}</p>
        <p>words: {words}</p>
        <p>WPM: {wpm}</p>
        {score === 0 ? (
          <p className="text-gray-500 z-30">{starterText}</p>
        ) : (
          <div>
            <p className="text-white inline">{text.highlighted}</p>
            <p className="text-gray-500 inline">{text.default}</p>
          </div>
        )}
        <div className="flex justify-center">
          <input
            className="absolute text-black w-full h-full top-0 z-0 opacity-0"
            onChange={() => {
              if (!startTime) {
                setStartTime(new Date().getTime());
              }
              const newScore = score + 1;
              setScore(newScore);

              if (starterText.charAt(newScore) === " ") {
                setWords(words + 1);
              }

              setText({
                highlighted: starterText.slice(0, newScore),
                default: starterText.slice(newScore, starterText.length),
              });

              if (newScore === starterText.length) {
                setStartTime(undefined);
                setScore(0);
                setWords(0);
                setText({
                  highlighted: "",
                  default: "",
                });
                alert("Your wpm is " + wpm);
              }
            }}
          />
        </div>
      </div>
    </>
  );
}
