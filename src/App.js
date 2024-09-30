import "./App.css";
import GameBox from "./component/GameBox";
import { useState } from "react";

function App() {
  const [history, setHistory] = useState([{ square: Array(9).fill(null) }]); // 과거로의 시간여행을 위한 배열
  const [turn, setTurn] = useState(true); // X, O 교차를 위함
  const [travel, setTravel] = useState(0); // 과거로 갈때 현재의 state를 기억하기 위함

  const numberOfCases = (item) => {
    const list = [
      [0, 1, 2], // 1행
      [3, 4, 5], // 2행
      [6, 7, 8], // 3행
      [0, 3, 6], // 1열
      [1, 4, 7], // 2열
      [2, 5, 8], // 3열
      [0, 4, 8], // 1대각선
      [2, 4, 6], // 2대각선
    ];

    for (let i = 0; i < list.length; i++) {
      const [a, b, c] = list[i];
      // XXX or OOO, &&: 둘 중에 하나라도 거짓이면 거짓(= 둘 다 참이여야지만 참)
      if (item[a] && item[a] === item[b] && item[a] === item[c]) {
        return item[a]; // X or O
      }
    }
    return null;
  };

  // current는 객체임 ex) {square: [null, null, "X", null, ...]};
  const current = history[history.length - 1]; // 가장 마지막 상태(현재)
  const winner = numberOfCases(current.square); // 우승자

  const handleClick = (i) => {
    console.log("history", history);
    const copyBox = current.square.slice();
    // winner(우승자)가 나왔거나 상자에 이미 값이 있으면 끝내기(return)!
    if (winner || copyBox[i]) {
      return;
    }
    // 참이면 X 거짓이면 O
    copyBox[i] = turn ? "X" : "O";

    // setHistory에 스프레드 연산자 사용해서 값 넣기
    setHistory([...history, { square: copyBox }]);
    // XO 교차
    setTurn(!turn);
    // setTravel에 현재 history의 배열길이 저장
    setTravel(history.length);
  };

  // result가 될 수 있는 것 : X, O, null
  // null인 경우에는 "Next turn is ${turn}"이고 default값으로 "Winner is ${winner}"

  let result;
  let isDraw = true; // true는 무승부일 경우

  switch (winner) {
    case null:
      result = `Next turn is ${turn ? "X" : "O"}`;
      break;
    default:
      result = `Winner is ${winner}`;
      isDraw = false;
  }

  // if (winner) {
  //   result = `Winner is ${winner}`;
  //   isDraw = ""; // winner가 나오면 무승부표시X(마지막에 winner와 무승부 겹치는 상황 방지)
  // } else {
  //   result = `Next turn is ${turn ? "X" : "O"}`;
  // }

  // 한 칸이라도 null이 있는 상태라면 isDraw=""이고 else는 isDraw="It's a DRAW!"
  for (let i = 0; i < current.square.length; i++) {
    if (current.square[i] === null) {
      isDraw = false;
    } else {
    }
  }

  if (isDraw) {
    // true니까 무승부
    isDraw = "It's a DRAW!";
    result = "";
  } else {
    // false니까 표시하면X
    isDraw = "";
  }

  const handleTravelClick = (i) => {
    setTravel(i);
    setHistory(history.slice(0, i + 1));
    setTurn(i % 2 === "X"); // 참이면 X 거짓이면 O
  };

  // map() 쓸 때에는 무조건 return 할 것!!!!!!!!
  const moveBtn = history.map((value, index) => {
    return (
      <li>
        <button key={index} onClick={() => handleTravelClick(index)}>
          {/* false는 go to start, 이외에는 go to {index}, 0은 falsy한 값이기 때문 */}
          {index ? `go to ${index}` : "go to start"}
        </button>
      </li>
    );
  });

  const handleReset = () => {
    setHistory([{ square: Array(9).fill(null) }]);
    setTurn(true);
  };

  return (
    <div className="App">
      <div className="gameBoard-container">
        <p>TIC TAC TOE</p>
        <div className="gameBoard">
          <GameBox
            value={current.square[0]}
            handleBoxClick={() => handleClick(0)}
          />
          <GameBox
            value={current.square[1]}
            handleBoxClick={() => handleClick(1)}
          />
          <GameBox
            value={current.square[2]}
            handleBoxClick={() => handleClick(2)}
          />
          <GameBox
            value={current.square[3]}
            handleBoxClick={() => handleClick(3)}
          />
          <GameBox
            value={current.square[4]}
            handleBoxClick={() => handleClick(4)}
          />
          <GameBox
            value={current.square[5]}
            handleBoxClick={() => handleClick(5)}
          />
          <GameBox
            value={current.square[6]}
            handleBoxClick={() => handleClick(6)}
          />
          <GameBox
            value={current.square[7]}
            handleBoxClick={() => handleClick(7)}
          />
          <GameBox
            value={current.square[8]}
            handleBoxClick={() => handleClick(8)}
          />
        </div>
        <div className="gameBoard-result">
          <div>{result}</div>
          <div>{isDraw}</div>
          <button onClick={handleReset}>reset</button>
        </div>
      </div>
      <ol className="gameBoard-button">{moveBtn}</ol>
    </div>
  );
}

export default App;
