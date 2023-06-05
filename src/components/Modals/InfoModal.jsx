import React from 'react'
import { BaseModal } from './BaseModal'
import { Cell } from '../Grid/Cell'
import strings from '../../constants/strings'

export const InfoModal = ({ isOpen, handleClose }) => {
    return (
        <BaseModal title={strings.modalTitles.infoTitle} isOpen={isOpen} handleClose={handleClose} >
            <div className='text-center items-center content-center'>
                <div className="text-sm text-gray-500 dark:text-gray-300">
                    {strings.infoModalTexts.infoMessage()}
                </div>
                <div className="flex justify-center mb-1 mt-4">
                    <><Cell
                        isRevealing={true}
                        isCompleted={true}
                        letter="ب"
                        status="correct"
                    />
                        <Cell letter="ل" />
                        <Cell letter="و" />
                        <Cell letter="چ" />
                        <Cell letter="ی" />
                    </>
                </div>
                {strings.infoModalTexts.infoExample1()}

                <div className="flex justify-center mb-1 mt-4">
                    <>
                        <Cell letter="ب" />
                        <Cell letter="ل" />
                        <Cell
                            letter="و"
                            isRevealing={true}
                            isCompleted={true}
                            status="missplaced" />
                        <Cell letter="چ" />
                        <Cell letter="ی" />
                    </>
                </div>
                {strings.infoModalTexts.infoExample2()}


                <div className="flex justify-center mb-1 mt-4">
                    <>
                        <Cell letter="ب" />
                        <Cell letter="ل" />
                        <Cell letter="و" />
                        <Cell letter="چ"
                            isRevealing={true}
                            isCompleted={true}
                            status="wrong" />
                        <Cell letter="ی" />
                    </>
                </div>
                {strings.infoModalTexts.infoExample3()}

                <div className='mt-4'>
                    {strings.infoModalTexts.infoMessage1()}
                </div>
            </div>
        </BaseModal>
    )
}