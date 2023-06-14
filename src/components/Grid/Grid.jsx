import React from 'react'
import { MAX_CHALLENGES } from '../../constants/settings'
import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'

export const Grid = ({ guesses, currentGuess, currentRowClass, isRevealing }) => {
    const emptyRows = guesses.length < MAX_CHALLENGES - 1 ? Array.from(Array(MAX_CHALLENGES - 1 - guesses.length)) : []
    return (
        <div className='w-full flex flex-col justify-center items-center'>
            {guesses.map((guess, index) => (
                <CompletedRow guess={guess} key={index} isRevealing={isRevealing && guesses.length - 1 === index} />
            ))}
            {guesses.length < MAX_CHALLENGES && (
                <CurrentRow guess={currentGuess} className={currentRowClass} />
            )}
            {emptyRows.map((_, index) => (<EmptyRow key={index} />))}
        </div>
    )
}
