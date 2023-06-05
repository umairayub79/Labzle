import React from 'react'
import strings from '../../constants/strings'

const StatsItem = ({ label, value }) => {
  return (
    <div className="items-center justify-center m-2 w-1/4 text-center dark:text-white">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-xs">{label}</div>
    </div>
  )
}

export const StatsBar = ({ stats, isArabicMode }) => {
  return (
    <div className="flex justify-center my-2">
      <StatsItem label={strings.statsModalTexts.totalTriesText} value={stats.totalGames} />
      <StatsItem label={strings.statsModalTexts.successRateText} value={stats.successRate} />
      <StatsItem label={strings.statsModalTexts.currentStreakText} value={stats.currentStreak} />
      <StatsItem label={strings.statsModalTexts.bestStreakText} value={stats.bestStreak} />
    </div>
  )
}
