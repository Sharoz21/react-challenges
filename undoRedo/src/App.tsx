import React, { useRef, useState } from "react";
import "./App.css";

interface Point {
  x: number;
  y: number;
}

function App() {
  const [points, setPoints] = useState<Point[]>([]);
  const redoList = useRef<Point[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if ((e.target as HTMLButtonElement).type === "submit") return;
    const { clientX, clientY } = e;
    setPoints((prev) => [...prev, { x: clientX, y: clientY }]);
    redoList.current = [];
  };

  const handleUndo = (e: React.MouseEvent<HTMLButtonElement>) => {
    redoList.current.push(points[points.length - 1]);
    setPoints((prev) => prev.slice(0, -1));
  };

  const handleRedo = (e: React.MouseEvent<HTMLButtonElement>) => {
    let lastRemoved: Point = redoList.current.pop()!;
    setPoints((prev) => [...prev, lastRemoved]);
  };

  return (
    <div className="App" onClick={handleClick}>
      <button disabled={points.length === 0} onClick={handleUndo}>
        undo
      </button>
      <button disabled={redoList.current.length === 0} onClick={handleRedo}>
        redo
      </button>

      {points.map((point, index) => {
        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: `${point.x - 10}px`,
              top: `${point.y - 10}px`,
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: "crimson",
            }}
          ></div>
        );
      })}
    </div>
  );
}

export default App;
