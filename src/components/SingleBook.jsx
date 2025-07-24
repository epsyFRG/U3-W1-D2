import React, { Component } from "react"
import { Card } from "react-bootstrap"
import CommentArea from "./CommentArea"

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
        {selected && (
          <div onClick={(e) => e.stopPropagation()}>
            <CommentArea book={book} />
          </div>
        )}
      </Card>
    )
  }
}

export default SingleBook
