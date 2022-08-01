import "./Home.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { Link} from "react-router-dom";
import CorrectNum from "../../Components/CorrectNum";

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
                    <div className="empty-avatar"></div>
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

const Home = (props) => {
    const offers = props.data.offers;
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
            <div className="offer-list">
                {OffersDisplay(offers)};
            </div>
        </div>
    )
} 

export default Home;