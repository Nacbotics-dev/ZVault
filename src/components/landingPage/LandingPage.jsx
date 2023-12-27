import NavBar from "./header/Navbar";
import Hero from "./header/Hero";
import Summary from "./main/Summary";
import CardGroup from "./main/CardGroup";
import Docs from "./main/Docs";
import Foot from "./footer/Foot";

const LandingPage = () => {
  return (
    <div className="font-display">
            <header className="mt-6">
                <div className="w-10/12 mx-auto">
                    <NavBar />
                    <Hero />
                </div>
            </header>
            <main className="mt-24 mb-56">
                <div className="w-10/12 mx-auto">
                    <Summary />
                    <CardGroup />
                    <Docs />
                </div>
            </main>
            <footer className="bg-[#111] pt-24 pb-12">
                <div className="w-10/12 mx-auto">
                    <Foot />
                </div>
            </footer>
        </div>
  )
}

export default LandingPage;