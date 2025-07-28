import React, { useState } from "react"
import { Row, Col, Form, Container } from "react-bootstrap"
import SingleBook from "./SingleBook"
import CommentArea from "./CommentArea"

const BookList = ({ books }) => {
  const [search, setSearch] = useState("")
  const [selectedAsin, setSelectedAsin] = useState(null)

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
        <Col md={8}>
          <Row>
            {filteredBooks.map((book) => (
              <Col
                key={book.asin}
                xs={12}
                sm={6}
                md={6}
                lg={4}
                className="mb-4"
              >
                <div
                  onClick={() => setSelectedAsin(book.asin)}
                  style={{ cursor: "pointer" }}
                >
                  <SingleBook book={book} selectedAsin={selectedAsin} />
                </div>
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={4}>
          <CommentArea asin={selectedAsin} />
        </Col>
      </Row>
    </Container>
  )
}

export default BookList
