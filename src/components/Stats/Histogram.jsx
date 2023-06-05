import React from 'react'
import { Progress } from './Progress'

export const Histogram = ({ stats, numberOfGuessesMade, isGameWon }) => {
    const winDistribution = stats.winDistribution
    const maxValue = Math.max(...winDistribution, 1)
    return (
        <div className='columns-1 justify-left m-2 text-sm dark:text-white'>
            {winDistribution.map((value, index) => (
                <Progress
                    key={index}
                    index={index}
                    currentDayStatRow={numberOfGuessesMade === index + 1 && isGameWon}
                    size={90 * (value / maxValue)}
                    label={String(value)}
                />

            ))}

        </div>
    )
}
