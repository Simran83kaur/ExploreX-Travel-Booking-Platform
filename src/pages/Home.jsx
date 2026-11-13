import Hero from "../components/Hero";
import Destinations from "../components/Destinations";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import SearchSection from "../components/SearchSection"


function Home(){

    return(
        <>
      <Hero />
      <SearchSection/>
      <Destinations featured={true} />
      <Features />
      <Testimonials />
      <Newsletter />  
        </>
    )

}

export default Home;