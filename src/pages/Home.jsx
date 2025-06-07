import GameCard from "../components/GameCard";
import { useNavigate } from "react-router-dom";
import cakeIcon from "../assets/icons/cake.png";
import cardsIcon from "../assets/icons/card.png";
import faceIcon from "../assets/icons/avatar.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen grid-bg flex flex-col items-center px-4 text-center pt-12 pb-8">
      {/* Top Title */}
      <h1 className="text-[#E37303] text-6xl font-bold mb-8">Orange Place</h1>

      {/* Centered Game Cards */}
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="flex gap-24 flex-wrap justify-center">
          <GameCard
            icon={cakeIcon}
            label="Bakery"
            onClick={() => navigate("/bakery")}
          />
          <GameCard
            icon={cardsIcon}
            label="Memory Cards"
            onClick={() => navigate("/memorycards")}
          />
          <GameCard
            icon={faceIcon}
            label="Face Builder"
            onClick={() => navigate("/face")}
          />
        </div>
      </div>

      {/* Footer */}
      <a
        href="https://github.com/hemanthk04/Orange-Place" // <-- replace with actual link
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#222222] text-white py-2 px-4 rounded-md font-medium hover:scale-105 transition mt-4 mb-0 inline-block"
      >
        Check GitHub Repo ↗
      </a>
    </div>
  );
};

export default Home;
