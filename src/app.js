import orve, { ref } from "orve";

const App = () => {
  const checker = ["012","048","036","147","246","258","678"];

  const board = ref(new Array(9).fill(0).map((e, i) => ({id: i, value: null})));
  const history = ref([]);
  let player = true;
  let canMove = true;

  const checkGame = () => {
    for(let i = 0;i !== checker.length;i++) {
      let ar = checker[i].split("");
      ar = ar.map(e => parseInt(e, 10));
      const [ x1, x2, x3 ] = ar;
      if (
        (board.value[x1].value !== null) &&
        (board.value[x1].value === board.value[x2].value && board.value[x2].value === board.value[x3].value)) {
          alert("ПОБЕДА ", board.value[x1].value);
          canMove = false;
        break;
      }
    }

    if (canMove && board.value.filter((e) => e.value !== null).length === 9) {
      alert("НИЧЬЯ");
      canMove = false;
      return;
    }
  }
  
  const clickOnCell = (num) => {
    if (canMove) {
      // console.log(num);
      board.value[num] = { ...board.value[num], value: player ? "x" : "o" };
      history.value.push({ 
        player: player,
        step: board.value.slice(0)
      });
      player = !player;
      checkGame();
    }
  }

  const resetArr = (e, ind) => {
    history.value.splice(ind + 1, history.value.length);
    e.step.forEach((e, i) => {
      board.value[i] = e;
    });
    if (!canMove) canMove = true;
    player = !e.player;
  }

  return (
    <div class="container">
      <div>
        <h3>Tic-tac-toe</h3>

        <div class="container__body">
          <div>
            <h3>Поле:</h3>
            <div class="container__body__game-bord">
              {board.forList((e, i) => {
                // console.log(i);
                return (
                  <div
                    class="cell"
                    onClick={e.value === null ? () => clickOnCell(i): () => console.log("Клекта уже занята")}
                  >
                    <span class="cell-label">{e.value === null ? "": e.value}</span>
                  </div>
                ) 
              })}
            </div>
          </div>
          <div>
            <h3>История:</h3>
            <div style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap"
            }}>
              {history.forList((e, i) => {
                return (
                  <button
                    style={{
                      padding: "10px 0"
                    }}
                    onClick={() => resetArr(e, i)}
                  >[{e.player ? "x" : "o"}] Шаг</button>
                )
              }) }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;