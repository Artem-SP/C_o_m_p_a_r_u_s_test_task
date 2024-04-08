import { useEffect, useState } from "react";
import cn from "classnames";

export function App() {
  const [data, setData] = useState([]);
  const [time, setTime] = useState(0);
  const [score, setScore] = useState(0);
  const [timeIsOut, setTimeIsOut] = useState(true);
  // const [randomNumber, setRandomNumber] = useState(
  //   Math.round(Math.random() * 100)
  // );
  // const startTimer = () => {
  //   let timer = setInterval(() => {
  //     setTime((time) => {
  //       if (time === 0) {
  //         clearInterval(timer);
  //         return 0;
  //       } else return time - 1;
  //     });
  //   }, 1000);
  // };
  const start = () => {
    // console.log(time);
    setTimeIsOut(false);
    setRandom();
    // setTimeIsOut(false);
    setTimeout(() => {
      setTimeIsOut(true);
      // console.log(timeIsOut);
    }, time);
  };

  // useEffect(() => {}, timeIsOut);
  useEffect(() => {
    const initialData = Array(100)
      .fill()
      .map((item, index) => {
        // return Object.assign({}, { id: index, disabled: false, active: false });
        return Object.assign({}, { id: index, status: null });
      });

    setData(initialData);
    // setRandom();
  }, []);

  const handleClick = (e) => {
    let status = "";

    if (!timeIsOut) {
      // console.log("!timeIsOut");
      status = "win";
      setScore(score + 1);
    } else {
      // console.log("timeIsOut");
      status = "loss";
    }

    const target = { id: +e.target.id, status: status };

    console.log(target);
    const newData = data.map((it, index) => {
      return index === +e.target.id ? target : it;
    });

    console.log(newData);

    // if (!timeIsOut) setScore(score + 1);
    // const target = { id: +e.target.id, status: status };
    // const newData = data.map((it, index) => {
    //   return index === +e.target.id ? target : it;
    // });
    setData(newData);
    setTimeIsOut(false);
    setRandom();

    // console.log(data);
  };
  console.log(data);

  const setRandom = () => {
    const randomNumber = Math.round(Math.random() * 100);

    console.log(randomNumber);
    let target;

    console.log(
      data[randomNumber].status === "win" ||
        data[randomNumber].status === "loss"
    );

    if (
      data[randomNumber].status === "win" ||
      data[randomNumber].status === "loss"
    )
      return;
    else target = { id: randomNumber, status: "active" };

    console.log(target);

    // console.log(target);
    const newData = data.map((it, index) => {
      // console.log(it);
      return index === randomNumber ? target : it;
    });

    console.log(newData);
    setData(newData);

    // if (
    //   data[randomNumber].status === "active" ||
    //   data[randomNumber].status === "loss" ||
    //   data[randomNumber].status === "win"
    // ) {
    //   setRandom();
    // }
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
