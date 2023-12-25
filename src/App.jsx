import NavBar from "./components/header/Navbar";
import Hero from "./components/header/Hero";
import Summary from "./components/main/Summary";
import CardGroup from "./components/main/CardGroup";
import Docs from "./components/main/Docs";
import Foot from "./components/footer/Foot";

function App() {

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

export default App;
