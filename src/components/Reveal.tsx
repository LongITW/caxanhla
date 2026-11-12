import { useRef, type ReactNode } from 'react'
import Box, { type BoxProps } from '@mui/material/Box'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface RevealProps extends BoxProps {
  children: ReactNode
  /** hướng trượt vào */
  from?: 'up' | 'down' | 'left' | 'right'
  /** khoảng dịch chuyển px */
  distance?: number
  /** độ trễ giây */
  delay?: number
  /** thời lượng giây */
  duration?: number
}

/**
 * Bọc nội dung và reveal bằng GSAP ScrollTrigger: trượt + fade-in theo timeline
 * khi element đi vào viewport.
 */
export function Reveal({
  children,
  from = 'up',
  distance = 60,
  delay = 0,
  duration = 1,
  ...boxProps
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const axis = from === 'left' || from === 'right' ? 'x' : 'y'
      const sign = from === 'up' || from === 'left' ? 1 : -1

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) {
        gsap.set(el, { opacity: 1 })
        return
      }

      gsap.fromTo(
        el,
        { autoAlpha: 0, [axis]: distance * sign },
        {
          autoAlpha: 1,
          [axis]: 0,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 86%',
            toggleActions: 'play none none reverse',
          },
        },
      )
    },
    { scope: ref },
  )

  return (
    <Box ref={ref} {...boxProps}>
      {children}
    </Box>
  )
}
