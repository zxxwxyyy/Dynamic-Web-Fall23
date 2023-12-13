import {React, useState} from 'react'
import Container from './Container'
import Nav from './Nav'
import Card from './Card'
import Stepper from './Stepper'
import { CamProvider } from '../context/cameraContext'

export default function VahaCard() {
  // Set useState for beginning steps  
  const [currentStep, setCurrentStep] = useState(1);
  
  return (
    <CamProvider currentStep={currentStep} setCurrentStep={setCurrentStep}>
      <Container>
          <Nav />
          <Stepper />
          <Card />
          
      </Container>
    </CamProvider>
  )
}
