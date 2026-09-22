"use client"

import React from 'react'
import {GlassSurface} from "@/components"
import { useRouter } from 'next/navigation'

const NavBar = () => {
  const router = useRouter()
  return (
    <nav className="w-full fixed z-30 pt-8 px-8 flex items-center justify-between">
        <GlassSurface
          width={50}
          height={50}
          borderRadius={100}
          backgroundOpacity={0.5}
          saturation={1}
          borderWidth={0.07}
          displace={2}
          distortionScale={-180}
          blur={11}
          brightness={50}
          opacity={3}
          mixBlendMode="screen"
        >
          <div className="flex w-15 items-center gap-1">
            <img src="icon.svg" alt="" />
          </div>
          </GlassSurface>
          <div className="flex gap-8">
            <GlassSurface
          width={100}
          height={50}
          borderRadius={100}
          backgroundOpacity={0.2}
          saturation={1}
          borderWidth={0.07}
          displace={2}
          distortionScale={-180}
          blur={5}
          brightness={50}
          opacity={0.1}
          mixBlendMode="screen"
        >
            <button onClick={() => router.push('/')} className="text-white font-avant font-medium hover:text-zinc-300 transition-colors">
              HOME
            </button>
            </GlassSurface>
            <GlassSurface
          width={130}
          height={50}
          borderRadius={100}
          backgroundOpacity={0.2}
          saturation={1}
          borderWidth={0.07}
          displace={2}
          distortionScale={-180}
          blur={5}
          brightness={50}
          opacity={0.1}
          mixBlendMode="screen"
        >
            <button onClick={() => router.push('/dashboard')} className="text-white font-avant font-medium hover:text-zinc-300 transition-colors">
              DASHBOARD
            </button>
            </GlassSurface>
            <GlassSurface
          width={150}
          height={50}
          borderRadius={100}
          backgroundOpacity={0.2}
          saturation={1}
          borderWidth={0.07}
          displace={2}
          distortionScale={-180}
          blur={5}
          brightness={50}
          opacity={0.1}
          mixBlendMode="screen"
        >
            <button onClick={() => router.push('/marketplace')} className="text-white font-avant font-medium hover:text-zinc-300 transition-colors">
              MARKETPLACE
            </button>
            </GlassSurface>
          </div>
        </nav>
  )
}

export default NavBar