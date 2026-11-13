import "./Newsletter.css";
import { useState } from "react";

function Newsletter() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");

  async function subscribe() {

    if (email === "") {
      alert("Please enter your email.");
      return;
    }

    try {

      const response = await fetch(
        "http://localhost:5000/api/newsletter/subscribe",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {

        setMessage(data.message);
        setMessageColor("green");

        setEmail("");

      } else {

        setMessage(data.message);
        setMessageColor("red");

      }

    } catch (error) {

      console.log(error);

      setMessage("Something went wrong.");
      setMessageColor("red");
    }

  }

  return (

    <section className="newsletter">

      <div className="newsletter-content">

        <h2>Ready For Your Next Adventure?</h2>

        <p>
          Join thousands of travelers and receive exclusive travel deals,
          destination guides and special offers directly in your inbox.
        </p>

        <div className="newsletter-form">

          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button onClick={subscribe}>
            Subscribe
          </button>

        </div>

        {message && (
          <p
            style={{
              color: messageColor,
              marginTop: "15px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {message}
          </p>
        )}

      </div>

    </section>

  );

}

export default Newsletter;