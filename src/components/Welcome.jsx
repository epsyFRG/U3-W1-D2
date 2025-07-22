import React, { useState } from "react"
import { Alert } from "react-bootstrap"

const Welcome = () => {
  const [show, setShow] = useState(true)

  if (!show) return null

  return (
    <Alert
      variant="success"
      className="text-center mt-4"
      onClose={() => setShow(false)}
      dismissible
    >
      <Alert.Heading>Benvenuto nel mio shop!</Alert.Heading>
      <p className="mb-0">Scopri i nostri libri.</p>
    </Alert>
  )
}

export default Welcome
