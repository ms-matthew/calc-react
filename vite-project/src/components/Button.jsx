import React from 'react'
import { motion } from "motion/react"
import { ACTIONS } from './Calc'

const classProp = 'shadow-xl border text-3xl text-[#0E2148] font-mono font-medium rounded-xl h-full w-full bg-[#5459AC] hover:bg-[#648DB3]'

const Button = ({digit, className, dispatch}) => {
    let fullClassName = classProp + ' ' + className;
  return (
    <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={fullClassName}
    onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, payload: {digit}})}>
        {digit}
    </motion.button>
  )
}

export default Button