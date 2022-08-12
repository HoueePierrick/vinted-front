import './App.css';
import axios from "axios";
import {useState, useEffect} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {library} from '@fortawesome/fontawesome-svg-core';
import {faSortDown, faMagnifyingGlass, faXmark, faInfo, faEyeSlash, faEye, faCheck, faArrowUp, faArrowDown, faChevronLeft, faChevronRight, faPlus} from '@fortawesome/free-solid-svg-icons';
import Header from './Components/Header/Header';
import Home from './Pages/Home/Home';
import Offer from './Pages/Offer/Offer';
import Publish from './Pages/Publish/Publish';

library.add(faSortDown, faMagnifyingGlass, faXmark, faInfo, faEyeSlash, faEye, faCheck, faArrowUp, faArrowDown, faChevronLeft, faChevronRight, faPlus);

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tryConLogIn, setTryConLogIn] = useState(0);
  const [title, setTitle] = useState("")
  const [rank, setRank] = useState(0); // state de classement des offres 0 par défaut = ascendant -> devient 2 ensuite
  const [min, setMin] = useState(0); // state de prix min
  const [max, setMax] = useState(0);
  const [pageNum, setPageNum] = useState(0);
  const [pageLen, setPageLen] = useState(40);
  const [initial, setInitial] = useState(null);
  const [canSearch, setCanSearch] = useState(1);
  const [token, setToken] = useState(null);

  const request = (title, rank, min, max, pageNum, pageLen) => {
    let titlesearch = "";
    let sort = "";
    let priceMin = "";
    let priceMax = "";
    let page = 0;
    let limit = 0;
    let countparams = 0;
    let result = "";
    
    if(title || rank || min || max || pageNum || pageLen) {
      result = "?"
      if(title) {
        titlesearch=`title=${title}`;
        result = result + titlesearch;
        countparams = countparams + 1;
      }

      if(rank === 1) {
        sort = "sort=price-desc";
        if(countparams) {
          result = result + "&" + sort
        } else {
          result = result + sort
        }
        countparams = countparams + 1;
      } else if(rank === 2) {
        sort = "sort=price-asc";
        if(countparams) {
          result = result + "&" + sort
        } else {
          result = result + sort
        }
        countparams = countparams + 1;
      }

      if(min) {
        priceMin = `priceMin=${min}`;
        if(countparams) {
          result = result + "&" + priceMin
        } else {
          result = result + priceMin
        }
        countparams = countparams + 1;
      }

      if(max) {
        priceMax = `priceMax=${max}`;
        if(countparams) {
          result = result + "&" + priceMax
        } else {
          result = result + priceMax
        }
        countparams = countparams + 1;
      }

      if(pageNum) {
        page = `page=${pageNum}`;
        if(countparams) {
          result = result + "&" + page
        } else {
          result = result + page
        }
        countparams = countparams + 1;
      }

      if(pageLen) {
        limit = `limit=${pageLen}`;
        if(countparams) {
          result = result + "&" + limit
        } else {
          result = result + limit
        }
        countparams = countparams + 1;
      }
    }
    return result;
  }

  const shortrequest = (title, min, max) => {
    let titlesearch = "";
    let priceMin = "";
    let priceMax = "";
    let countparams = 0;
    let result = "";
    
    if(title || min || max) {
      result = "?"
      if(title) {
        titlesearch=`title=${title}`;
        result = result + titlesearch;
        countparams = countparams + 1;
      }

      if(min) {
        priceMin = `priceMin=${min}`;
        if(countparams) {
          result = result + "&" + priceMin
        } else {
          result = result + priceMin
        }
        countparams = countparams + 1;
      }

      if(max) {
        priceMax = `priceMax=${max}`;
        if(countparams) {
          result = result + "&" + priceMax
        } else {
          result = result + priceMax
        }
        countparams = countparams + 1;
      }
    }
    return result;
  }

  
  useEffect(() => {
    const fetchdata = async () => {
      let requested = request(title, rank, min, max, pageNum, pageLen)
      let shortrequested = shortrequest(title, min, max)
      try {
        const response = await axios.get(`https://lereacteur-vinted-api.herokuapp.com/offers${requested}`)
        const initial = await axios.get(`https://lereacteur-vinted-api.herokuapp.com/offers${shortrequested}`)
        setData(response.data);
        setInitial(initial.data)
        setIsLoading(false);
      } catch (error) {
        console.log(error.response)
      }
    };
    fetchdata();
  }, [title, rank, min, max, pageNum, pageLen])

  return (
    isLoading ?
    <>Votre site est en cours de chargement</>
    :
    <>
    <Router>
      <Header tryConLogIn={tryConLogIn} setTryConLogIn={setTryConLogIn} rank={rank} setRank={setRank} setMin={setMin} setMax={setMax} setTitle={setTitle} canSearch={canSearch} token={token} setToken={setToken}></Header>
      <div className='head-placeholder'></div>
      <Routes>
        <Route path='/' element={<Home data={data} pageNum={pageNum} setPageNum={setPageNum} pageLen={pageLen} setPageLen={setPageLen} initial={initial} setCanSearch={setCanSearch}/>}></Route>
        <Route path="/offer/:id" element={<Offer data={data} setData={setData} isLoading={isLoading} setIsLoading={setIsLoading} setCanSearch={setCanSearch}></Offer>}></Route>
        <Route path='/publish' element={<Publish setCanSearch={setCanSearch} token={token} ></Publish>}></Route>
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
