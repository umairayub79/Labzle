import { MAX_CHALLENGES } from "../constants/settings";
import { saveStatsToLocalStorage, loadGameStatsFromLocalStorage } from "./localStorage";

export const addStatsForCompletedGame = (gameStats, count, wasGameWon) => {
    const stats = { ...gameStats }

    stats.totalGames += 1
    
    if (count + 1 >= MAX_CHALLENGES && !wasGameWon) {
        // Game Lost
        stats.currentStreak = 0
        stats.gamesFailed += 1
    } else {
        stats.winDistribution[count] += 1
        stats.currentStreak += 1

        if (stats.bestStreak < stats.currentStreak) {
            stats.bestStreak = stats.currentStreak
        }
    }

    stats.successRate = getSuccessRate(stats.totalGames, stats.gamesFailed)
    saveStatsToLocalStorage(stats)
    return stats
}

const defaultStats = {
    winDistribution: Array.from(new Array(MAX_CHALLENGES), () => 0),
    gamesFailed: 0,
    currentStreak: 0,
    bestStreak: 0,
    totalGames: 0,
    successRate: 0,
}
export const loadStats = () => {
    return loadGameStatsFromLocalStorage() || defaultStats
}

const getSuccessRate = (totalGames, gamesFailed) => {
    return Math.round(
        (100 * (totalGames - gamesFailed)) / Math.max(totalGames, 1)
    )
}