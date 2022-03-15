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
    if (curEl) curEl.count = curEl.count + 1;
    // 4. Передать объект в стейт
    setCounter3(obj);
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        {Object.keys(counter3).map((key) => {
          return (
            <div>
              <button onClick={handleClick(key)}>
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
