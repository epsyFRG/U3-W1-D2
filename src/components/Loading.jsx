import React from "react"
import { Spinner } from "react-bootstrap"

const Loading = () => (
  <div className="d-flex justify-content-center my-3">
    <Spinner animation="border" role="status" variant="success">
      <span className="visually-hidden">Caricamento...</span>
    </Spinner>
  </div>
)

export default Loading
