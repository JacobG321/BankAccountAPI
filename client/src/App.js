import {useState} from 'react'
import CreateAccount from "./components/CreateAccount";
import ViewAccounts from "./components/ViewAccounts";
import LandingPage from "./components/LandingPage"
import {BrowserRouter, Routes, Route} from 'react-router-dom';




function App() {
  const [loggedIn,setLoggedIn] = useState(false)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<LandingPage setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>} path="/"/>
          <Route element={<CreateAccount setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>} path="/create"/>
          <Route element={<ViewAccounts setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>} path="/accounts"/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
