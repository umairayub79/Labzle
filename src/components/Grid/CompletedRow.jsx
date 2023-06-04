import React from 'react'
import { Cell } from './Cell'

export const CompletedRow = ({ guess, isRevealing }) => {
    return (
        <div className='flex justify-center mb-1'>
            {guess.map((letter, index) => (
                <Cell letter={letter?.letter} status={letter?.status} position={index} isRevealing={isRevealing} isCompleted key={index} />
            ))}
        </div>
    )
}