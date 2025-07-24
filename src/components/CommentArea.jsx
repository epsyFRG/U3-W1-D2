import React, { useEffect, useState } from "react"
import Loading from "./Loading"
import Error from "./Error"
import CommentsList from "./CommentsList"
import AddComment from "./AddComment"

const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODgyMWQ3NGZlMzZkMDAwMTU5NzU4MTIiLCJpYXQiOjE3NTMzNTc2ODQsImV4cCI6MTc1NDU2NzI4NH0.qetkzLPaCgXs3j8p2CpTb4s4TBdPVIdXrBq1n4Hm6WY"

const CommentArea = ({ book }) => {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(
          `https://striveschool-api.herokuapp.com/api/comments/${book.asin}`,
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
    fetchComments()
  }, [book.asin])

  const handleCommentAdded = (newComment) => {
    setComments((prev) => [...prev, newComment])
  }

  const handleCommentDeleted = (commentId) => {
    setComments((prev) => prev.filter((c) => c._id !== commentId))
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} />

  return (
    <div className="mt-2">
      <CommentsList comments={comments} onDelete={handleCommentDeleted} />
      <AddComment asin={book.asin} onCommentAdded={handleCommentAdded} />
    </div>
  )
}

export default CommentArea
