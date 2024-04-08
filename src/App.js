import { useEffect, useState } from "react";
import "./App.css";

import cn from "classnames";

function App() {
  const [data, setData] = useState([]);
  const [time, setTime] = useState(0);
  const [score, setScore] = useState(0);
  const [timeIsOut, setTimeIsOut] = useState(true);

  const start = () => {
    setTimeIsOut(false);
    setRandom();
    setTimeout(() => {
      setTimeIsOut(true);
    }, time);
  };

  useEffect(() => {
    const initialData = Array(100)
      .fill()
      .map((item, index) => {
        return Object.assign({}, { id: index, status: null });
      });

    setData(initialData);
  }, []);

  const handleClick = (e) => {
    let status = "";

    if (!timeIsOut) {
      status = "win";
      setScore(score + 1);
    } else {
      status = "loss";
    }

    const target = { id: +e.target.id, status: status };

    console.log(target);
    const newData = data.map((it, index) => {
      return index === +e.target.id ? target : it;
    });

    setData(newData);
    setTimeIsOut(false);
    setRandom();
  };
  console.log(data);

  const setRandom = () => {
    const randomNumber = Math.round(Math.random() * 100);

    console.log(randomNumber);
    let target;

    if (
      data[randomNumber].status === "win" ||
      data[randomNumber].status === "loss"
    )
      return;
    else target = { id: randomNumber, status: "active" };

    console.log(target);

    const newData = data.map((it, index) => {
      return index === randomNumber ? target : it;
    });

    setData(newData);

    if (
      data[randomNumber].status === "active" ||
      data[randomNumber].status === "loss" ||
      data[randomNumber].status === "win"
    ) {
      setRandom();
    }
  };

  return (
    <div className="wrapper">
      <div>{score}</div>
      <input
        placeholder="Set time in milliseconds"
        onInput={(e) => setTime(e.target.value)}
      />

      <button onClick={setRandom}>random</button>
      <button onClick={start} disabled={!time}>
        Почати
      </button>
      <div className="square-area">
        {data.map((item, index) => (
          <div
            key={index}
            className={cn(
              "item",
              { loss: item.status === "loss" },
              { active: item.status === "active" },
              { win: item.status === "win" }
            )}
            id={item.id}
            onClick={handleClick}
          >
            {item.id}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
