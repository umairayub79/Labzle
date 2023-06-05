import React from 'react'
import strings from '../../constants/strings'
import { BaseModal } from './BaseModal'
import {SettingsToggle} from '../Toggle/SettingsToggle'

export const SettingsModal = ({ isOpen, handleClose, solutionIndex, isDarkMode, handleDarkMode, isHardMode, handleHardMode }) => {
    return (
        <BaseModal title={strings.modalTitles.settingsTitle} isOpen={isOpen} handleClose={handleClose}>
            <div className="flex flex-col mt-2 divide-y">
                <SettingsToggle settingName={strings.settingsModalTexts.hardMode} flag={isHardMode} handleFlag={handleHardMode} />
                <SettingsToggle settingName={strings.settingsModalTexts.darkMode} flag={isDarkMode} handleFlag={handleDarkMode} />
                <div className='mt-4'>
                    <p className='mt-4 text-gray-400 dark:text-200'>{strings.gameTitle}# {solutionIndex}</p>
                </div>
            </div>
        </BaseModal>
    )
}
