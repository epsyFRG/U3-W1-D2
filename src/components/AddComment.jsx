import React, { useState } from "react"
import Loading from "./Loading"
import Error from "./Error"

const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODgyMWQ3NGZlMzZkMDAwMTU5NzU4MTIiLCJpYXQiOjE3NTMzNTc2ODQsImV4cCI6MTc1NDU2NzI4NH0.qetkzLPaCgXs3j8p2CpTb4s4TBdPVIdXrBq1n4Hm6WY"

const AddComment = ({ asin, onCommentAdded }) => {
  const [comment, setComment] = useState("")
  const [rate, setRate] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
          body: JSON.stringify({
            comment,
            rate,
            elementId: asin,
          }),
        }
      )
      if (!res.ok) throw new Error("Errore nell'invio del commento")
      const data = await res.json()
      onCommentAdded(data)
      setComment("")
      setRate(1)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="mb-2">
        <label>Commento:</label>
        <input
          type="text"
          className="form-control"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <label>Voto:</label>
        <select
          className="form-select"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        Aggiungi commento
      </button>
      {loading && <Loading />}
      {error && <Error message={error} />}
    </form>
  )
}

export default AddComment
