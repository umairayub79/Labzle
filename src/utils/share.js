import strings from '../constants/strings'
import { MAX_CHALLENGES } from '../constants/settings'
import { UAParser } from 'ua-parser-js'

const webShareApiDeviceTypes = ['mobile', 'smarttv', 'wearable']
const parser = new UAParser()
const browser = parser.getBrowser()
const device = parser.getDevice()

export const shareStatus = (
    guesses,
    isGameLost,
    isHardMode,
    handleShareToClipboard,
    solutionIndex,
) => {
    const textToShare = `${strings.gameTitle} ${solutionIndex} ${isGameLost ? 'X' : guesses.length}/${MAX_CHALLENGES}${isHardMode ? '*' : ''}\n\n` + getGeneratedEmojiGrid(guesses, getEmojiTiles())
    
    const shareData = { text: textToShare }

    let shareSuccess = false

    try {
        if (attemptShare(shareData)) {
            navigator.share(shareData)
            shareSuccess = true
        }
    } catch (error) {
        shareSuccess = false
    }

    if (!shareSuccess) {
        navigator.clipboard.writeText(textToShare)
        handleShareToClipboard()
    }
}

export const getGeneratedEmojiGrid = (guesses, tiles) => {
    return guesses.map((guess) => {
        return guess.map((letter) => {
            switch (letter?.status) {
                case 'correct':
                    return tiles[0];
                case 'missplaced':
                    return tiles[1];
            
                default:
                    return tiles[2]
            }
        }).join('')
    }).join('\n')

}
const attemptShare = (shareData) => {
    return (
        browser.name?.toUpperCase().indexOf('FIREFOX') === -1 &&
        webShareApiDeviceTypes.indexOf(device.type ?? '') !== -1 &&
        navigator.canShare &&
        navigator.canShare(shareData) &&
        navigator.share
    )
}
const getEmojiTiles = () => {
    let tiles = []
    tiles.push('🟩')
    tiles.push('🟨')
    tiles.push('⬜')
    return tiles
}