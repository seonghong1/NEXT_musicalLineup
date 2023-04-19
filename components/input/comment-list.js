import classes from "./comment-list.module.css";

function CommentList(props) {
  return (
    <ul className={classes.comments}>
      {props.items.map((item) => {
        return (
          <li key={item._id}>
            <p>{item.comment.text}</p>
            <div>
              By <address>{item.comment.name}</address>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default CommentList;
