import React from "react";
import { action } from "../App";

const OperationButton = ({operand, dispatch}) => {
  return (
    <button
      onClick={() =>
        dispatch({
          type: action.choose_oper,
          payload: { operand },
        })
      }
    >
      {operand}
    </button>
  );
};

export default OperationButton;
