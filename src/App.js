import React, { useReducer } from "react";
import "./sass/App.css";
import DigitButton from "./components/DigitButton";
import OperationButton from "./components/OperationButton";
export const action = {
  add_digit: "add_digit",
  choose_oper: "choose_oper",
  clear: "clear",
  delete_digit: "delete_digit",
  evaluate: "evaluate",
};

function evaluate({ currentOperation, preOperation, operation }) {
  let current = parseFloat(currentOperation);
  let pre = parseFloat(preOperation);
  let result = "";
  if (isNaN(pre) || isNaN(current)) {
    return preOperation;
  }
  switch (operation) {
    case "-":
      result = pre - current;
      break;
    case "+":
      result = pre + current;
      break;
    case "x":
      result = pre * current;
      break;
    case "/":
      result = pre / current;
      break;
    default: {
      throw Error("Unknow type " + operation);
    }
  }

  return result.toString();
}
function reducer(state, action) {
  switch (action.type) {
    case "add_digit": {
      if (state.overwritten) {
        return {
          ...state,
          currentOperation: `${state.currentOperation || ""}${
            action.payload.digit
          }`,
          preOperation: null,
          overwritten: false,
        };
      }
      if (state.currentOperation === "0" && action.payload.digit === "0") {
        return state;
      }
      if (
        action.payload.digit === "." &&
        state.currentOperation.includes(".")
      ) {
        return state;
      }
      return {
        ...state,
        currentOperation: `${state.currentOperation || ""}${
          action.payload.digit
        }`,
      };
    }
    case "choose_oper": {
      if (state.currentOperation == null && state.preOperation == null) {
        return state;
      }
      if (state.preOperation == null) {
        return {
          ...state,
          currentOperation: null,
          preOperation: state.currentOperation,
          operation: action.payload.operand,
        };
      }

      return {
        ...state,
        preOperation: evaluate(state),
        currentOperation: null,
        operation: action.payload.operand,
        overwritten: false,
      };
    }
    case "evaluate": {
      return {
        ...state,
        preOperation: evaluate(state),
        currentOperation: null,
        operation: null,
        overwritten: true,
      };
    }

    case "delete_digit": {
      if (state.currentOperation === null) {
        return state;
      }
      let length = state.currentOperation.length;
      console.log(length);
      return {
        ...state,
        currentOperation: state.currentOperation.substring(0, length - 1),
      };
    }
    case "clear": {
      return {};
    }
    default: {
      throw Error("Unknow type!");
    }
  }
}

const initialObject = {
  currentOperation: null,
  preOperation: null,
  operation: null,
  overwritten: false,
};
const App = () => {
  const [{ currentOperation, preOperation, operation, overwritten }, dispatch] =
    useReducer(reducer, initialObject);
  console.log(overwritten);
  return (
    <div className="calculatorContainer">
      <div className="cclt">
        <div className="output">
          <div className="pre-op">
            {preOperation} {operation}
          </div>
          <div className="af-op">{currentOperation}</div>
        </div>
        <div className="button">
          <button
            onClick={() =>
              dispatch({
                type: action.clear,
              })
            }
            className="span-button"
          >
            AC
          </button>
          <button
            onClick={() => {
              dispatch({
                type: action.delete_digit,
              });
            }}
          >
            DEL
          </button>
          <OperationButton operand="/" dispatch={dispatch} />

          <DigitButton digit="1" dispatch={dispatch} />
          <DigitButton digit="2" dispatch={dispatch} />
          <DigitButton digit="3" dispatch={dispatch} />

          <OperationButton operand="x" dispatch={dispatch} />

          <DigitButton digit="4" dispatch={dispatch} />
          <DigitButton digit="5" dispatch={dispatch} />
          <DigitButton digit="6" dispatch={dispatch} />

          <OperationButton operand="+" dispatch={dispatch} />

          <DigitButton digit="7" dispatch={dispatch} />
          <DigitButton digit="8" dispatch={dispatch} />
          <DigitButton digit="9" dispatch={dispatch} />

          <OperationButton operand="-" dispatch={dispatch} />
          <DigitButton digit="." dispatch={dispatch} />

          <DigitButton digit="0" dispatch={dispatch} />
          <button
            onClick={() =>
              dispatch({
                type: action.evaluate,
              })
            }
            className="span-button"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
