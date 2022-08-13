import {useState} from "react";
import {useStripe, useElements, CardElement} from "@stripe/react-stripe-js";
import { Link } from 'react-router-dom';

import axios from "axios";

const CheckoutForm = (props) => {
    const stripe = useStripe();
    const elements = useElements();
    const {email, title, price} = props;

    const [completed, setCompleted] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const cardElement = elements.getElement(CardElement);
        const stripeResponse = await stripe.createToken(cardElement, {
            name: email
        })
        const stripeToken = stripeResponse.token.id;
        const response = await axios.post("https://lereacteur-vinted-api.herokuapp.com/payment", {
            token: stripeToken,
            title: title,
            amount: price
        });
        if(response.data.status === "succeeded") {
            setCompleted(true);
        }
    };

    return (
        <>
            {!completed ? (
                <form onSubmit={handleSubmit} className="pay-form">
                    <CardElement className="card-element"/>
                    <button type="submit" className="validate">Pay</button>
                </form>
            )
            :
            (<>
                <div className="done-payment-bckg"></div>
                <Link to="/" className="white-modal">
                        <span>Paiement effectué ! </span>
                </Link>
            </>)
            }
        </>
    )
}

export default CheckoutForm;