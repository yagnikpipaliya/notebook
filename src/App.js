// import logo from "./logo.svg";
import "./App.css";
import { Route, Routes} from "react-router-dom"; // , Link 
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";
import NoteState from "./context/notes/NoteState";
import {useState} from 'react'

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 2500);
}
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

    <>
      <NoteState>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home  showAlert={showAlert}/>} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
          </Routes>
        </div>
      </NoteState>
    </>
  );
}

export default App;
