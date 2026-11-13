import { useState } from "react";

function Contact() {

  const [form, setForm] = useState({

    name: "",
    email: "",
    subject: "",
    message: ""

  });

  function handleChange(e) {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  }

  function handleSubmit(e) {

    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.subject ||
      !form.message
    ) {

      alert("Please fill all fields.");

      return;

    }

    alert("Message Sent Successfully!");

    setForm({

      name: "",

      email: "",

      subject: "",

      message: ""

    });

  }

  return (

    <div className="container py-5">

      <h1 className="text-center mb-4">
        Contact Us
      </h1>

      <form
        className="card p-4 shadow"
        onSubmit={handleSubmit}
      >

        <div className="mb-3">

          <label>Name</label>

          <input
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

        </div>

        <div className="mb-3">

          <label>Email</label>

          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

        </div>

        <div className="mb-3">

          <label>Subject</label>

          <input
            className="form-control"
            name="subject"
            value={form.subject}
            onChange={handleChange}
          />

        </div>

        <div className="mb-3">

          <label>Message</label>

          <textarea
            rows="5"
            className="form-control"
            name="message"
            value={form.message}
            onChange={handleChange}
          />

        </div>

        <button className="btn btn-primary">
          Send Message
        </button>

      </form>

    </div>

  );

}

export default Contact;