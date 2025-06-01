"use client"

import { useState } from "react"

export default function CalculatorApp() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? num : display + num)
    }
  }

  const inputOperation = (nextOperation) => {
    const inputValue = Number.parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue
      case "-":
        return firstValue - secondValue
      case "×":
        return firstValue * secondValue
      case "÷":
        return firstValue / secondValue
      case "=":
        return secondValue
      default:
        return secondValue
    }
  }

  const performCalculation = () => {
    const inputValue = Number.parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const clear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const Button = ({ onClick, className = "", children }) => (
    <button
      onClick={onClick}
      className={`h-16 text-lg font-semibold rounded-lg transition-all duration-150 hover:scale-105 active:scale-95 ${className}`}
    >
      {children}
    </button>
  )

  return (
    <div className="p-6 max-w-sm mx-auto">
      <div className="bg-gray-900 rounded-lg p-6 shadow-xl">
        {/* Display */}
        <div className="bg-black rounded-lg p-4 mb-4">
          <div className="text-white text-right text-3xl font-mono overflow-hidden">{display}</div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3">
          <Button onClick={clear} className="bg-gray-500 hover:bg-gray-400 text-white col-span-2">
            Clear
          </Button>
          <Button onClick={() => inputOperation("÷")} className="bg-orange-500 hover:bg-orange-400 text-white">
            ÷
          </Button>
          <Button onClick={() => inputOperation("×")} className="bg-orange-500 hover:bg-orange-400 text-white">
            ×
          </Button>

          <Button onClick={() => inputNumber("7")} className="bg-gray-700 hover:bg-gray-600 text-white">
            7
          </Button>
          <Button onClick={() => inputNumber("8")} className="bg-gray-700 hover:bg-gray-600 text-white">
            8
          </Button>
          <Button onClick={() => inputNumber("9")} className="bg-gray-700 hover:bg-gray-600 text-white">
            9
          </Button>
          <Button onClick={() => inputOperation("-")} className="bg-orange-500 hover:bg-orange-400 text-white">
            -
          </Button>

          <Button onClick={() => inputNumber("4")} className="bg-gray-700 hover:bg-gray-600 text-white">
            4
          </Button>
          <Button onClick={() => inputNumber("5")} className="bg-gray-700 hover:bg-gray-600 text-white">
            5
          </Button>
          <Button onClick={() => inputNumber("6")} className="bg-gray-700 hover:bg-gray-600 text-white">
            6
          </Button>
          <Button onClick={() => inputOperation("+")} className="bg-orange-500 hover:bg-orange-400 text-white">
            +
          </Button>

          <Button onClick={() => inputNumber("1")} className="bg-gray-700 hover:bg-gray-600 text-white">
            1
          </Button>
          <Button onClick={() => inputNumber("2")} className="bg-gray-700 hover:bg-gray-600 text-white">
            2
          </Button>
          <Button onClick={() => inputNumber("3")} className="bg-gray-700 hover:bg-gray-600 text-white">
            3
          </Button>
          <Button onClick={performCalculation} className="bg-orange-500 hover:bg-orange-400 text-white row-span-2">
            =
          </Button>

          <Button onClick={() => inputNumber("0")} className="bg-gray-700 hover:bg-gray-600 text-white col-span-2">
            0
          </Button>
          <Button onClick={() => inputNumber(".")} className="bg-gray-700 hover:bg-gray-600 text-white">
            .
          </Button>
        </div>
      </div>
    </div>
  )
}
