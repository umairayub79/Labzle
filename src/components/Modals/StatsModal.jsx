import React from 'react'
import { BaseModal } from './BaseModal'
import { StatsBar } from '../Stats/StatsBar'
import { Histogram } from '../Stats/Histogram'
import Countdown from 'react-countdown'
import { shareStatus } from '../../utils/share'
import strings from '../../constants/strings'

export const StatsModal = ({tomorrow,solutionIndex, isOpen, guesses, isGameWon, isGameLost, isHardMode, stats, handleShareToClipboard, handleClose }) => {
  if (stats.totalGames <= 0) {
    return (
      <BaseModal title={strings.modalTitles.statisticsTitle} isOpen={isOpen} handleClose={handleClose}>
        <StatsBar stats={stats}/>
      </BaseModal>
    )
  } else {
    return (
      <BaseModal title={strings.modalTitles.statisticsTitle} isOpen={isOpen} handleClose={handleClose}>
        <StatsBar stats={stats}/>
        <h4 className='text-center text-lg leading-6 font-medium text-gray-600 dark:text-gray-100'>
          {strings.statsModalTexts.guessDistributionText}
        </h4>
        <Histogram
          stats={stats}
          numberOfGuessesMade={guesses.length}
          isGameWon={isGameWon} />

        {(isGameWon || isGameLost) && (
          <div className="items-center content-center mt-5 sm:mt-6 columns-2 dark:text-gray-100">
            <div>
              <h5>{strings.statsModalTexts.newWordText}</h5>
              <Countdown
                className='text-lg font-medium text-gray-900 dark:text-gray-100'
                date={tomorrow}
                daysInHours={true} />
            </div>
            <button
              className="mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white uppercase focus:outline-none focus:ring-2 focus-ring-offset-2 sm:text-sm bg-green-600 hover:bg-green-700 focus:ring-green-500"
              type='button'
              onClick={() => shareStatus(guesses, isGameLost, isHardMode, handleShareToClipboard,solutionIndex)}>
              {strings.statsModalTexts.shareText}
            </button>
          </div>
        )}
      </BaseModal>
    )
  }

}