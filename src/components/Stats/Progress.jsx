import React from 'react'
import cx from 'classnames'

export const Progress = ({ index, size, label, currentDayStatRow }) => {
    const currentRowClass = cx(
        'text-xs font-medium text-blue-100 text-center p-0.5',
        {
            'bg-green-600': currentDayStatRow,
            'bg-gray-600': !currentDayStatRow,
        }
    )
    return (
        <div className='flex justify-left m-1'>
            <div className='items-center justify-center w-2'>{index + 1}</div>
            <div className='w-full ml-2'>
                <div style={{ width: `${8 + size}%` }} className={currentRowClass}>{label}</div>
            </div>
        </div>
    )
}
