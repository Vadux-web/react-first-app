import React, { useState } from "react";

const Music = () => {
  const [counter3, setCounter3] = useState({
    first: { title: "a", count: 1 },
    second: { title: "b", count: 2 },
    third: { title: "c", count: 3 },
    fourth: { title: "d", count: 4 },
    fifth: { title: "e", count: 5 },
  });

  const handleClick = (key) => () => {
    //1. Создать копию объекта
    const obj = { ...counter3 };
    // 2. Найти эл-т в объекте
    const curEl = obj[key];
    // 3. Изменить значение объекта
    if (key === "second") curEl.count = Math.floor(Math.random() * 100) + 1;
    else if (key === "third") {
      curEl.count = Math.floor(Math.random() * 1000) + 1;
    } else {
      curEl.count = curEl.count + 1;
    }

    // 4. Передать объект в стейт
    setCounter3(obj);
  };

  function duplicateA(a) {
    return [...a, ...a];
  }
  console.log("duplicateA", duplicateA([1, 2, 3, 4, 5]));

  function duplicateB(b) {
    return b.concat(b);
  }
  console.log("duplicateB", duplicateB([1, 2, 3, 4, 5]));

  function duplicateC(c) {
    return (c + "," + c).split(",");
  }
  console.log("duplicateC", duplicateC([1, 2, 3, 4, 5]));

  let arr = [1, 2, 3, 4, 5];
  let res = arr.filter(function (el) {
    return el % 2;
  });
  console.log(res);

  return (
    <div>
      <div style={{ display: "flex" }}>
        {Object.keys(counter3).map((key) => {
          return (
            <div>
              <button key={key} onClick={handleClick(key)}>
                Counter {counter3[key].title}
              </button>
              <p>{counter3[key].count}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Music;
