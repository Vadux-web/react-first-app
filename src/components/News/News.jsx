import React, { useEffect, useState } from "react";

const News = () => {
  const [state, setState] = useState({
    value1: true,
    value2: 10,
    value3: "text",
  });

  const [counter, setCounter] = useState({
    value1: true,
    value2: { count: 5 },
    value3: "text",
  });

  // setTimeout(() => {
  //   setCounter({ count: 5 });
  // }, 1000);

  // useEffect(() => {
  //   console.log("ComponentDidMount");
  //   return () => {
  //     console.log("ComponentWillUnmount");
  //   };
  // }, []);

  // useEffect(() => {
  //   console.log("Render happened");
  // }, [counter]);
  //
  // useEffect(() => {
  //   console.log("Жмяк");
  // }, [counter]);

  return (
    <div>
      <h1>Basic hooks</h1>
      <h2>useState</h2>

      <button onClick={() => setState({ ...state, value1: !state.value1 })}>
        Toggle text
      </button>
      <p>{state.value1}</p>
      {state.value1 ? (
        <div>
          <p>{state.value2}</p>
          <p>{state.value3}</p>
        </div>
      ) : (
        <p>жопа</p>
      )}
      <button
        onClick={() => {
          const newState = {
            ...counter,
            value2: { count: counter.value2.count + 1 },
          };
          debugger;
          setCounter(newState);
        }}
      >
        Counter
      </button>
      <p>{counter.value2.count}</p>
      <h2>useEffect</h2>
    </div>
  );
};

export default News;
