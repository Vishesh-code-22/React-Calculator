import Button from "./components/Button"
import DigitButton from "./components/DigitButton"
import OperationButton from "./components/OperationButton"

function App() {

  return (
    <>
      <div className="main flex flex-col bg-[#384253] h-[60%] w-[23%] rounded-4xl">
        <div className="screen flex flex-col justify-center gap-1.5 items-end h-1/4 px-6">
          <div className="main-screen text-white text-6xl">2122</div>
          <div className="secondary-screen text-[#ffffffbf] text-sm">346+74*24</div>
        </div>
        <div className="keypad h-[70%] grid grid-cols-4 grid-rows-5 gap-6 px-6">
          <Button className="col-span-2 bg-[#252b36]" value={"AC"}/>
          <Button className="bg-[#252b36]" value={"DEL"}/>
          <OperationButton className="bg-[#252b36]" operation={"÷"} />
          <DigitButton digit={"7"} />
          <DigitButton digit={"8"} />
          <DigitButton digit={"9"} />
          <OperationButton className="bg-[#252b36]" operation={"×"} />
          <DigitButton digit={"4"} />
          <DigitButton digit={"5"} />
          <DigitButton digit={"6"} />
          <OperationButton className="bg-[#252b36]" operation={"-"} />
          <DigitButton digit={"1"} />
          <DigitButton digit={"2"} />
          <DigitButton digit={"3"} />
          <OperationButton className="bg-[#252b36]" operation={"+"} />
          <DigitButton digit={"0"} />
          <DigitButton digit={"."} />
          <Button className="col-span-2 bg-[#252b36]" value={"="}/>
        </div>
      </div>
    </>
  )
}

export default App
