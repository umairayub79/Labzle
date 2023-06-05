import { useState, useEffect, useCallback } from 'react'
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
import { MAX_WORD_LENGTH, MAX_CHALLENGES, ALERT_TIME_MS, REVEAL_TIME_MS, WELCOME_INFO_MODAL_MS, GAME_LOST_INFO_DELAY } from './constants/settings'
import GraphemeSplitter from 'grapheme-splitter'
import { Keyboard } from './components/Keyboard/Keyboard'
import strings from './constants/strings'
import { words } from './constants/dictionary'
import ToastContainer from './components/Toast/ToastContainer'
import { useToast } from './hooks/useToast'
import { InfoModal } from './components/Modals/InfoModal'
import { StatsModal } from './components/Modals/StatsModal'
import { loadStats } from './utils/stats'
import { SettingsModal } from './components/Modals/SettingsModal'


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
  const showToast = useToast(ALERT_TIME_MS)


  const [isGameWon, setIsGameWon] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [currentRowClass, setCurrentRowClass] = useState('')
  const [currentGuess, setCurrentGuess] = useState('')
  const [isRevealing, setIsRevealing] = useState(false)
  const [allowInteraction, setAllowInteraction] = useState(true)
  const [letterStatuses, setLetterStatuses] = useState([])
  const [isHardMode, setIsHardMode] = useState(false)
  const { solution, solutionIndex, tomorrow } = getWordOfDay()


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

  const [stats, setStats] = useState(() => loadStats())

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  useEffect(() => {
    // if no game state on load,
    // show the user the how-to info modal
    if (!loadGameStateFromLocalStorage()) {
      setTimeout(() => {
        setIsInfoModalOpen(true)
      }, WELCOME_INFO_MODAL_MS)
    }
  }, [])

  
  const handleDarkMode = (isDarkMode) => {
    setIsDarkMode(isDarkMode)
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
  }
  const handleHardMode = (isHardMode) => {
    if (guesses.length === 0 || localStorage.getItem('gameMode') === 'hard') {
      setIsHardMode(isHardMode)
      localStorage.setItem('gameMode', isHardMode ? 'hard' : 'normal')
    } else {
      console.log("error")
      showToast('error', strings.alertMessages.hardModeAlertMessage)
    }
  }

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
      validate()
    }
  }

  const updateLetterStatuses = (word) => {
    setLetterStatuses((prev) => {
      const newLetterStatuses = { ...prev }
      for (let i = 0; i < MAX_WORD_LENGTH; i++) {
        if (newLetterStatuses[word.toUpperCase()[i]] === "correct") continue

        if (word[i] === solution[i]) {
          newLetterStatuses[word.toUpperCase()[i]] = "correct"
        } else if (solution.includes(word[i])) {
          newLetterStatuses[word.toUpperCase()[i]] = "missplaced"
        } else {
          newLetterStatuses[word.toUpperCase()[i]] = "wrong"
        }
      }
      return newLetterStatuses
    })
  }


  function clearReveal() {
    setIsRevealing(false)
    setAllowInteraction(!isRevealing)
  }
  function clearCurrentRowClass() {
    setCurrentRowClass('')
  }

  const validate = useCallback(
    () => {
      if (currentGuess.length !== MAX_WORD_LENGTH) {
        setCurrentRowClass("jiggle")
        setTimeout(() => {
          clearCurrentRowClass()
        }, 250);
        showToast('error', strings.alertMessages.notEnoughLettersMessage)
        return
      }
      if (!words.includes(currentGuess)) {
        setCurrentRowClass("jiggle")
        setTimeout(() => {
          clearCurrentRowClass()
        }, 250);
        showToast('error', strings.alertMessages.wordNotFoundMessage)
        return
      } else if (currentGuess === solution) {
        updateLetterStatuses(currentGuess)
        setStats(addStatsForCompletedGame(stats, guesses.length))
        setAllowInteraction(false)
        setIsRevealing(true)
        setTimeout(() => {
          clearReveal()
        }, REVEAL_TIME_MS * MAX_WORD_LENGTH);
        setGuesses([
          ...guesses,
          currentGuess.split("").map((letter) => ({ status: "correct", letter })),
        ]);
        setIsGameWon(true)
        setCurrentGuess("");
        clearCurrentRowClass()
      } else {
        // enforce hard mode - all guesses must contain all previously revealed letters
        if (isHardMode) {
          const firstMissingReveal = findFirstUnusedReveal(currentGuess.toString(), guesses)
          if (firstMissingReveal) {
            setCurrentRowClass('jiggle')
            setTimeout(() => {
              clearCurrentRowClass()
            }, 250);
            return showToast('error', firstMissingReveal)
          }
        }

        updateLetterStatuses(currentGuess)
        setAllowInteraction(false)
        setIsRevealing(true)
        setTimeout(() => {
          clearReveal()
        }, REVEAL_TIME_MS * MAX_WORD_LENGTH);
        setGuesses([
          ...guesses,
          currentGuess.split("").map((letter, index) => {
            return { status: calculateTileColor(index), letter };
          }),
        ]);
        setCurrentGuess("");
        clearCurrentRowClass()
      }
    },
    [currentGuess, guesses],
  )

  const calculateTileColor = (index) => {
    // correct spot 
    if (currentGuess[index] === solution[index]) {
      return "correct"
    }
    let wrongWord = 0
    let wrongGuess = 0
    for (let i = 0; i < MAX_WORD_LENGTH; i++) {
      if (solution[i] === currentGuess[index] && currentGuess[i] !== currentGuess[index]) {
        wrongWord++
      }
      if (i <= index) {
        if (currentGuess[i] === currentGuess[index] && solution[i] !== currentGuess[index]) {
          wrongGuess++
        }
      }

      if (i >= index) {
        if (wrongGuess === 0) {
          break;
        }
        if (wrongGuess <= wrongWord) {
          return "missplaced"
        }
      }
    }
    return "wrong"
  }

  return (
    <div className='h-[100vh] w-[100vw] overflow-x-hidden overflow-y-auto m-auto flex flex-col justify-between items-center content-center'>
      <Navbar
        setIsInfoModalOpen={setIsInfoModalOpen}
        setIsSettingsModalOpen={setIsSettingsModalOpen}
        setIsStatsModalOpen={setIsStatsModalOpen} />

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
      <ToastContainer />
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)} />

      <StatsModal
        isOpen={isStatsModalOpen}
        stats={stats}
        isGameLost={isGameLost}
        isGameWon={isGameWon}
        isHardMode={isHardMode}
        solutionIndex={solutionIndex}
        tomorrow={tomorrow}
        guesses={guesses}
        handleShareToClipboard={() => showToast('success', strings.alertMessages.gameCopiedMessage)}
        handleClose={() => setIsStatsModalOpen(false)} />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        handleClose={() => setIsSettingsModalOpen(false)}
        solutionIndex={solutionIndex}
        isDarkMode={isDarkMode}
        handleDarkMode={handleDarkMode}
        isHardMode={isHardMode}
        handleHardMode={handleHardMode} />

    </div>
  )
}

export default App
