import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Đồng bộ Lenis (cuộn mượt toàn cục) với GSAP ScrollTrigger.
 * - Lenis bơm sự kiện scroll vào ScrollTrigger.update()
 * - GSAP ticker điều khiển RAF của Lenis -> chỉ còn 1 vòng render duy nhất.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Cho phép anchor (#id) dùng Lenis thay vì nhảy giật
    const handleAnchor = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!target) return
      const hash = target.getAttribute('href')
      if (!hash || hash === '#') return
      const node = document.querySelector(hash)
      if (!node) return
      e.preventDefault()
      lenis.scrollTo(node as HTMLElement, { offset: -80, duration: 1.4 })
    }
    document.addEventListener('click', handleAnchor)

    return () => {
      document.removeEventListener('click', handleAnchor)
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])
}
