// components/LenisProvider.tsx
"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
        lerp: 0.1,
       // smoothTouch: true,     // ✅ Optional, still supported
      })
      

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    lenisRef.current = lenis

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
