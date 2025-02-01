import { useReducer } from "react"
import Button from "./components/Button"
import DigitButton from "./components/DigitButton"
import OperationButton from "./components/OperationButton"
export const ACTIONS = {
  USER_INPUT: "user-input",
  OPERATION: "operation",
  ALL_CLEAR: "all-clear",
  DELETE: "delete",
  EVALUATE: "evaluate"
}

const evaluate = ({currentOperand, previousOperand, operation}) => {
  let rhs = parseFloat(currentOperand)
  let lhs = parseFloat(previousOperand)
  let calculatedValue = ""
  switch (operation) {
    case "+":
      calculatedValue = lhs + rhs
      break;
    case "-":
      calculatedValue = lhs - rhs
      break;
    case "×":
      calculatedValue = lhs * rhs
      break;
    case "÷":
      calculatedValue = lhs / rhs
      break;
  
    default:
      break;
  }
  return calculatedValue.toString()
}

const reducer = (state, {type, payload}) => {
  switch (type) {
    case ACTIONS.USER_INPUT:
      
      if (state.currentOperand === '0' && payload.digit === '0') return state
      if (payload.digit === "." && state.currentOperand === ".") return state
      if (payload.digit === "." && state.currentOperand?.includes('.')) return state
      if (state.overwrite){
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
          rhs: true
        }
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }
      break;
    case ACTIONS.OPERATION:
      if (state.currentOperand === '0' || state.currentOperand === ".") return {}
      if (!state.currentOperand) return {}
      if (state.operation === payload.operation && !state.rhs) {
        return {
          ...state,
          operation: payload.operation
        }
      }

      if (state.operation && state.rhs) {
        const calculated = evaluate(state)
        return {
          ...state,
          operation: payload.operation,
          previousOperand: calculated,
          currentOperand: calculated,
          overwrite: true
        }
      }
      return {
        ...state,
        previousOperand: state.currentOperand,
        operation: payload.operation,
        overwrite: true
      }
      break;
    case ACTIONS.ALL_CLEAR:
      return {}
      break;
    case ACTIONS.DELETE:
      if (!state.currentOperand) return {}
      if (state.operation && !state.rhs){
        return {
          ...state,
          operation: "",
          previousOperand: "",
        }
      } else if (state.operation && state.rhs) {
        return {
          ...state,
          operation: "",
        }
      } else if (state.previousOperand) {
        return {
          ...state,
          previousOperand: state.previousOperand.slice(0, -1)
        }
      }
      return{
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
      break;
    case ACTIONS.EVALUATE:
      if (!state.currentOperand) return {}
      if (state.rhs) {
        const calculated = evaluate(state)
        return {
          ...state,
          previousOperand: "",
          operation: "",
          currentOperand: calculated,
          overwrite: true
        }
      } else return {...state}
      break;
      
    default:
      break;
  }
}

function App() {
  const initialState = {
    currentOperand: null,
    previousOperand: null,
    operation: null,
    rhs: false, // Set initial value properly
  };
  const [{currentOperand, previousOperand, operation, rhs}, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      <div className="main flex flex-col bg-[#384253] h-[60%] w-[23%] rounded-4xl">
        <div className="screen flex flex-col justify-center gap-1.5 items-end px-6 min-h-1/4 max-h-auto">
          <div className="main-screen text-white w-full text-end break-words text-6xl">{currentOperand}</div>
          <div className="secondary-screen text-[#ffffffbf] text-sm w-full text-end break-words">{previousOperand}{operation}</div>
        </div>
        <div className="keypad h-[70%] grid grid-cols-4 grid-rows-5 gap-6 px-6">
          <Button onClick={() => dispatch({type: ACTIONS.ALL_CLEAR})} className="col-span-2 bg-[#252b36]" value={"AC"}/>
          <Button onClick={() => dispatch({type: ACTIONS.DELETE})} className="bg-[#252b36]" value={"DEL"}/>
          <OperationButton className="bg-[#252b36]" dispatch={dispatch} operation={"÷"} />
          <DigitButton digit={"7"} dispatch={dispatch} />
          <DigitButton digit={"8"} dispatch={dispatch} />
          <DigitButton digit={"9"} dispatch={dispatch} />
          <OperationButton className="bg-[#252b36]" dispatch={dispatch} operation={"×"} />
          <DigitButton digit={"4"} dispatch={dispatch} />
          <DigitButton digit={"5"} dispatch={dispatch} />
          <DigitButton digit={"6"} dispatch={dispatch} />
          <OperationButton className="bg-[#252b36]" dispatch={dispatch} operation={"-"} />
          <DigitButton digit={"1"} dispatch={dispatch} />
          <DigitButton digit={"2"} dispatch={dispatch} />
          <DigitButton digit={"3"} dispatch={dispatch} />
          <OperationButton className="bg-[#252b36]" dispatch={dispatch} operation={"+"} />
          <DigitButton digit={"0"} dispatch={dispatch} />
          <DigitButton digit={"."} dispatch={dispatch} />
          <Button onClick={() => dispatch({type: ACTIONS.EVALUATE})} className="col-span-2 bg-[#252b36]" value={"="}/>
        </div>
      </div>
    </>
  )
}

export default App
