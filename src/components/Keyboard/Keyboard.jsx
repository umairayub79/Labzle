import { useEffect } from 'react'
import { Key } from './Key'
import keys from './Keys'
import cx from 'classnames'

export const Keyboard = ({ onChar, onDelete, onEnter, letterStatuses, isRevealing }) => {

    const onClick = (value) => {
        if (value === 'ENTER') {
            onEnter()
        } else if (value === 'DELETE') {
            onDelete()
        } else {
            onChar(value.toLowerCase())
        }
    }
    useEffect(() => {
        const listener = (e) => {
            if (e.code === 'Enter') {
                onEnter()
                return
            }
            if (e.key === "Backspace" || e.key === "Delete") {
                onDelete()
                return
            }

        }
        window.addEventListener('keyup', listener)

        return () => {
            window.removeEventListener('keyup', listener)
        }
    }, [onEnter, onDelete, onChar])

    return (
        <div className='flex flex-col gap-2'>
            {
                keys.map((row, index) => {
                    return (
                        <div className='flex -mx-1 justify-center' key={index}>
                            {row.map((key) => {
                                let keyStatus = letterStatuses[key];
                                return <Key
                                    value={key}
                                    key={key}
                                    isRevealing={isRevealing}
                                    className={cx({
                                        'transition ease-in-out': isRevealing,
                                        'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white': key === "DELETE",
                                        'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white': key === "ENTER",
                                        'bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 active:bg-slate-400': !keyStatus,
                                        'bg-slate-400 dark:bg-slate-800 text-white': keyStatus === "wrong",
                                        'bg-green-500 hover:bg-green-600 active:bg-green-700 text-white': keyStatus === "correct",
                                        'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white': keyStatus === "missplaced"

                                    })}
                                    onClick={onClick}
                                />
                            }
                            )}
                        </div>
                    )
                })
            }
        </div>
    )
}