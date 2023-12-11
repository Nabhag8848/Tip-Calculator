import { useState } from "react";

const amountOfSatisfaction = [
  {
    type: "Dissatisfied",
    percent: 0,
  },
  {
    type: "It was okay",
    percent: 5,
  },
  {
    type: "It was good",
    percent: 10,
  },
  {
    type: "Absolutely amazing!",
    percent: 20,
  },
];

const initialTipSatisfaction = [
  {
    id: "first",
    percent: 0,
    title: "How did you like the service ?",
  },
  {
    id: "second",
    percent: 0,
    title: "How did your friend like service ?",
  },
];

export default function App() {
  const [basicPrice, setBasicPrice] = useState(null);
  const [tipSatisfaction, setTipSatisfaction] = useState(
    initialTipSatisfaction
  );

  let tipPrice;

  if (basicPrice !== null) {
    const avgPercent =
      (tipSatisfaction[0].percent + tipSatisfaction[1].percent) / 2;

    tipPrice = (avgPercent * basicPrice) / 100;
  }

  function handleSelectPercent(id, percent) {
    const newTipPercent = tipSatisfaction.map((e) => {
      if (e.id === id) {
        return {
          ...e,
          percent,
        };
      }

      return e;
    });

    setTipSatisfaction(newTipPercent);
  }

  function handleInput(input) {
    if (input === 0) return setBasicPrice(null);
    if (!isNaN(input)) return setBasicPrice(input);

    setBasicPrice(null);
  }

  function handleResetSettings() {
    setBasicPrice(null);
    setTipSatisfaction(initialTipSatisfaction);
  }

  return (
    <div className="App">
      <BillInput onInput={handleInput} basicPrice={basicPrice} />
      {tipSatisfaction.map((e) => {
        return (
          <SelectPercent
            id={e.id}
            key={e.id}
            onPercentChange={handleSelectPercent}
            value={e.percent}
          >
            <label>{e.title}</label>
          </SelectPercent>
        );
      })}
      {basicPrice !== null && (
        <>
          <h2>
            You Pay ${basicPrice + tipPrice} (${basicPrice} + ${tipPrice} tip)
          </h2>
          <button className="reset" onClick={handleResetSettings}>
            Reset
          </button>
        </>
      )}
    </div>
  );
}

function BillInput({ onInput, basicPrice }) {
  return (
    <div className="bill">
      <label>How much was the bill ? </label>
      <input className="bill input"
        type="text"
        onChange={(e) => onInput(Number(e.target.value))}
        value={basicPrice === null ? "" : basicPrice}
      ></input>
    </div>
  );
}

function SelectPercent({ children, id, onPercentChange, value }) {
  return (
    <div className="percent">
      {children}
      <select
        id={id}
        onChange={(e) => {
          onPercentChange(id, Number(e.target.value));
        }}
        value={value}
        className="bill input"
      >
        {amountOfSatisfaction.map((obj) => (
          <option value={obj.percent} key={obj.type}>
            {obj.type}({obj.percent})%
          </option>
        ))}
      </select>
    </div>
  );
}
