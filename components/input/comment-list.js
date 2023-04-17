import classes from "./comment-list.module.css";

function CommentList(props) {
  return (
    <ul className={classes.comments}>
      {props.items.map((item) => {
        return (
          <li key={item._id}>
            <p>{item.comments.text}</p>
            <div>
              By <address>{item.comments.name}</address>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default CommentList;
