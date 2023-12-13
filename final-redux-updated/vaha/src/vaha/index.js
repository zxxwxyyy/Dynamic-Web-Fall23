import {React} from 'react'
import Container from './Container'
import Nav from './Nav'
import Card from './Card'
import Stepper from './Stepper'

export default function VahaCard() {
  
  return (
      <Container>
          <Nav />
          <Stepper />
          <Card />
      </Container>
  )
}
