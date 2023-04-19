import classes from "./newsletter-registration.module.css";
import { useRef, useContext, useState, useEffect } from "react";
import NotificationContext from "@/store/notification-context";

function NewsletterRegistration() {
  const [register, setRegister] = useState();
  const notificationCtx = useContext(NotificationContext);
  const emailInput = useRef();

  function registrationHandler(event) {
    event.preventDefault();
    const reqBody = { email: emailInput.current.value };
    notificationCtx.showNotification({
      title: "singing up...",
      message: "registering for newsletter...",
      status: "pending",
    });

    fetch("/api/events/register", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((data) => {
          throw new Error(data.message || "something wrong");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "success",
          message: "success registering for newsletter",
          status: "success",
        });
        getregister();
      })
      .catch((err) => {
        notificationCtx.showNotification({
          title: "error",
          message: "error registering for newsletter",
          status: "error",
        });
      });
  }
  useEffect(() => {
    getregister();
  }, []);
  function getregister() {
    fetch("/api/events/register")
      .then((res) => res.json())
      .then((data) => {
        setRegister(data.allRegister);
      });
  }
  return (
    <section className={classes.newsletter}>
      <h2>Email을 남겨 방명록을 작성해주세요 !</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInput}
          />
          <button>등록</button>
        </div>
      </form>
      {register && (
        <div className="register_list">
          <h2>방명록</h2>
          <ul>
            {register.map((item) => {
              return <li key={item._id}>{item.email}</li>;
            })}
          </ul>
        </div>
      )}
    </section>
  );
}

export default NewsletterRegistration;
