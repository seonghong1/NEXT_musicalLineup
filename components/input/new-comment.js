import { useRef, useState } from "react";
import classes from "./new-comment.module.css";

function NewComment(props) {
  const [isInvalid, setIsInvalid] = useState(false);

  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const commentInputRef = useRef();

  function sendCommentHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredName = nameInputRef.current.value;
    const enteredComment = commentInputRef.current.value;

    if (
      !enteredEmail ||
      enteredEmail.trim() === "" ||
      !enteredEmail.includes("@") ||
      !enteredName ||
      enteredName.trim() === "" ||
      !enteredComment ||
      enteredComment.trim() === ""
    ) {
      setIsInvalid(true);
      return;
    }

    props.onAddComment({
      email: enteredEmail,
      name: enteredName,
      text: enteredComment,
    });
  }

  return (
    <form onSubmit={sendCommentHandler} className={classes.form}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="name">이름</label>
          <input type="text" id="name" ref={nameInputRef} />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor="comment">댓글</label>
        <textarea id="comment" rows="5" ref={commentInputRef}></textarea>
      </div>
      {isInvalid && <p>내용을 모두 기입해주세요 !</p>}
      <button>Submit</button>
    </form>
  );
}

export default NewComment;
