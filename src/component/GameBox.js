import "./GameBox.css";

function GameBox({ value, handleBoxClick }) {
  return (
    <div>
      <div className="gameBoard-box" onClick={handleBoxClick}>
        <div className="gameBoard-box_value">{value}</div>
      </div>
    </div>
  );
}

export default GameBox;
