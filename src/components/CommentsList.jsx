import React from "react"
import SingleComment from "./SingleComment"

const CommentsList = ({ comments, onDelete }) => (
  <ul className="list-unstyled">
    {comments.map((comment) => (
      <SingleComment key={comment._id} comment={comment} onDelete={onDelete} />
    ))}
  </ul>
)

export default CommentsList
