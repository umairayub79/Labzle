import React from 'react'
import { Cell } from './Cell'
import { MAX_WORD_LENGTH } from "../../constants/settings"

export const CurrentRow = ({ guess, className }) => {
    const emptyCells = Array.from(Array(MAX_WORD_LENGTH - guess.length))
    const classes = `flex justfiy-center mb-1 ${className}`

    return (
        <div className={classes}>
            {guess.map((letter, index) => (
                <Cell letter={letter} key={index} status={"current"} />
            ))}
            {emptyCells.map((_, index) => (
                <Cell key={index} status={"empty"} />
            ))}
        </div>
    )
}