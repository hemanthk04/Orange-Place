import { useEffect, useState } from "react";
import MemoryCard from "../components/MemoryCard";
import { motion } from "framer-motion";
import { HouseLine } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

// Game icons
import cherry from "../assets/icons/cherry.png";
import chestnut from "../assets/icons/chestnut.png";
import clove from "../assets/icons/clove.png";
import clover from "../assets/icons/clover.png";
import dryleaf from "../assets/icons/dryleaf.png";
import groundnut from "../assets/icons/groundnut.png";
import leaf from "../assets/icons/leaf.png";
import lotus from "../assets/icons/lotus.png";
import orange from "../assets/icons/orange.png";
import pumpkin from "../assets/icons/pumpkin.png";
import strawberry from "../assets/icons/strawberry.png";
import sunflower from "../assets/icons/sunflower.png";

// Custom Result Icons
import winIcon from "../assets/youwoncard.png";
import loseIcon from "../assets/gameovercard.png";

const icons = [
  cherry,
  chestnut,
  clove,
  clover,
  dryleaf,
  groundnut,
  leaf,
  lotus,
  orange,
  pumpkin,
  strawberry,
  sunflower,
];

const generateShuffledDeck = () => {
  const doubled = [...icons, ...icons];
  return doubled
    .map((icon) => ({ id: crypto.randomUUID(), icon, isMatched: false }))
    .sort(() => Math.random() - 0.5);
};

const MemoryGame = () => {
  const [cards, setCards] = useState(generateShuffledDeck);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [score, setScore] = useState(0);

  const [timeLeft, setTimeLeft] = useState(90);
  const [timerStarted, setTimerStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  const handleCardClick = (cardId) => {
    if (!timerStarted) setTimerStarted(true);
    if (flipped.length === 2 || flipped.includes(cardId)) return;

    const newFlipped = [...flipped, cardId];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped.map((id) =>
        cards.find((c) => c.id === id)
      );

      if (first.icon === second.icon) {
        setMatched((prev) => [...prev, first.id, second.id]);
        setScore((prev) => prev + 1);
      }

      setTimeout(() => setFlipped([]), 1000);
    }
  };

  useEffect(() => {
    if (!timerStarted || timeLeft <= 0 || gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timerStarted, timeLeft, gameOver]);

  useEffect(() => {
    if (matched.length === 24) {
      setWin(true);
      setGameOver(true);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [matched, timeLeft]);

  const restart = () => {
    setCards(generateShuffledDeck());
    setFlipped([]);
    setMatched([]);
    setScore(0);
    setTimeLeft(150);
    setTimerStarted(false);
    setGameOver(false);
    setWin(false);
  };

  return (
    <div className="min-h-screen grid-bg bg-repeat flex flex-col items-center justify-center relative">
      {/* Header */}
      <div className="w-full flex justify-between items-center px-12 py-2 absolute top-4">
        <Link to="/">
          <div className="bg-[#E37303] rounded-full p-3 cursor-pointer shadow-lg">
            <HouseLine size={28} color="white" />
          </div>
        </Link>

        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-5xl font-bold">
          Memory Cards
        </h1>

        <div className="flex items-center gap-4">
          <div className="bg-[#E37303] text-white px-4 py-4 rounded-md shadow">
            Score: {score}
          </div>
          <div className="bg-black text-white px-4 py-4 rounded-md shadow">
            Time Left:{" "}
            {Math.floor(timeLeft / 60)
              .toString()
              .padStart(2, "0")}
            :{(timeLeft % 60).toString().padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* Game Grid */}
      <div className="flex flex-1 items-center justify-center w-full mt-20">
        <div className="grid grid-cols-6 gap-4">
          {cards.map((card) => (
            <MemoryCard
              key={card.id}
              icon={card.icon}
              isFlipped={flipped.includes(card.id) || matched.includes(card.id)}
              isMatched={matched.includes(card.id)}
              onClick={() => handleCardClick(card.id)}
            />
          ))}
        </div>
      </div>

      {/* Game Over Modal */}
      {gameOver && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        >
          <div className="relative bg-white rounded-[32px] px-10 py-8 text-center w-[320px] shadow-xl">
            {/* Close Button */}
            <button className="absolute top-4 right-4" onClick={restart}>
              <div className="bg-gray-200 rounded-full p-1 hover:bg-gray-300 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </button>

            {/* 3D Image */}
            <img
              src={win ? winIcon : loseIcon}
              alt="Result Icon"
              className="w-20 h-20 mx-auto mb-4"
            />

            {/* Title */}
            <h2 className="text-2xl font-bold mb-6">
              {win ? "You Won !" : "Game Over !"}
            </h2>

            {/* Play Again */}
            <button
              onClick={restart}
              className="bg-[#E37303] hover:bg-orange-600 transition text-white font-semibold py-2 px-6 rounded-full"
            >
              Play again
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MemoryGame;
