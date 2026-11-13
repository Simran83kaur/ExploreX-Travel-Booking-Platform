import "./Features.css";
import { FaPlane, FaHotel, FaMoneyBillWave, FaHeadset } from "react-icons/fa";

function Features() {

  const features = [

    {
      icon: <FaPlane />,
      title: "Easy Flight Booking",
      text: "Search and book flights in just a few clicks."
    },

    {
      icon: <FaHotel />,
      title: "Best Hotels",
      text: "Choose from premium hotels at affordable prices."
    },

    {
      icon: <FaMoneyBillWave />,
      title: "Affordable Packages",
      text: "Save money with our exclusive travel deals."
    },

    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      text: "Our team is always available to help you."
    }

  ];

  return (

    <section className="features">

      <h2>Why Choose ExploreX?</h2>

      <div className="feature-grid">

        {features.map((item,index)=>(

          <div
            className="feature-card"
            key={index}
          >

            <div className="feature-icon">

              {item.icon}

            </div>

            <h3>{item.title}</h3>

            <p>{item.text}</p>

          </div>

        ))}

      </div>

    </section>

  );

}

export default Features;