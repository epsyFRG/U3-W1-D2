import React, { useState } from "react"
import { Row, Col, Form, Container } from "react-bootstrap"
import SingleBook from "./SingleBook"

const BookList = ({ books }) => {
  const [search, setSearch] = useState("")

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Container className="my-4">
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Cerca per titolo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form>
      <Row>
        {filteredBooks.map((book) => (
          <Col key={book.asin} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <SingleBook book={book} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default BookList
