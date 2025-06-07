import { useEffect, useState } from "react";
import MemoryCard from "../components/MemoryCard";
import { motion } from "framer-motion";
import { HouseLine } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

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

  const [timeLeft, setTimeLeft] = useState(150);
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
      {/* Header Row */}
      <div className="w-full flex justify-between items-center px-12 py-6 absolute top-4">
        <Link to="/">
          <div className="bg-[#E37303] rounded-full p-3 cursor-pointer shadow-lg">
            <HouseLine size={28} color="white" />
          </div>
        </Link>

        {/* Absolute Center Title */}
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

      {/* Game Grid - Centered */}
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
          <div className="bg-white p-8 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">
              {win ? "🎉 You Won!" : "⏰ Time's Up! You Lost!"}
            </h2>
            <button
              onClick={restart}
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md"
            >
              Play Again
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MemoryGame;
