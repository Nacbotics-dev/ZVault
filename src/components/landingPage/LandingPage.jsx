import NavBar from "./header/Navbar";
import Hero from "./header/Hero";
import Summary from "./main/Summary";
import CardGroup from "./main/CardGroup";
import Docs from "./main/Docs";
import Footer from "./footer/Footer";

const LandingPage = () => {
  return (
    <div className="spotlight">
        <header className="pt-6">
            <div className="md:w-[75%] w-[90%] mx-auto">
                <NavBar />
                <Hero />
            </div>
        </header>
        <main className="mt-24 mb-56">
            <div className="md:w-[75%] w-[90%] mx-auto">
                <Summary />
                <CardGroup />
                <Docs />
            </div>
        </main>
        <footer className="bg-[#111] pt-24 pb-12">
            <div className="md:w-[75%] w-[90%] mx-auto">
                <Footer />
            </div>
        </footer>
    </div>
  )
}

export default LandingPage;