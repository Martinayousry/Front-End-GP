import HeroSlider from '../components/HeroSlider'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AdoptionLayout() {
  return (
    <div>
      <HeroSlider/>
      <Outlet/>
    </div>
  )
}
