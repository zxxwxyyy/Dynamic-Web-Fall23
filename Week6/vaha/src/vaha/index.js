import {React, useState} from 'react'
import Container from './Container'
import Nav from './Nav'
import Card from './Card'
import Stepper from './Stepper'

export default function VahaCard(props) {
  // Set useState for beginning steps  
  const [currentStep, setCurrentStep] = useState(1);
  
  return (
    <Container>
        <Nav />
        <Stepper currentStep={currentStep}/>
        <Card currentStep={currentStep} setCurrentStep={setCurrentStep} />
        
    </Container>
  )
}
