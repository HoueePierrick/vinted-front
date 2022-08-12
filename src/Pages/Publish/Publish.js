import "./Publish.css";
import { useState, useEffect} from "react";
import axios from "axios";
import { Navigate } from 'react-router-dom';
import ViewImage from "../../Components/ViewImages";

const Publish = (props) => {
    const [file, setFile] = useState([]); // test avec un tableau à plusieurs images
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [condition, setCondition] = useState("");
    const [place, setPlace] = useState("");
    const [price, setPrice] = useState(0.00);
    const [interest, setInterest] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [missing, setMissing] = useState([]);

    const {setCanSearch, token} = props;
    useEffect(() => {
        setCanSearch(0);
    }, [setCanSearch]);

    const CanDisplay = (title, description, price, condition, place, brand, size, color, file, token) => {
        if(token || title || description || price || condition || place || brand || size || color || file.length > 0) {
            return 1;
        } else {
            return 0;
        }
    }

    return CanDisplay ? (
        <div className="sell-article">
            <div className="sell-your-article">Vends ton article</div>
            <form className="full-form" onSubmit={async (event) => {
                event.preventDefault();

                const formData = new FormData();
                formData.append("title", title);
                formData.append("description", description);
                formData.append("price", price);
                formData.append("condition", condition)
                formData.append("city", place);
                formData.append("brand", brand);
                formData.append("size", size);
                formData.append("color", color);
                formData.append("picture", file[0]);

                if(title && description && price && condition && place && brand && size && color && file.length > 0) {
                    setCorrect(0);
                    setMissing([])
                    console.log("form submitted successfully");
                    try {
                        const response = await axios.post("https://lereacteur-vinted-api.herokuapp.com/offer/publish",
                            formData,
                            {
                                headers: {
                                    authorization: `Bearer ${token}`
                                }
                            }
                        );
                        alert(JSON.stringify(response.data));
                    } catch (err) {
                        if(err.response.status === 500) {
                            console.log("An error occured")
                        } else {
                            console.log(err.response)
                        }
                    }


                } else {
                    setCorrect(1);
                    let allstates = [title, description, price, condition, place, brand, size, color, file];
                    let tobepushed = []
                    if(!allstates[0]) {
                        tobepushed.push("Un titre")
                    }
                    if(!allstates[1]) {
                        tobepushed.push("Une description")
                    }
                    if(!allstates[2]) {
                        tobepushed.push("Un prix")
                    }
                    if(!allstates[3]) {
                        tobepushed.push("Un état")
                    }
                    if(!allstates[4]) {
                        tobepushed.push("Un lieu")
                    }
                    if(!allstates[5]) {
                        tobepushed.push("Une marque")
                    }
                    if(!allstates[6]) {
                        tobepushed.push("Une taille")
                    }
                    if(!allstates[7]) {
                        tobepushed.push("Une couleur")
                    }
                    if(allstates[8].length === 0) {
                        tobepushed.push("Une photo")
                    }
                    setMissing(tobepushed);
                }
                }}>
                {ViewImage(setFile)}
                <div className="form-section">
                    <div className="form-pair">
                        <label htmlFor="form-title" className="form-label">Titre</label>
                        <input type="text" id="form-title" className="form-input" placeholder="ex: Chemise Sézane verte" onChange={
                            (e) => {setTitle(e.target.value)}
                        } value={title}/>
                    </div>
                    <div className="form-divider"></div>
                    <div className="form-pair">
                        <label htmlFor="form-description" className="form-label">Décris ton article</label>
                        <input type="text" id="form-description" className="form-input" placeholder="ex: porté quelquefois, taille correctement" onChange={
                            (e) => {setDescription(e.target.value)}
                        } value={description}/>
                    </div>
                </div>
                <div className="form-section">
                    <div className="form-pair">
                        <label htmlFor="form-brand" className="form-label">Marque</label>
                        <input type="text" id="form-brand" className="form-input" placeholder="ex: Zara" onChange={
                            (e) => {setBrand(e.target.value)}
                        } value={brand}/>
                    </div>
                    <div className="form-divider"></div>
                    <div className="form-pair">
                        <label htmlFor="form-size" className="form-label">Taille</label>
                        <input type="text" id="form-size" className="form-input" placeholder="ex: L / 40 / 12" onChange={
                            (e) => {setSize(e.target.value)}
                        } value={size}/>
                    </div>
                    <div className="form-pair">
                        <label htmlFor="form-color" className="form-label">Couleur</label>
                        <input type="text" id="form-color" className="form-input" placeholder="ex: Fushia" onChange={
                            (e) => {setColor(e.target.value)}
                        } value={color}/>
                    </div>
                    <div className="form-divider"></div>
                    <div className="form-pair">
                        <label htmlFor="form-state" className="form-label">Etat</label>
                        <input type="text" id="form-state" className="form-input" placeholder="ex: Neuf avec étiquette" onChange={
                            (e) => {setCondition(e.target.value)}
                        } value={condition}/>
                    </div>
                    <div className="form-pair">
                        <label htmlFor="form-place" className="form-label">Lieu</label>
                        <input type="text" id="form-place" className="form-input" placeholder="ex: Paris" onChange={
                            (e) => {setPlace(e.target.value)}
                        } value={place}/>
                    </div>
                </div>
                <div className="form-section">
                    <div className="form-pair" id="last-form-pair">
                        <label htmlFor="form-price" className="form-label">Prix</label>
                        <input type="number" id="form-price" className="form-input" placeholder="0,00 €" step=".01" pattern="^\d*(\.\d{0,2})?$" onChange={
                            (e) => {setPrice(e.target.value)}
                        } value={price}/>
                    </div>
                    <div className="form-checkbox">
                        <input type="checkbox" id="form-checking" onChange={(e) => {if(interest === 0) {setInterest(1)} else {setInterest(0)}}}/>
                        <label htmlFor="form-price" className="form-label" id="form-interest">Je suis intéressé(e) par les échanges</label>
                    </div>
                </div>
                <div className="add-class">
                    <button type="submit" className="add">Ajouter</button>
                    {correct === 1 ? 
                        <ul className="ul"> Veuillez rajouter : 
                        {missing.map((elem, index) => {
                            return <li key={index} className="li">{elem}</li>
                        })}
                        </ul>
                        :
                        <></>
                    }
                </div>
            </form>
        </div>
    )
    :
    (<Navigate to="/"></Navigate>)
}

export default Publish;