import { useRef, type ReactNode } from 'react'
import Box, { type BoxProps } from '@mui/material/Box'
import gsap from 'gsap'

interface TiltCardProps extends Omit<BoxProps, 'ref'> {
  children: ReactNode
  /** góc nghiêng tối đa (độ) */
  max?: number
  /** tỉ lệ phóng to khi hover */
  scale?: number
  /** hiển thị vệt sáng (glare) chạy theo chuột */
  glare?: boolean
}

/**
 * Card tilt 3D theo con trỏ: xoay rotateX/rotateY theo vị trí chuột,
 * có perspective + vệt sáng glare, reset mượt khi rời chuột.
 */
export function TiltCard({ children, max = 12, scale = 1.03, glare = true, sx, ...boxProps }: TiltCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const wrap = wrapRef.current
    const card = cardRef.current
    if (!wrap || !card) return
    const rect = wrap.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rotateY = (px - 0.5) * 2 * max
    const rotateX = (0.5 - py) * 2 * max

    gsap.to(card, {
      rotateX,
      rotateY,
      scale,
      duration: 0.5,
      ease: 'power3.out',
      transformPerspective: 900,
    })

    if (glare && glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 0.6,
        background: `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.55), transparent 55%)`,
        duration: 0.4,
      })
    }
  }

  const handleLeave = () => {
    const card = cardRef.current
    if (card) gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.7, ease: 'power3.out' })
    if (glareRef.current) gsap.to(glareRef.current, { opacity: 0, duration: 0.5 })
  }

  return (
    <Box
      ref={wrapRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      sx={{ perspective: '1000px', height: '100%', ...sx }}
      {...boxProps}
    >
      <Box
        ref={cardRef}
        sx={{
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          borderRadius: 'inherit',
        }}
      >
        {glare && (
          <Box
            ref={glareRef}
            aria-hidden
            sx={{
              position: 'absolute',
              inset: 0,
              opacity: 0,
              pointerEvents: 'none',
              zIndex: 2,
              borderRadius: 'inherit',
            }}
          />
        )}
        <Box sx={{ position: 'relative', zIndex: 1, height: '100%', transform: 'translateZ(40px)' }}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}
