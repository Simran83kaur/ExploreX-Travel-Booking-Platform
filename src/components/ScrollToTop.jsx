import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import "./ScrollToTop.css";

function ScrollToTop() {

  const [visible, setVisible] = useState(false);

  useEffect(() => {

    function handleScroll() {

      if (window.scrollY > 300) {

        setVisible(true);

      } else {

        setVisible(false);

      }

    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  function scrollTop() {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  }

  return (

    visible && (

      <button
        className="scroll-top"
        onClick={scrollTop}
      >
        <FaArrowUp />
      </button>

    )

  );

}

export default ScrollToTop;