import React, { useState, useEffect } from "react"
import Loading from "./Loading"
import Error from "./Error"
import CommentsList from "./CommentsList"
import AddComment from "./AddComment"

const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODgyMWQ3NGZlMzZkMDAwMTU5NzU4MTIiLCJpYXQiOjE3NTMzNTc2ODQsImV4cCI6MTc1NDU2NzI4NH0.qetkzLPaCgXs3j8p2CpTb4s4TBdPVIdXrBq1n4Hm6WY"

function CommentArea({ asin }) {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (asin) {
      fetchComments(asin)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asin])

  const fetchComments = async (asin) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${asin}`,
        {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
        }
      )
      if (!res.ok) throw new Error("Errore nel recupero dei commenti")
      const data = await res.json()
      setComments(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCommentAdded = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment])
  }

  const handleCommentDeleted = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((c) => c._id !== commentId)
    )
  }

  if (!asin) {
    return (
      <div className="alert alert-info mt-4">
        Seleziona un libro per vedere i commenti
      </div>
    )
  }
  if (loading) return <Loading />
  if (error) return <Error message={error} />

  return (
    <div className="mt-2">
      <CommentsList comments={comments} onDelete={handleCommentDeleted} />
      <AddComment asin={asin} onCommentAdded={handleCommentAdded} />
    </div>
  )
}

export default CommentArea
