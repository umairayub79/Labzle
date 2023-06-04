import React from 'react'
import cx from 'classnames'

export const Cell = ({ letter, status, position, isRevealing, isCompleted }) => {
    const shouldReveal = isRevealing && isCompleted
    const animationDelay = `${position * 300}ms`
    const classes = cx(
        'w-14 h-14 border-solid border-2 border-gray-300 flex items-center justify-center mx-0.5  text-2xl font-bold rounded uppercase dark:text-white',
        {
            'border-gray-500 dark:bg-slate-900 dark:border-slate-200': letter && status === "current",
            'border-gray-300 dark:border-slate-500': !letter,
            'wrong shadowed bg-slate-400 dark:bg-slate-700 text-white border-slate-400 dark:border-slate-700': status === "wrong",
            'correct shadowed bg-green-500 text-white border-green-500': status === "correct" && !isHighContrastMode,
            'missplaced shadowed bg-yellow-500 text-white border-yellow-500': status === "missplaced" && !isHighContrastMode,
            'cell-reveal': shouldReveal,
        },
    )
    return (

        <div className={classes} style={{ animationDelay }}>
            <div className='letter-container' style={{ animationDelay }}>{letter}</div>
        </div>
    )
}