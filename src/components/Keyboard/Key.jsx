import React from 'react'
import { MAX_WORD_LENGTH, REVEAL_TIME_MS } from '../../constants/settings'
import {BackspaceIcon, SunIcon} from '@heroicons/react/20/solid'
export const Key = ({ value, className, onClick, isRevealing }) => {
    const keyDelay = REVEAL_TIME_MS * MAX_WORD_LENGTH
    const handleClick = (event) => {
        onClick(value)
        event.currentTarget.blur()
    }
    const style = {
        transitionDelay: isRevealing ? `${keyDelay}ms` : 'unset',
    }

    const renderValue = () => {
        if (value === 'ENTER') {
          return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-return-left" viewBox="0 0 16 16"> <path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/> </svg>;
        } else if (value === 'DELETE') {
          return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-backspace-reverse" viewBox="0 0 16 16"> <path d="M9.854 5.146a.5.5 0 0 1 0 .708L7.707 8l2.147 2.146a.5.5 0 0 1-.708.708L7 8.707l-2.146 2.147a.5.5 0 0 1-.708-.708L6.293 8 4.146 5.854a.5.5 0 1 1 .708-.708L7 7.293l2.146-2.147a.5.5 0 0 1 .708 0z"/> <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7.08a2 2 0 0 0 1.519-.698l4.843-5.651a1 1 0 0 0 0-1.302L10.6 1.7A2 2 0 0 0 9.08 1H2zm7.08 1a1 1 0 0 1 .76.35L14.682 8l-4.844 5.65a1 1 0 0 1-.759.35H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h7.08z"/> </svg>
        } else {
          return value;
        }
      };
    
    return (
        <div className='w-10 px-1'>
            <button style={style} className={`block cursor-pointer w-full h-10 rounded dark:text-white dark:hover:bg-indigo-400 p-1 shadow focus:outline-none text-center leading-none border-gray-300 ${className}`} onClick={handleClick}>
            {renderValue()}
        </button>
        </div>
        
    )
}
