const GameCard = ({ icon, label, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer text-center transition-transform hover:scale-110"
  >
    <img src={icon} alt={label} className="w-56 mx-auto mb-2" />
    <p className="font-semibold">{label}</p>
  </div>
);

export default GameCard;
