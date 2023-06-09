import React, { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XCircleIcon } from '@heroicons/react/20/solid'

export const BaseModal = ({ title, children, isOpen, handleClose }) => {
    let closeButtonRef = useRef(null)
    return (
        <Transition.Root
            as={Fragment}
            show={isOpen}>
            <Dialog as="div" initialFocus={closeButtonRef} className="fixed z-10 inset-0 overflow-y-auto" onClose={handleClose}>
                <div className="flex items-center justify-center min-h-screen py-10 px-4 text-center sm:block sm:p-0">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is for trick the browser into centering the modal contents*/}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-90"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-0 sm:scale-95">
                        <div className="w-full h-full inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform translate-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6 dark:bg-gray-800">
                            <div className="absolute right-4 top-4">
                                <XCircleIcon ref={closeButtonRef} className="h-6 w-6 cursor-pointer dark:stroke-white" onClick={() => handleClose()} />
                            </div>
                            <div>
                                <div className="text-center">
                                    <Dialog.Title as="h3" className="text-lg leading-4 font-medium text-gray-900 dark:text-gray-100">
                                        {title}
                                    </Dialog.Title>
                                </div>
                                <div className='mt-2'>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>

        </Transition.Root>
    )
}