import { useState } from "react";
import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import { useEffect, useContext } from "react";
import NotificationContext from "@/store/notification-context";

function Comments(props) {
  const notificationCtx = useContext(NotificationContext);
  const { eventId } = props;
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(false);

  function getComment() {
    if (showComments) {
      setLoading(true);
      fetch(`/api/comment/${eventId}`)
        .then((res) => res.json())
        .then((data) => {
          setComment(data.comments);
          setLoading(false);
        });
    }
  }

  useEffect(() => {
    getComment();
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments(!showComments);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: "add new comment .....",
      message: "add newcomment . . .",
      status: "pending",
    });
    fetch(`/api/comment/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        notificationCtx.showNotification({
          title: "success add newcomment",
          message: "success add newcomment",
          status: "success",
        });
        getComment();
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "댓글 숨기기" : "댓글 보기"}
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !loading && <CommentList items={comment} />}
      {showComments && loading && <p>loading . . .. .</p>}
    </section>
  );
}

export default Comments;
