import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import "./App.css";

let numRows = 50;
let numCols = 50;
let runSpeed = 1000;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const makeEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }

  return rows;
};

function App() {
  const [grid, setGrid] = useState(() => {
    return makeEmptyGrid();
  });

  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, runSpeed);
  }, []);

  return (
    <>
      <div className="header">
        <h1>Conway's Game of Life</h1>
        <h2>{running ? "Running" : undefined}</h2>
      </div>

      <div className="buttons">
        <button
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimulation();
            }
          }}
        >
          {running ? "Stop" : "Start"}
        </button>
        <button
          onClick={() => {
            setGrid(makeEmptyGrid());
          }}
        >
          Clear
        </button>
        <button
          onClick={() => {
            const rows = [];
            for (let i = 0; i < numRows; i++) {
              rows.push(
                Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
              );
            }

            setGrid(rows);
          }}
        >
          Random
        </button>
      </div>

      <div className= {running ? "hide" : "sizeButtons"} >
        <button
          onClick={() => {
            if(running === false){
            numRows = 25;
            numCols = 25;
            }}}
        >
          25X25
        </button>
        <button
          onClick={() => {
            if(running === false){
            numRows = 50;
            numCols = 50;
          }}}
        >
          50X50
        </button>
        <button
          onClick={() => {
            if(running === false){
            numRows = 100;
            numCols = 100;
            }}}
        >
          100X100
        </button>
        </div>

      <div className={running ? "hide" : "speedButtons" } >
        <button
          onClick={() => {
            runSpeed = 1000;
          }}
        >
          Slow
        </button>
        <button
          onClick={() => {
            runSpeed = 700;
          }}
        >
          Meduim
        </button>
        <button
          onClick={() => {
            runSpeed = 500;
          }}
        >
          Fast
        </button>
        <button
          onClick={() => {
            runSpeed = 250;
          }}
        >
          Extra Fast
        </button>
        <button
          onClick={() => {
            runSpeed = 1;
          }}
        >
          Real Speed
        </button>
      </div>
      <ol className="instructions">
        <li>Any dead cell with three live neighbours becomes a live cell.</li>
        <li>Any live cell with two or three live neighbours survives.</li>
        <li>All other live cells die in the next generation.</li>
        <li>Similarly, all other dead cells stay dead.</li>
        <li>To change grid size first click the size you want, then click clear.</li>
        <li><a href= " https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">About</a></li>
      </ol>

      <div
        className="board"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              className="board"
              key={`${i}-${k}`}
              onClick={() => {
                if(running === false){
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });
                setGrid(newGrid);
              }}}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][k] ? "#00ffe5" : "#255752",
                border: "1px solid black",
              }}
            />
          ))
        )}
      </div>
    </>
  );
}

export default App;
