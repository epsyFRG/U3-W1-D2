import React, { useState } from "react"
import Loading from "./Loading"
import Error from "./Error"
import { Row, Col } from "react-bootstrap"

const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODgyMWQ3NGZlMzZkMDAwMTU5NzU4MTIiLCJpYXQiOjE3NTMzNTc2ODQsImV4cCI6MTc1NDU2NzI4NH0.qetkzLPaCgXs3j8p2CpTb4s4TBdPVIdXrBq1n4Hm6WY"

const SingleComment = ({ comment, onDelete }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleDelete = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${comment._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
        }
      )
      if (!res.ok) throw new Error("Errore nella cancellazione")
      onDelete(comment._id)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <li className="mb-2">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <strong>Voto:</strong> {comment.rate} <br />
          {comment.comment}
        </div>
        <button
          className="btn btn-danger btn-sm ms-2"
          onClick={handleDelete}
          disabled={loading}
        >
          Elimina
        </button>
      </div>
      {loading && <Loading />}
      {error && <Error message={error} />}
    </li>
  )
}

export default SingleComment
