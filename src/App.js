import React, { useState } from "react";

import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";

const btnValues = [
  [1, 2, 3, "+"],
  [4, 5, 6, "-"],
  [7, 8, 9, "*"],
  ["C", 0, "=", "/"],
];

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const checkMath = (char) => {
  return char === "+" || char === "-" || char === "*" || char === "/";
};

const App = () => {
  const [sign, setSign] = useState("");
  const [num, setNum] = useState(0);
  const [res, setRes] = useState(0);

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(num).length < 16) {
      setNum((prevNum) =>
        prevNum === 0 && value === "0"
          ? "0"
          : removeSpaces(prevNum) % 1 === 0
          ? toLocaleString(Number(removeSpaces(prevNum + value)))
          : toLocaleString(prevNum + value)
      );
      setRes(!sign ? 0 : res);
    }
  };

  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setNum((prevNum) =>
      !prevNum.toString().includes(".") ? prevNum + value : prevNum
    );
  };

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setSign(value);
    setRes(!res && num ? num : res);
    setNum(0);
  };

  const equalsClickHandler = () => {
    if (sign !== "" && num !== "") {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "*"
          ? a * b
          : sign === "/"
          ? a / b
          : 0;

      setRes((prevRes) =>
        num === "0" && sign === "/"
          ? "Can't divide with 0"
          : toLocaleString(
              math(Number(removeSpaces(prevRes)), Number(removeSpaces(num)), sign)
            )
      );
      setSign("");
      setNum(0);
    }
  };

  const invertClickHandler = () => {
    setNum((prevNum) =>
      prevNum ? toLocaleString(removeSpaces(prevNum) * 0) : 0
    );
    setRes((prevRes) =>
      prevRes ? toLocaleString(removeSpaces(prevRes) * 0) : 0
    );
    setSign("");
  };

  const percentClickHandler = () => {
    setNum((prevNum) => removeSpaces(prevNum) / 100);
    setRes((prevRes) => removeSpaces(prevRes) / 100);
    setSign("");
  };

  const resetClickHandler = () => {
    setSign("");
    setNum(0);
    setRes(0);
  };

  return (
    <Wrapper>
      <Screen value={num ? num : res} />
      <ButtonBox>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "C" ? "red" : checkMath(btn) ? "yellow" : ""}
              value={btn}
              onClick={
                btn === "C"
                  ? resetClickHandler
                  : btn === "="
                  ? equalsClickHandler
                  : checkMath(btn)
                  ? signClickHandler
                  : btn === "."
                  ? commaClickHandler
                  : numClickHandler
              }
            />
          );
        })}
      </ButtonBox>
    </Wrapper>
  );
};

export default App;