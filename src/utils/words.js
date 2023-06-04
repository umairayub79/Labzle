import { default as GraphemeSplitter } from 'grapheme-splitter'
import { words } from '../constants/dictionary'
import strings from '../constants/strings'

export const getWord = (guess) => {
    let word = ""
    guess.map(({ letter }) => {
        word = word + letter
    })
    return word
}

export const getArray = (guesses) => {
    let myGuesses = []
    guesses.map((guess) => {
        myGuesses = [...myGuesses, getWord(guess)]
    })
    return myGuesses
}

export const getWordOfDay = () => {
    // January 1, 2022 Game Epoch
    const epochMs = new Date(2022, 2, 21).valueOf()
    const now = Date.now()
    const msInDay = 86400000
    const index = Math.floor((now - epochMs) / msInDay)
    const nextday = (index + 1) * msInDay + epochMs

    return {
        solution: (words[index % words.length]),
        solutionIndex: index,
        tomorrow: nextday,
    }
}

const createArray = (arr, prop) => {
    let result = []
    for (let index = 0; index < arr.length; index++) {
        result.push(arr[index][prop]);
    }
    return result.join('')
}
// build a set of previously revealed letters - present and correct
// guess must use correct letters in that space and any other revealed letters
// also check if all revealed instances of a letter are used (i.e. two C's)
export const findFirstUnusedReveal = (word, guesses) => {
    if (guesses.length === 0) {
        return false
    }

    const lettersLeftArray = []
    const guess = guesses[guesses.length - 1]
    const splitWord = unicodeSplit(word)
    const splitGuess = unicodeSplit(createArray(guess, "letter"))

    for (let i = 0; i < splitGuess.length; i++) {
        if (guess[i]?.status === 'correct' || guess[i]?.status === 'missplaced') {
            lettersLeftArray.push(splitGuess[i])
        }
        if (guess[i]?.status === 'correct' && splitWord[i] !== splitGuess[i] && splitWord.includes(splitGuess[i])) {
            return strings.alertMessages.wrongSpotMessage(splitGuess[i].toUpperCase(), i + 1)
        }
    }

    let n
    for (const letter of splitWord) {
        n = lettersLeftArray.indexOf(letter)
        if (n !== -1) {
            lettersLeftArray.splice(n, 1)
        }
    }

    if (lettersLeftArray.length > 0) {
        return strings.alertMessages.notContainedMessage(lettersLeftArray[0].toUpperCase())
    }
    return false
}

export const unicodeSplit = (word) => {
    return new GraphemeSplitter().splitGraphemes(word)
}