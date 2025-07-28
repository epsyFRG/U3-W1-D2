import React, { Component } from "react"
import Loading from "./Loading"
import Error from "./Error"
import CommentsList from "./CommentsList"
import AddComment from "./AddComment"

const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODgyMWQ3NGZlMzZkMDAwMTU5NzU4MTIiLCJpYXQiOjE3NTMzNTc2ODQsImV4cCI6MTc1NDU2NzI4NH0.qetkzLPaCgXs3j8p2CpTb4s4TBdPVIdXrBq1n4Hm6WY"

class CommentArea extends Component {
  state = {
    comments: [],
    loading: false,
    error: null,
  }

  componentDidMount() {
    if (this.props.asin) {
      this.fetchComments(this.props.asin)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.asin && this.props.asin !== prevProps.asin) {
      this.fetchComments(this.props.asin)
    }
  }

  fetchComments = async (asin) => {
    this.setState({ loading: true, error: null })
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
      this.setState({ comments: data })
    } catch (err) {
      this.setState({ error: err.message })
    } finally {
      this.setState({ loading: false })
    }
  }

  handleCommentAdded = (newComment) => {
    this.setState((prevState) => ({
      comments: [...prevState.comments, newComment],
    }))
  }

  handleCommentDeleted = (commentId) => {
    this.setState((prevState) => ({
      comments: prevState.comments.filter((c) => c._id !== commentId),
    }))
  }

  render() {
    const { comments, loading, error } = this.state
    const { asin } = this.props

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
        <CommentsList
          comments={comments}
          onDelete={this.handleCommentDeleted}
        />
        <AddComment asin={asin} onCommentAdded={this.handleCommentAdded} />
      </div>
    )
  }
}

export default CommentArea
