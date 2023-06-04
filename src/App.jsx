import { useState, useEffect } from 'react'
import { Navbar } from './components/Navbar/Navbar'
import { Grid } from './components/Grid/Grid'

import {
  findFirstUnusedReveal,
  getWordOfDay,
  getArray,
} from './utils/words'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage
} from './utils/localStorage'
import { MAX_WORD_LENGTH, MAX_CHALLENGES } from './constants/settings'
import GraphemeSplitter from 'grapheme-splitter'
import { Keyboard } from './components/Keyboard/Keyboard'


function App() {

  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
      : prefersDarkMode
        ? true
        : false
  )

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)


  const [isGameWon, setIsGameWon] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [currentRowClass, setCurrentRowClass] = useState('')
  const [currentGuess, setCurrentGuess] = useState('')
  const [isRevealing, setIsRevealing] = useState(false)
  const [allowInteraction, setAllowInteraction] = useState(true)
  const { solution, solutionIndex, tomorrow } = getWordOfDay()
  const [letterStatuses, setLetterStatuses] = useState([])




  const [guesses, setGuesses] = useState(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== solution) {
      return []
    }
    const gameWasWon = getArray(loaded.guesses).includes(solution)
    if (gameWasWon) {
      setIsGameWon(true)
    }
    if (loaded.guesses.length === MAX_CHALLENGES && !gameWasWon) {
      setIsGameLost(true)
    }
    setAllowInteraction(false)
    setIsRevealing(true)
    setTimeout(() => {
      setAllowInteraction(true)
      clearReveal()
    }, REVEAL_TIME_MS * MAX_WORD_LENGTH);
    setLetterStatuses(loaded.letterStatuses)
    return loaded.guesses
  })


  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])



  const onChar = (letter) => {
    console.log(letter);
    if (allowInteraction) {
      if (
        (`${currentGuess}${letter}`).length <= MAX_WORD_LENGTH &&
        guesses.length < MAX_CHALLENGES &&
        !isGameWon
      ) {
        setCurrentGuess(`${currentGuess}${letter}`)
      }
    }
  }
  const onDelete = () => {
    setCurrentGuess(
      new GraphemeSplitter().splitGraphemes(currentGuess).slice(0, -1).join("")
    )
  }

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return
    }
    if (allowInteraction) {
      // validate()
    }
  }



  return (
    <div className='h-[100vh] m-auto flex flex-col justify-between items-center content-center'>
      <Navbar setIsInfoModalOpen={isInfoModalOpen} setIsSettingsModalOpen={isSettingsModalOpen} setIsStatsModalOpen={isStatsModalOpen} />

      <Grid
        guesses={[...guesses]}
        currentGuess={[...currentGuess]}
        currentRowClass={currentRowClass}
        isRevealing={isRevealing} />

      <Keyboard
      onEnter={onEnter}
      onChar={onChar}
      onDelete={onDelete}
      letterStatuses={letterStatuses}
      isRevealing={isRevealing}
    />
    </div>
  )
}

export default App
