import "./Payment.css";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "../../Components/CheckOutForm";
import CorrectNum from "../../Components/CorrectNum";

const stripePromise = loadStripe("pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP")

const Payment = (props) => {
    const location = useLocation();
    const {title, price} = location.state;
    // console.log(location.state)
    const {usrCourriel} = props;
    const totprice = price + 0.80 + 0.40;

    return (
        <div className="payment">
            <div className="com-sum-up">
                <div className="pay-desc">
                    <span className="pay-title">Résumé de la commande</span>
                    <div className="pay-item">
                        <span>Commande</span>
                        <span>{CorrectNum(price)}</span>
                    </div>
                    <div className="pay-item">
                        <span>Commande</span>
                        <span>{CorrectNum(0.40)}</span>
                    </div>
                    <div className="pay-item">
                        <span>Frais de port</span>
                        <span>{CorrectNum(0.80)}</span>
                    </div>
                </div>
                <div className="last-step">
                    <div className="pay-total">
                        <span>Total</span>
                        <span>{CorrectNum(totprice)}</span>
                    </div>
                    <div className="last-sentence">
                        <span>Il ne vous reste plus qu'une étape pour vous offrir </span>
                        <span className="bold-span">{title}. </span>
                        <span>Vous allez payer </span>
                        <span className="bold-span">{CorrectNum(totprice)} </span>
                        <span>(frais de protection et frais de port inclus)</span>
                    </div>
                </div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm email={usrCourriel} title={title} price={totprice}></CheckoutForm>
                </Elements>
            </div>
        </div>
    )
}

export default Payment;