import "./Testimonials.css";

function Testimonials() {
  const reviews = [
    {
      name: "Rahul Sharma",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      review:
        "Amazing experience! Everything was perfectly managed and the trip was unforgettable.",
    },
    {
      name: "Priya Kapoor",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      review:
        "Excellent service and beautiful destinations. Highly recommended!",
    },
    {
      name: "Aman Singh",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
      review:
        "Best travel booking experience I've ever had. Worth every penny.",
    },
  ];

  return (
    <section className="testimonials">
      <h2>What Our Travelers Say</h2>

      <div className="testimonial-grid">
        {reviews.map((item, index) => (
          <div className="testimonial-card" key={index}>

            {/* Person Image */}
            <img
              src={item.image}
              alt={item.name}
              className="testimonial-image"
            />

            {/* Stars */}
            <h3>⭐⭐⭐⭐⭐</h3>

            {/* Review */}
            <p>"{item.review}"</p>

            {/* Name */}
            <h4>- {item.name}</h4>

          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;