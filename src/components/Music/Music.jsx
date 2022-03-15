import React, { useState } from "react";

const Music = () => {
  const [counter3, setCounter3] = useState({
    first: { title: "a", count: 1 },
    second: { title: "b", count: 2 },
    third: { title: "c", count: 3 },
    fourth: { title: "d", count: 4 },
    fifth: { title: "e", count: 5 },
  });

  Object.keys(counter3).map((el) => {
    console.log(el); //first
    console.log(counter3.first.title); //a
    console.log(counter3.el.title);
  });

  return <div>TEXT</div>;
};

export default Music;
