import React, { Component } from "react"
import { Card } from "react-bootstrap"

class SingleBook extends Component {
  state = {
    selected: false,
  }

  handleToggle = () => {
    this.setState((prevState) => ({ selected: !prevState.selected }))
  }

  render() {
    const { book } = this.props
    const { selected } = this.state
    return (
      <Card
        onClick={this.handleToggle}
        style={{
          border: selected ? "2px solid red" : "1px solid #ddd",
          cursor: "pointer",
        }}
        className="h-100"
      >
        <Card.Img variant="top" src={book.img} alt={book.title} />
        <Card.Body>
          <Card.Title>{book.title}</Card.Title>
        </Card.Body>
      </Card>
    )
  }
}

export default SingleBook
