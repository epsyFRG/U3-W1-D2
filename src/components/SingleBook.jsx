import React, { Component } from "react"
import { Card } from "react-bootstrap"

class SingleBook extends Component {
  render() {
    const { book, selectedAsin } = this.props
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
}

export default SingleBook
