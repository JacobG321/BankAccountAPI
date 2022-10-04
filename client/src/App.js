import CreateAccount from "./components/CreateAccount";
import ViewAccounts from "./components/ViewAccounts";
import LandingPage from "./components/LandingPage"
import {BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<LandingPage/>} path="/"/>
          <Route element={<CreateAccount/>} path="/create"/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
