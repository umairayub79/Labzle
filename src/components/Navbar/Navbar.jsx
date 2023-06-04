import React from 'react'
import {
    ChartBarIcon,
    CogIcon,
    InformationCircleIcon,
  } from '@heroicons/react/24/outline'

export const Navbar = ({ setIsSettingsModalOpen, setIsInfoModalOpen, setIsStatsModalOpen }) => {
    return (
        <div className="w-full border-b-[1px] border-b-gray-300">
            <div className="flex h-12 items-center justify-between px-5">
                <div className="flex">
                    <CogIcon
                        className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
                        onClick={() => setIsSettingsModalOpen(true)}
                    />
                    <ChartBarIcon
                        className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
                        onClick={() => setIsStatsModalOpen(true)}
                    />
                </div>
                <p className='text-xl font-bold dark:text-white'>لبزل</p>
                <InformationCircleIcon
                    className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
                    onClick={() => setIsInfoModalOpen(true)} />
            </div>
        </div>
    )
}
