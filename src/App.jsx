import Dashboard from "./components/dashboard/Dashboard";
import LandingPage from "./components/landingPage/LandingPage";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';


function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route exact path='/' element={ <LandingPage />} />
                    <Route exact path='/vaults' element={ <Dashboard />} />
                </Routes>

            </Router>
        </>
    )
}

export default App;
