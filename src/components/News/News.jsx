import React, { useState } from "react";

const News = () => {
  const [counter1, setCounter1] = useState({
    title: "C1",
    number: 0,
  });

  const [counter2, setCounter2] = useState([
    {
      id: 1,
      title: "C1",
      number: 0,
    },
    {
      id: 2,

      title: "C2",
      number: 100,
    },
    {
      id: 3,
      title: "C3",
      number: 1000,
    },
  ]);

  const handleClick = (id) => () => {
    //1. Создать копию массива
    const arr = [...counter2];
    // 2. Найти объект в массиве
    const curEl = arr.find((el) => el.id === id);
    // 3. Изменить значение об.
    curEl.number = curEl.number + 1;
    // 4. Передать массив в стейт
    setCounter2(arr);
  };

  return (
    <div>
      <h1>Use state</h1>
      <button
        onClick={() =>
          setCounter1({ ...counter1, number: counter1.number + 1 })
        }
      >
        Counter {counter1.title}
      </button>
      <p>{counter1.number}</p>
      <div style={{ display: "flex" }}>
        {counter2.map((el) => {
          return (
            <div>
              <button onClick={handleClick(el.id)}>Counter {el.title}</button>
              <p>{el.number}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default News;
