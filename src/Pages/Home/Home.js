import "./Home.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { Link} from "react-router-dom";
import CorrectNum from "../../Components/CorrectNum";
import { useState, useEffect } from "react";

// avatar === owner.account.avatar.secure_url
// username === owner.account.username
// image === product_image.secure_url
// price === .product_price
// description === .product_description

// id pour nourrir click cf => https://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
// === ._id

// const ReDirection = (id) => {
//     let url = `http://localhost:3000/offer/:${id}`;
//     let navigate = useNavigate();
//     navigate.push(url)
// }

const ReDirect = (id) => {
    return `/offer/:${id}`
}

// const CorrectNum = (number) => {
//     const newnum = Math.floor(number * 100) / 100;
//     const textnum = newnum.toString();
//     const test = textnum.replace(".", ",");
//     let result = "";
//     if(!test.includes(",")) {
//         result = test.concat(",00 €");
//     } else if(test[test.length - 2] === ",") {
//         result = test.concat("0 €");
//     } else {result = test.concat(" €")}
//     return result
// }

const OffersDisplay = (array) => {
    return array.map((elem) => {
        return (
            elem.owner &&
            <Link to={ReDirect(elem._id)} className="single-offer" key={elem._id}>
                <div className="offer-user">
                    {elem.owner.account.avatar ?
                    <img src={elem.owner.account.avatar.secure_url} alt="account avatar" className="account-avatar"></img>
                    :
                    <div className="empty-small-avatar"></div>
                    }
                    <span>{elem.owner.account.username}</span>
                </div>
                <img src={elem.product_image.secure_url} alt="product images" className="product-image"/>
                <div className="after-image">
                    <div className="price-details">
                        <div className="price-quest">
                            <span>{CorrectNum(elem.product_price)}</span>
                            <FontAwesomeIcon icon="info" className="info"></FontAwesomeIcon>
                        </div>
                        {/* <div>{elem.product_description}</div> */}
                    </div>
                    <div className="likes-count"></div>
                </div>
            </Link>
        )
    })
}

const OffCounter = (array) => {
    let result = 0;
    for(let i = 0; i < array.length; i++) {
        if(array[i].owner) {
            result = result + 1
        }
    }
    return result
}

const PagesTab = (pageNum, pagescount, setPagMin, setPagMax) => {
    let result = [];
    let minVisibleNum = pageNum - 5;
    let maxVisibleNum = pageNum + 5;
    if(minVisibleNum < 1) {
        maxVisibleNum = (1 - minVisibleNum) + maxVisibleNum;
        minVisibleNum = 1;
    }
    if(maxVisibleNum > pagescount) {
        maxVisibleNum = pagescount
    }
    if((pagescount - maxVisibleNum) < 5) {
        minVisibleNum = Math.max((maxVisibleNum - 10), 1);
    }
    for(let i = minVisibleNum; i <= maxVisibleNum; i++) {
        result.push(i)
    }
    setPagMin(minVisibleNum);
    setPagMax(maxVisibleNum);
    return result;
}

const PageViz = (pageNum, numoffers, setPageNum) => {
    let currentpage = 0;
    if(!pageNum) {currentpage = 1} else {currentpage = pageNum}
    return <div className="page-list">
        {numoffers && numoffers[0].map((elem, index) => {
            if(Number(elem) === Number(currentpage)) {
                return <span className="current-page" key={index}>{elem}</span>
            } else {
                return <span className="other-pages" key={index} onClick={(event) => {setPageNum(elem)}}>{elem}</span>
            }
        })}
    </div>
}


const Home = (props) => {
    const {data, pageNum, setPageNum, pageLen, setPageLen, initial} = props;
    const offers = data.offers;
    const [numoffers, setNumOffers] = useState(0);
    const [pagMin, setPagMin] = useState(0);
    const [pagMax, setPagMax] = useState(0);
    const [pagTot, setPagTot] = useState(0);
    const [totOff, setTotOff] = useState(0);
    // let seepages = [];
    // let pagescount = 1;

    useEffect(() => {
        let totaloffers = initial.offers;
        // let offercount =  OffCounter(totaloffers);
        setTotOff(OffCounter(totaloffers))
        if(pageLen) {
            // pagescount = Math.ceil(OffCounter(totaloffers) / pageLen)
            setPagTot(Math.ceil(OffCounter(totaloffers) / pageLen))
        } else {
            // pagescount = 1;
            setPagTot(1);
        }
        // seepages = PagesTab(pageNum, pagescount, setPagMin, setPagMax);
        setNumOffers([PagesTab(pageNum, pagTot, setPagMin, setPagMax)]);
    }, [pageLen, pageNum, initial.offers, pagTot])

    return (
        <div className="home">
            <div className='hero-overlay'></div>
            <div className="banner-container">
                <img src={require("../../Content/banner.jpg")} alt="Smiling woman in dressroom" className="banner"/>
                <div className="ready">
                    <div className="ready-ready">Prêts à faire du tri dans vos placards ?</div>
                    <button className="ready-sell"><span>Vends maintenant</span></button>
                    <div className="ready-discover">Découvrir comment ça marche</div>
                </div>
            </div>
            <div className="full-page-list">
                <FontAwesomeIcon icon="chevron-left" className="chevron" onClick={() => {setPageNum(pagMin)}}></FontAwesomeIcon>
                <span onClick={(event) => {if(pageNum > 1) {setPageNum(pageNum - 1)}}}>Prev</span>
                {PageViz(pageNum, numoffers, setPageNum)}
                <span onClick={(event) => {if(pageNum < pagTot) {setPageNum(pageNum + 1)}}}>Next</span>
                <FontAwesomeIcon icon="chevron-right" className="chevron" onClick={() => {setPageNum(pagMax)}}></FontAwesomeIcon>
                {totOff >= 5 && 
                    <select onChange={(event) => {setPageLen(event.target.value)}} className="select">
                        <option value={5}>5 per page</option>
                        {totOff >= 10 && <option value={10}>10 per page</option>}
                        {totOff >= 25 && <option value={25}>25 per page</option>}
                        {totOff >= 50 && <option value={50}>50 per page</option>}
                    </select>
                }
            </div>
            <div className="offer-list">
                {OffersDisplay(offers)}
            </div>
            <div className="full-page-list">
                <FontAwesomeIcon icon="chevron-left" className="chevron" onClick={() => {setPageNum(pagMin)}}></FontAwesomeIcon>
                <span onClick={(event) => {if(pageNum > 1) {setPageNum(pageNum - 1)}}}>Prev</span>
                {PageViz(pageNum, numoffers, setPageNum)}
                <span onClick={(event) => {if(pageNum < pagTot) {setPageNum(pageNum + 1)}}}>Next</span>
                <FontAwesomeIcon icon="chevron-right" className="chevron" onClick={() => {setPageNum(pagMax)}}></FontAwesomeIcon>
            </div>
            {totOff >= 5 && 
                    <select onChange={(event) => {setPageLen(event.target.value)}} className="select">
                        <option value={5}>5 per page</option>
                        {totOff >= 10 && <option value={10}>10 per page</option>}
                        {totOff >= 25 && <option value={25}>25 per page</option>}
                        {totOff >= 50 && <option value={50}>50 per page</option>}
                    </select>
            }
        </div>
    )
} 

export default Home;