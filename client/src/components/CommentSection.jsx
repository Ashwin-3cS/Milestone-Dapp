import React, { useState } from 'react';

function CommentSection() {
  // State to hold the list of comments
  const [comments, setComments] = useState([]);
  // State to hold the input value for adding new comment
  const [newComment, setNewComment] = useState('');

  // Function to handle adding a new comment
  const handleAddComment = () => {
    if (newComment.trim() === '') {
      // If the input is empty, do nothing
      return;
    }
    // Add the new comment to the list of comments
    setComments([...comments, newComment]);
    // Clear the input field
    setNewComment('');
  };

  return (
    <div className="comment-section">
      <h1 className='text-xl mb-2'>Comments</h1>
      {/* Render existing comments */}
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      {/* Input field for adding new comment */}
      <div>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className='w-96'
        ></textarea> <br />
        <button className="btn btn-outline mt-3" onClick={handleAddComment}>Add Comment</button>
      </div>
    </div>
  );
}

export default CommentSection;
