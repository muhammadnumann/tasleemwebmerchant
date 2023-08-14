'use client'

import icon from '@/public/images/full-screen.svg'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const HeaderFullScreen = () => {
  const [isFull, setIsFull] = useState(false)

  const fullHandler = () => {
    if (!isFull) {
      // document.documentElement.requestFullscreen()
      (document as any).webkitRequestFullscreen()
        (document as any).webkitEnterFullscreen()

      if ((document as any).webkitRequestFullscreen) (document as any).webkitRequestFullscreen();
      else if ((document as any).mozRequestFullScreen) (document as any).mozRequestFullScreen(); // Careful to the capital S
      else if ((document as any).msRequestFullscreen) (document as any).msRequestFullscreen();
      else if ((document as any).webkitEnterFullscreen) (document as any).webkitEnterFullscreen(); // Magic is here for iOS
    } else {
      document.exitFullscreen()
    }
    setIsFull(!isFull)
  }
  useEffect(() => {
    function exitHandler() {
      if (
        !(document as any).webkitIsFullScreen &&
        !(document as any).mozFullScreen &&
        !(document as any).msFullscreenElement
      ) {
        setIsFull(false)
      }
    }
    document.addEventListener('webkitfullscreenchange', exitHandler, false)
    document.addEventListener('mozfullscreenchange', exitHandler, false)
    document.addEventListener('fullscreenchange', exitHandler, false)
    document.addEventListener('MSFullscreenChange', exitHandler, false)

    return () => {
      document.removeEventListener('webkitfullscreenchange', exitHandler, false)
      document.removeEventListener('mozfullscreenchange', exitHandler, false)
      document.removeEventListener('fullscreenchange', exitHandler, false)
      document.removeEventListener('MSFullscreenChange', exitHandler, false)
    }
  }, [])

  return (
    <button
      onClick={fullHandler}
      className='w-6 h-6 cursor-pointer p-1 flex justify-center items-center bg-[#F7C7FF] shadow-icon rounded sm:rounded-lg sm:text-base sm:w-12 sm:h-12'
    >
      <Image src={icon} alt='full screen' />
    </button>
  )
}

export default HeaderFullScreen
