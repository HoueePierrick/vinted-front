import './App.css';
import axios from "axios";
import {useState, useEffect} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {library} from '@fortawesome/fontawesome-svg-core';
import {faSortDown, faMagnifyingGlass, faXmark, faInfo, faEyeSlash, faEye, faCheck} from '@fortawesome/free-solid-svg-icons';
import Header from './Components/Header/Header';
import Home from './Pages/Home/Home';
import Offer from './Pages/Offer/Offer';
library.add(faSortDown, faMagnifyingGlass, faXmark, faInfo, faEyeSlash, faEye, faCheck);

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tryConLogIn, setTryConLogIn] = useState(0);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("https://lereacteur-vinted-api.herokuapp.com/offers")
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response)
      }
    };
    fetchdata();
  }, [])

  return (
    isLoading ?
    <>Votre site est en cours de chargement</>
    :
    <>
    <Header tryConLogIn={tryConLogIn} setTryConLogIn={setTryConLogIn}></Header>
    <Router>
      <Routes>
        <Route path='/' element={<Home data={data}/>}></Route>
        <Route path="/offer/:id" element={<Offer data={data} setData={setData} isLoading={isLoading} setIsLoading={setIsLoading}></Offer>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;


// accounts
// Eudoxe eudoxe@gmail.com Eudoxe1
// Nabonide nabonide@gmail.com Nabonide2
// Vigilentia vigilentia@gmail.com Vigilentia3
