import { useState, useEffect } from 'react'
import { Navbar } from './components/Navbar/Navbar'

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

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])


  return (
    <div className='h-[100vh] m-auto flex flex-col justify-between items-center content-center'>
      <Navbar setIsInfoModalOpen={isInfoModalOpen} setIsSettingsModalOpen={isSettingsModalOpen} setIsStatsModalOpen={isStatsModalOpen} />
    </div>
  )
}

export default App
