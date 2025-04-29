
import HeroSlider from '../components/HeroSlider'
import Clinics from '../Pages/Clinics'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function ClinicsLayout() {
  return (
    <div>
      <HeroSlider/>
      <Outlet/>
    </div>
  )
}
