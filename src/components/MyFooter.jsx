import React from "react"
import { Container } from "react-bootstrap"

const MyFooter = () => {
  return (
    <footer className="bg-primary text-light mt-auto py-3">
      <Container className="text-center">
        <p>© {new Date().getFullYear()} epsyFRG. Tutti i diritti riservati.</p>
      </Container>
    </footer>
  )
}

export default MyFooter
