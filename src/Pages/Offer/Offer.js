import "./Offer.css";
import { useParams, useNavigate } from "react-router-dom";
import CorrectNum from "../../Components/CorrectNum";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from "axios";
import {useEffect} from "react";

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
};

const IDCleaner = (str) => {
    let result = "";
    for(let i = 1; i < str.length; i++) {
        result = result + str[i]
    }
    return result;
}

const FindOffer = (array, id) => {
    let result = {}
    for(let i = 0; i < array.length; i++) {
        if(array[i]._id === id) {
            result = array[i]
        }
    }
    return result;
}

// find by _id
// picture(s) => carroussel === .product_pictures (array) .secure_url
// prix === .product_price
// marque + taille + etat + couleur + emplacement === .product_details (array)
// nom === .product_name
// description === .product_description
// avatar === .owner.account.avatar.secure_url
// account name === .owner.account.username

// witdth 600 vs 400

const OfferPics = (array) => {
    return (
        <Carousel className="product-carroussel"
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        slidesToSlide={1}
        // autoPlay={this.props.deviceType !== "mobile" ? true : false}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        // deviceType={this.props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px">
            {array.map((elem, index) => {
                return <img src={elem.secure_url} alt="offer pictures" className="product-pic" key={index}></img>
            })}
        </Carousel>)
}

const ArrayObject = (array) => {
    let result = [];
    let pushed = [];
    for(let i = 0; i < array.length; i++) {
        pushed = Object.entries(array[i]);
        result.push(pushed)
    }
    return result;
}

const DetailOffer = (array) => {
    let NewArray = ArrayObject(array)
    return (
        <div className="offer-details">
            <div className="keys">
                {NewArray.map((elem, index) => {
                    return <span key={index}>{elem[0][0]}</span> 
                })}
            </div>
            <div className="values">
                {NewArray.map((elem, index) => {
                    return <span key={index}>{elem[0][1]}</span> 
                })}
            </div>
        </div>)
}

const Offer = (props) => {
    const {data, setData, setIsLoading, setCanSearch, setTryConLogIn, token} = props;
    const navigate = useNavigate();
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
        setCanSearch(0);
      })
    const id = useParams();
    const offers = data.offers;
    const cleanID = IDCleaner(id.id)
    const theOffer = FindOffer(offers, cleanID)
    const allPics = theOffer.product_pictures;
    const offerDetails = theOffer.product_details;
    return(
        <div className="fulloffer">
            {OfferPics(allPics)}
            <div className="offerfulldesc">
                <div className="price">{CorrectNum(theOffer.product_price)}</div>
                {DetailOffer(offerDetails)}
                <div className="divider"></div>
                <div className="offer-title">{theOffer.product_name}</div>
                <div className="offer-desc">{theOffer.product_description}</div>
                <div className="user-account">
                    {theOffer.owner.account.avatar ?
                    <img src={theOffer.owner.account.avatar.secure_url} alt="user avatar" className="user-avatar"/>
                    :
                    <div className="empty-avatar"></div>
                    }
                    <span>{theOffer.owner.account.username}</span>
                </div>
                <button className="buy" onClick={(e) => {
                    if(token) {
                        navigate("/payment", {state: {title: theOffer.product_name, price: theOffer.product_price}})
                    } else {
                        setTryConLogIn(1)
                    }
                    }
                    }><span>Acheter</span></button>
            </div>
        </div>
    )
}

export default Offer;