const gameStateKey = "gameState"
const gameStatsKey = "gameStats"

export const saveGameStateToLocalStorage = (gameState) => {
  localStorage.setItem(gameStateKey, JSON.stringify(gameState))
}

export const loadGameStateFromLocalStorage = () => {
  const state = localStorage.getItem(gameStateKey)
  return state ? (JSON.parse(state)) : null
}

export const saveStatsToLocalStorage = (stats) => {
  localStorage.setItem(gameStatsKey, JSON.stringify(stats))
}
export const loadGameStatsFromLocalStorage = () => {
  const stats = localStorage.getItem(gameStatsKey)
  return stats ? (JSON.parse(stats)) : null
}