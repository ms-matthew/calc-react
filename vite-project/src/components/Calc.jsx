import React, { useReducer } from 'react'
import Button from './Button'
import { motion } from "motion/react"
import OperationButton from "./OperationButton"

export const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete-digit',
    EVALUATE: 'evaluate'
}

function reducer(state, { type, payload }) {
    switch (type) {
        case ACTIONS.ADD_DIGIT:
            if (state.overwrite) {
                return {
                    ...state,
                    currentOperand: payload.digit,
                    overwrite: false
                }
            }
            if (payload.digit === "0" && state.currentOperand === "0") return state
            if (payload.digit === "." && state.currentOperand?.includes(".")) return state

            return {
                ...state,
                currentOperand: `${state.currentOperand || ""}${payload.digit}`
            }

        case ACTIONS.CHOOSE_OPERATION:
            if (state.currentOperand == null && state.previousOperand == null) return state
            if (state.currentOperand == null) {
                return {
                    ...state,
                    operation: payload.operation
                }
            }
            if (state.previousOperand == null) {
                return {
                    ...state,
                    operation: payload.operation,
                    previousOperand: state.currentOperand,
                    currentOperand: null
                }
            }
            return {
                ...state,
                previousOperand: evaluate(state),
                operation: payload.operation,
                currentOperand: null
            }

        case ACTIONS.DELETE_DIGIT:
            if (state.overwrite) {
                return {
                    ...state,
                    overwrite: false,
                    currentOperand: null
                }
            }
            if (state.currentOperand == null) return state
            if (state.currentOperand.length === 1) {
                return {
                    ...state,
                    currentOperand: null
                }
            }
            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1)
            }

        case ACTIONS.CLEAR:
            return {}

        case ACTIONS.EVALUATE:
            if (
                state.operation == null ||
                state.currentOperand == null ||
                state.previousOperand == null
            ) {
                return state
            }
            return {
                ...state,
                previousOperand: null,
                overwrite: true,
                operation: null,
                currentOperand: evaluate(state)
            }
    }
}

function evaluate({ currentOperand, previousOperand, operation }) {
    const prev = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)
    if (isNaN(prev) || isNaN(current)) return ""
    let computation = ""
    switch (operation) {
        case "+":
            computation = prev + current
            break
        case "-":
            computation = prev - current
            break
        case "X":
            computation = prev * current
            break
        case "/":
            computation = prev / current
            break
    }
    return computation.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
})

function formatOperand(operand) {
    if (operand == null) return
    const [integer, decimal] = operand.split(".")
    if (decimal == null) return INTEGER_FORMATTER.format(integer)
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

const Calc = () => {
    const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})

    return (
        <main className="min-h-screen bg-[#B2D8CE] flex items-center justify-center p-4">
            <motion.div
                id="output"
                className="w-[90vw] max-w-md"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.4,
                    scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                }}
            >
                <div id="current-operand" className="border p-3 text-base sm:text-xl md:text-3xl font-mono flex flex-col justify-center items-end min-h-24 rounded-xl bg-[#648DB3] break-all">
                    <div className="text-gray-600">{formatOperand(previousOperand)} {operation}</div>
                    <div>{formatOperand(currentOperand)}</div>
                </div>

                <div className="md:h-[50vh] p-2 gap-2 grid grid-cols-4 w-full h-auto bg-[#52357B] rounded-xl border mt-2">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="col-span-2 shadow-xl border text-base sm:text-xl md:text-2xl text-[#0E2148] font-mono font-medium rounded-xl h-full w-full bg-[#5459AC] hover:bg-[#648DB3]"
                        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
                    >AC</motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="shadow-xl border text-base sm:text-xl md:text-2xl text-[#0E2148] font-mono font-medium rounded-xl h-full w-full bg-[#5459AC] hover:bg-[#648DB3]"
                        onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
                    >DEL</motion.button>
                    <OperationButton dispatch={dispatch} operation="/" />
                    <Button dispatch={dispatch} digit="1" />
                    <Button dispatch={dispatch} digit="2" />
                    <Button dispatch={dispatch} digit="3" />
                    <OperationButton dispatch={dispatch} operation="X" />
                    <Button dispatch={dispatch} digit="4" />
                    <Button dispatch={dispatch} digit="5" />
                    <Button dispatch={dispatch} digit="6" />
                    <OperationButton dispatch={dispatch} operation="+" />
                    <Button dispatch={dispatch} digit="7" />
                    <Button dispatch={dispatch} digit="8" />
                    <Button dispatch={dispatch} digit="9" />
                    <OperationButton dispatch={dispatch} operation="-" />
                    <Button dispatch={dispatch} digit="." />
                    <Button dispatch={dispatch} digit="0" />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="col-span-2 shadow-xl border text-base sm:text-xl md:text-2xl text-[#0E2148] font-mono font-medium rounded-xl h-full w-full bg-[#5459AC] hover:bg-[#648DB3]"
                        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
                    >=</motion.button>
                </div>
            </motion.div>
        </main>
    )
}

export default Calc
