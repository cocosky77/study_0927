# tic tac toe 게임을 리액트로 만들어보기 - 9일차

처음부터 시간여행 구현까지 새로운 파일에 다시 만들어보기

실수한 부분

1. 함수들의 선언 및 코딩 순서

  1) isDraw = true; 선언하기

  2) winner의 switch case문(null일때 Next turn 보여주기, default로 winner 알려주기)

  3)한 칸이라도 null이 있는 상태라면 isDraw=""이고 else는 "It's a DRAW!"

  4) isDraw가 true일때 무승부, false일때 표시하지 X
     

2. map() 사용할 때에는 무조건 return 할 것!!

- 시간여행 버튼 구현시 map() 사용하였지만 return()을 하지 않아서 화면에 나오지 않았음
