import React from "react";
import { action } from "../App";
const DigitButton = ({ digit, dispatch }) => {
  return (
    <button
      onClick={() =>
        dispatch({
          type: action.add_digit,
          payload: {digit},
        })
      }
    >
      {digit}
    </button>
  );
};

export default DigitButton;
