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
    {
      id: 4,
      title: "C4",
      number: 10000,
    },
  ]);

  const [counter3, setCounter3] = useState({
    first: { title: "a", count: 1 },
    second: { title: "b", count: 2 },
    third: { title: "c", count: 3 },
    fourth: { title: "d", count: 4 },
    fifth: { title: "e", count: 5 },
  });

  // let arrCounter3 = Object.entries(counter3);
  // console.log("counter3", counter3);
  // console.log("Object.entries(counter3)", arrCounter3);
  console.log("Object.keys(counter3)", Object.keys(counter3));

  const handleClick = (id) => () => {
    //1. Создать копию массива
    const arr = [...counter2];
    // 2. Найти объект в массиве
    const curEl = arr.find((el) => el.id === id);
    // 3. Изменить значение объекта
    if (curEl) curEl.number = curEl.number + 1;
    // 4. Передать массив в стейт
    setCounter2(arr);
  };

  // const handleClick2 = (index) => () => {
  //   //1. Создать копию объекта
  //   const obj = [...counter3];
  //   //Делаем из нее массив
  //   let arrCounter3 = Object.entries(obj);
  //   // 2. Найти объект в массиве
  //   const curEl = arrCounter3[index];
  //   // 3. Изменить значение объекта
  //   if (curEl) curEl.number = curEl.number + 1;
  //   // 4. Передать массив в стейт
  //   setCounter2(arrCounter3);
  // };

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

      <div style={{ display: "flex" }}>
        {Object.keys(counter3).map((key) => {
          return (
            <div>
              <button>
                Counter {counter3.first.title}
                {key}
              </button>
              <p>{counter3.key.count}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default News;
