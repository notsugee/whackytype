"use client";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Globe from "@/app/assets/globe.svg";
import Image from "next/image";
import Pointer from "@/app/assets/pointer.svg";

export default function Home() {
  const wordsArray = [
    "a",
    "is",
    "the",
    "it",
    "to",
    "in",
    "and",
    "for",
    "of",
    "on",
    "with",
    "you",
    "this",
    "that",
    "he",
    "she",
    "they",
    "we",
    "can",
    "will",
    "have",
    "not",
    "but",
    "what",
    "all",
    "your",
    "or",
    "from",
    "at",
    "be",
    "by",
    "about",
    "as",
    "are",
    "so",
    "up",
    "if",
    "do",
    "was",
    "has",
    "just",
    "like",
    "more",
    "some",
    "other",
    "out",
    "one",
    "also",
    "time",
    "over",
    "then",
    "how",
    "my",
    "now",
    "new",
    "people",
    "day",
    "into",
    "who",
    "know",
    "good",
    "see",
    "after",
    "back",
    "first",
    "make",
    "them",
    "work",
    "get",
    "use",
    "because",
    "go",
    "two",
    "no",
    "only",
    "could",
    "her",
    "him",
    "think",
    "being",
    "our",
    "need",
    "many",
    "want",
    "really",
    "life",
    "around",
    "down",
    "off",
    "here",
    "too",
    "little",
    "find",
    "well",
    "every",
    "right",
    "help",
    "try",
    "best",
    "call",
    "long",
    "same",
    "lot",
    "mean",
    "ask",
    "let",
    "sure",
    "away",
    "hand",
    "different",
    "home",
    "small",
    "thought",
    "feel",
    "place",
    "world",
    "big",
    "give",
    "why",
    "always",
    "great",
  ];

  const generateRandomText = () => {
    return (
      Array.from(
        { length: 40 },
        () => wordsArray[Math.floor(Math.random() * wordsArray.length)]
      ).join(" ") + " ".repeat(2)
    );
  };

  const [starterText, setStarterText] = useState("Loading...");
  const [startTime, setStartTime] = useState<number | undefined>(undefined);
  const [score, setScore] = useState(0);
  const [words, setWords] = useState(0);
  const [text, setText] = useState({
    default: "",
    highlighted: "",
  });
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [finalWpm, setFinalWpm] = useState("0");
  const [isInactive, setIsInactive] = useState(false);

  const wpm = startTime
    ? (words / ((new Date().getTime() - startTime) / 60000)).toFixed(0)
    : "0";

  useEffect(() => {
    setStarterText(generateRandomText());
  }, []);

  const handleTestComplete = () => {
    setShowResults(false);
    setStarterText(generateRandomText());
    setIsInputDisabled(false);
  };

  const handleFocus = () => {
    setIsInactive(false);
    setIsInputDisabled(false);
  };

  return (
    <>
      <Header />
      <div className="flex relative mx-auto max-w-24 hover:opacity-85 transition-opacity top-28 cursor-pointer mb-4 justify-center gap-x-4 items-center z-10 opacity-35">
        <Image src={Globe} alt="Globe" className="w-4 h-4 invert" />
        <p>english</p>
      </div>
      <div className="mx-auto max-w-7xl relative top-28 items-center justify-items-center">
        <div className="relative">
          {score === 0 ? (
            <p className="opacity-35 leading-relaxed text-3xl z-2">
              {starterText}
            </p>
          ) : (
            <div>
              <p className="inline leading-relaxed text-3xl">
                {text.highlighted}
              </p>
              <p className="opacity-35 leading-relaxed inline text-3xl">
                {text.default}
              </p>
            </div>
          )}

          {isInactive && (
            <div
              className="absolute inset-0 backdrop-blur-sm flex items-center justify-center cursor-pointer"
              onClick={() => {
                const inputElement = document.querySelector("input");
                if (inputElement) {
                  inputElement.focus();
                }
                handleFocus();
              }}
            >
              <Image src={Pointer} alt="Pointer" className="w-5 h-5" />
              <p className="text-lg opacity-70">Click here to focus</p>
            </div>
          )}
        </div>

        <input
          className="absolute w-full h-full top-0 z-0 opacity-0"
          onChange={() => {
            if (isInputDisabled) return;

            if (!startTime) {
              setStartTime(new Date().getTime());
            }
            const newScore = score + 1;
            setScore(newScore);
            if (starterText.charAt(newScore - 1) === " ") {
              setWords(words + 1);
            }
            setText({
              highlighted: starterText.slice(0, newScore),
              default: starterText.slice(newScore),
            });
            if (newScore === starterText.length) {
              setFinalWpm(wpm);
              setShowResults(true);
              setIsInputDisabled(true);
              setStartTime(undefined);
              setScore(0);
              setWords(0);
              setText({
                highlighted: "",
                default: "",
              });
            }
          }}
          onBlur={() => {
            setIsInactive(true);
            setIsInputDisabled(true);
          }}
          onFocus={handleFocus}
        />
      </div>

      {showResults && (
        <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur flex items-center justify-center z-50">
          <div className="bg-transparent text-center p-6 max-w-sm w-full mx-4">
            <div className="mb-6">
              <span className="text-5xl text-[#e2b714]">{finalWpm}</span>
              <span className="text-3xl opacity-40 ml-2">wpm</span>
            </div>
            <button
              onClick={handleTestComplete}
              className="text-lg opacity-35 hover:opacity-85 transition-opacity"
            >
              tap to try again
            </button>
          </div>
        </div>
      )}
    </>
  );
}
