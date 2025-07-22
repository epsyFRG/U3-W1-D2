import React from "react"
import { Card, Row, Col, Container } from "react-bootstrap"
import fantasyBooks from "../data/fantasy.json"

const AllTheBooks = () => {
  return (
    <Container className="my-4">
      <Row>
        {fantasyBooks.map((book) => (
          <Col key={book.asin} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card>
              <Card.Img variant="top" src={book.img} alt={book.title} />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>Prezzo: €{book.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default AllTheBooks
