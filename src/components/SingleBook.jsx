import React from "react"
import { Card } from "react-bootstrap"

function SingleBook({ book, selectedAsin }) {
  const isSelected = selectedAsin === book.asin
  return (
    <Card
      style={{
        border: isSelected ? "2px solid red" : "1px solid #ddd",
        cursor: "pointer",
      }}
      className="h-100"
    >
      <Card.Img variant="top" src={book.img} alt={book.title} />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>{book.category}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default SingleBook
