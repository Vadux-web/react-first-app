import React, { useEffect, useState } from "react";

const News = () => {
  const [state, setState] = useState({
    value1: true,
    value2: 10,
    value3: "text",
  });

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log("ComponentDidMount");
    return () => {
      console.log("ComponentWillUnmount");
    };
  }, []);

  useEffect(() => {
    console.log("Render happened");
  });

  useEffect(() => {
    console.log("Жмяк");
  }, [counter]);

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
      <button onClick={() => setCounter(counter + 1)}>Counter</button>
      <p>{counter}</p>

      <h2>useEffect</h2>
    </div>
  );
};

export default News;
