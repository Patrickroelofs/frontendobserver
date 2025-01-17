'use client'

import { type ReactElement, useEffect, useRef, useState } from 'react'

function EyeBalls(): ReactElement {
  const svgRef = useRef<SVGSVGElement>(null)
  const eyeBallLeftRef = useRef<SVGPathElement>(null)
  const eyeBallRightRef = useRef<SVGPathElement>(null)
  const [leftEyePosition, setLeftEyePosition] = useState({ x: 0, y: 0 })
  const [rightEyePosition, setRightEyePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent): void => {
      if (svgRef.current && eyeBallLeftRef.current && eyeBallRightRef.current) {
        const eyeBallLeftRect = eyeBallLeftRef.current.getBoundingClientRect()
        const eyeBallRightRect = eyeBallRightRef.current.getBoundingClientRect()

        const calculateEyePosition = (eyeBallRect: DOMRect) => {
          const eyeBallCenterX = eyeBallRect.left + eyeBallRect.width / 2
          const eyeBallCenterY = eyeBallRect.top + eyeBallRect.height / 2

          const angle = Math.atan2(event.clientY - eyeBallCenterY, event.clientX - eyeBallCenterX)
          const distance = Math.min(
            eyeBallRect.width / 2,
            Math.hypot(event.clientX - eyeBallCenterX, event.clientY - eyeBallCenterY),
          )

          return {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
          }
        }

        setLeftEyePosition(calculateEyePosition(eyeBallLeftRect))
        setRightEyePosition(calculateEyePosition(eyeBallRightRect))
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <svg
      className="absolute top-8 drop-shadow-xl hidden lg:block"
      ref={svgRef}
      width="85"
      height="55"
      viewBox="0 0 242 156"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          ref={eyeBallRightRef}
          d="M234 77.8277C234 97.8095 228.09 115.575 218.931 128.15C209.768 140.733 197.785 147.655 185.318 147.655C172.851 147.655 160.868 140.733 151.704 128.15C142.546 115.575 136.636 97.8095 136.636 77.8277C136.636 57.8459 142.546 40.08 151.704 27.5049C160.868 14.9225 172.851 8 185.318 8C197.785 8 209.768 14.9225 218.931 27.5049C228.09 40.08 234 57.8459 234 77.8277Z"
          fill="white"
          stroke="black"
          strokeWidth="16"
        />
        <ellipse
          cx={185.318 + rightEyePosition.x}
          cy={77.8276 + rightEyePosition.y}
          rx="30.5437"
          ry="36.1238"
          fill="black"
        />
        <ellipse
          cx={185.318 + rightEyePosition.x}
          cy={54.6262 + rightEyePosition.y}
          rx="6.46116"
          ry="7.04854"
          fill="white"
        />
        <path
          ref={eyeBallLeftRef}
          d="M105.364 77.8277C105.364 97.8095 99.454 115.575 90.2956 128.15C81.1318 140.733 69.1493 147.655 56.682 147.655C44.2148 147.655 32.2323 140.733 23.0685 128.15C13.91 115.575 8 97.8095 8 77.8277C8 57.8459 13.91 40.08 23.0685 27.5049C32.2323 14.9225 44.2148 8 56.682 8C69.1493 8 81.1318 14.9225 90.2956 27.5049C99.454 40.08 105.364 57.8459 105.364 77.8277Z"
          fill="white"
          stroke="black"
          strokeWidth="16"
        />
        <ellipse
          cx={56.682 + leftEyePosition.x}
          cy={77.8276 + leftEyePosition.y}
          rx="30.5437"
          ry="36.1238"
          fill="black"
        />
        <ellipse
          cx={56.682 + leftEyePosition.x}
          cy={54.6262 + leftEyePosition.y}
          rx="6.46116"
          ry="7.04854"
          fill="white"
        />
      </g>
    </svg>
  )
}

export { EyeBalls }
