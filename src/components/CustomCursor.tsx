import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import gsap from 'gsap'

/**
 * Con trỏ chuột tuỳ chỉnh: một chấm nhỏ theo sát tức thời + một vòng tròn
 * theo sau mềm mại (quickTo). Vòng sẽ phóng to khi hover phần tử tương tác.
 * Tự động tắt trên thiết bị cảm ứng.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches
    setEnabled(!isTouch)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 })

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' })
    let shown = false

    const onMove = (e: PointerEvent) => {
      if (!shown) {
        shown = true
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 })
      }
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }

    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest('a, button, [data-cursor="hover"]')
      gsap.to(ring, {
        scale: interactive ? 2.1 : 1,
        borderColor: interactive ? 'rgba(229,193,88,1)' : 'rgba(229,193,88,0.55)',
        duration: 0.3,
        ease: 'power3.out',
      })
      gsap.to(dot, { scale: interactive ? 0.35 : 1, duration: 0.3, ease: 'power3.out' })
    }

    const onDown = () => gsap.to(ring, { scale: 0.82, duration: 0.15 })
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.2 })

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerover', onOver)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <Box
        ref={ringRef}
        aria-hidden
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1.5px solid rgba(229,193,88,0.55)',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
        }}
      />
      <Box
        ref={dotRef}
        aria-hidden
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 7,
          height: 7,
          borderRadius: '50%',
          bgcolor: 'primary.main',
          pointerEvents: 'none',
          zIndex: 10000,
        }}
      />
    </>
  )
}
