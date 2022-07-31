import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './Header.css';
import {useState, useEffect} from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const CheckSpecialChar = (str, array) => {
    let result = false;
    for(let i = 0; i < str.length; i++) {
        for(let j = 0; j < array.length; j++) {
            if(str[i] === array[j]) {
                result = true;
                return result;
            }
        }
    }
    return result;
}

const OldNameMger = (oldName) => {
    if(oldName === 0 || oldName === 4) {
        return(<span className='input-desc-grey'>Crée ton nom d'utilisateur en n'utilisant que des lettres et des chiffres. Choisis-en un qui te plaît, tu ne pourras plus le changer.</span>)
    } else if(oldName === 1) {
        return(<span className='input-desc-red'>Nom d'utilisateur ne peut pas être vide</span>)
    } else if(oldName === 2) {
        return(<span className='input-desc-red'>Le nom d'utilisateur est trop court (3 caractères minimum).</span>)
    } else {
        return(<span className='input-desc-red'>Ton nom d'utilisateur doit comporter au moins 3 caractères. Tu peux utiliser des lettres et des chiffres.</span>)
    }
}

const UserNameInput = (name, setName, oldName, setOldName) => {
    const specialchar = ["/","^","[","!","@","#","$","%","^","&","*","(",")","_","+","-","=","[","]","{","}",";","'",":",`"`,"|",",",".","<",">","?","€"];
    return (
        <>
            <input type="text" className='login-input' placeholder="Nom d'utilisateur" onChange={(event) => {
                if(name.length === 1 && event.target.value.length === 0) {
                    setName(event.target.value)
                    setOldName(1)
                } else if (event.target.value.length > 0 && event.target.value.length < 3) {
                    setName(event.target.value)
                    setOldName(2)
                } else if(event.target.value.length > 2 && CheckSpecialChar(event.target.value, specialchar)) {
                    setName(event.target.value)
                    setOldName(3)
                } else {
                    setName(event.target.value)
                    setOldName(4)
                }
            }}/>
            {OldNameMger(oldName)}
        </>
    )
}

// status 0 // if n = 0 and n-1 = 0 => grey text : Crée ton nom d'utilisateur en n'utilisant que des lettres et des chiffres. Choisis-en un qui te plaît, tu ne pourras plus le changer.
// status 0 // if n >= 3 => grey text : Crée ton nom d'utilisateur en n'utilisant que des lettres et des chiffres. Choisis-en un qui te plaît, tu ne pourras plus le changer
// status 1 // if n = 0 and n-1 = 1 => red text : Nom d'utilisateur ne peut pas être vide
// status 2 // if n > 0 && n < 3 => red text : Le nom d'utilisateur est trop court (3 caractères minimum).
// status 3 // if n >= 3 && contains special character => red text : Ton nom d'utilisateur doit comporter au moins 3 caractères. Tu peux utiliser des lettres et des chiffres.

const EmailChecked = (str) => {
    let result = false;
    let str2 = str.split("@")
    if(str2.length === 1 || (str2.length === 2 && str2[1] === "")) {
        return result;
    }
    let str3 = str2[str2.length - 1];
    let str4 = str3.split(".")
    if(str4.length !== 2 || str4[1] === "" || str4[0] === "") {
        return result
    } else {
        result = true;
        return result;
    }
}

const OldEmailMger = (oldEmail) => { // à customiser
    if(oldEmail === 0 || oldEmail === 3) {
        return(<span className='input-desc-red'></span>)
    } else if(oldEmail === 1) {
        return(<span className='input-desc-red'>Email ne peut pas être vide</span>)
    } else {
        return(<span className='input-desc-red'>Entre une adresse e-mail valide pour continuer</span>)
    }
}

// status 0 // if n = 0 and n-1 = 0 => rien
// status 0 // email is correct => rien
// status 1 // if n = 0 and n-1 = 1 => red text : Email ne peut pas être vide
// status 2 // if email is invalid => red text : Entre une adresse e-mail valide pour continuer

const UserEmailInput = (email, setEmail, oldEmail, setOldEmail) => { // WIP
    return(
    <>
        <input type="text" className='login-input' placeholder="Email" onChange={(event) => {
            if(email.length === 1 && event.target.value.length === 0) {
                setEmail(event.target.value)
                setOldEmail(1)
            } else if (event.target.value.length > 0 && !EmailChecked(event.target.value)) {
                setEmail(event.target.value)
                setOldEmail(2)
            } else {
                setEmail(event.target.value)
                setOldEmail(3)
            }
        }}/>
        {OldEmailMger(oldEmail)}
    </>
    )
}

const PassValid = (str) => {
    let result = false;
    const nums = ["0","1","2","3","4","5","6","7","8","9"]
    let numcount = 0;
    for(let i = 0; i < str.length; i++) {
        for (let j = 0; j < nums.length; j++) {
            if(str[i] === nums[j]) {
                numcount = numcount + 1;
            }
        }
    }
    if(str.length >= 7 && numcount >0) {
        result = true;
        return result;
    } else {
        return result;
    }
}

const OldPassMger = (oldPassword) => { // à customiser
    if(oldPassword === 0 || oldPassword === 2) {
        return(<span className='input-desc-grey'>Il doit contenir 7 lettres minimum, dont au moins un chiffre.</span>)
    } else {
        return(<span className='input-desc-red'>Mot de passe ne peut pas être vide</span>)
    }
}

// Password
// Il doit contenir 7 lettres minimum, dont au moins un chiffre.
// Status 0 // sends this message
// Status 0 // doesn't pass this condition
// status 1 // if n = 0 and n-1 = 1 => red text : Mot de passe ne peut pas être vide

const UserPassInput = (password, setPassword, oldPassword, setOldPassword, visible, setVisible) => { // WIP
    return(
    <>
        <div className='fullpassword'>
            <input type={!visible ? "password" : "input"} className='login-input' placeholder="Mot de passe" onChange={(event) => {
                if(password.length === 1 && event.target.value.length === 0) {
                    setPassword(event.target.value)
                    setOldPassword(1)
                } else if(!PassValid(event.target.value)) {
                    setPassword(event.target.value)
                    setOldPassword(0)
                } else {
                    setPassword(event.target.value)
                    setOldPassword(2)
                }
            }}/>
            {visible ? 
                <FontAwesomeIcon icon="eye-slash" className='eye-slash' onClick={() => {setVisible(false)}}></FontAwesomeIcon>
                :
                <FontAwesomeIcon icon="eye" className='eye' onClick={() => {setVisible(true)}}></FontAwesomeIcon>
            }
        </div>
        {OldPassMger(oldPassword)}
    </>
    )
}

// All info is correct if oldName === 4 && oldEmail === 3 && oldPassword === 2 && tcs === true

const FailedLogIn = (failedLog) => {
    if(failedLog === 1) {
        return (<span className='false-login'>L'email ou le mot de passe que vous avez fourni sont incorrects</span>)
    } else if(failedLog === 2) {
        return (<span className='false-login'>Veuillez fournir un email</span>)
    } else if(failedLog === 3) {
        return (<span className='false-login'>Veuillez fournir un mot de passe</span>)
    } 
}

const ConOrLogIn = (tryConLogIn, setTryConLogIn, name, setName, email, setEmail, password, setPassword, visible, setVisible, oldName, setOldName, oldEmail, setOldEmail, oldPassword, setOldPassword, newsletter, setNewsletter, tcs, setTcs, token, setToken, loginMail, setLoginMail, loginPass, setLoginPass, failedLog, setFailedLog) => {
    if(tryConLogIn === 1) {
        return (
            <>
                        <div id='my-modal'></div>
                        <div className='tryConLogIn'>
                            <div className='close'>
                                <div className='close-button' onClick={() => {setTryConLogIn(0); setOldName(0); setOldEmail(0); setOldPassword(0)}}>
                                    <FontAwesomeIcon icon="xmark" className='modal-xmark'></FontAwesomeIcon>
                                </div>
                            </div>
                            <div className='content'>
                                <span className='join'>Rejoins le mouvement de la seconde main et vends sans frais !</span>
                                <div className='click-on'>
                                    <img src={require("../../Content/facebook-logo.png")} alt="Facebook" className='company-logo'/>
                                    <span>Continuer avec Facebook</span>
                                </div>
                                <div className='click-on'>
                                    <img src={require("../../Content/google-logo.png")} alt="Google" className='company-logo'/>
                                    <span>Continuer avec Google</span>
                                </div>
                                <div className='click-on'>
                                    <img src={require("../../Content/Apple-logo.png")} alt="Apple" className='company-logo'/>
                                    <span>Continuer avec Apple</span>
                                </div>
                                <div className='last'>
                                    <div className='action'>
                                        <span className='grey-action'>Ou inscris-toi avec </span><span className='blue-action' onClick={() => {setTryConLogIn(2)}}>E-mail</span>
                                    </div>
                                    <div className='action'>
                                        <span className='grey-action'>Tu as déjà un compte ? </span><span className='blue-action' onClick={() => {setTryConLogIn(3)}}>Se connecter</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
        )
    } else if(tryConLogIn === 2) {
        return (
            <>
                <div id='my-modal'></div>
                <div className='trySignUp'>
                    <div className='close'>
                        <div className='close-button' onClick={() => {setTryConLogIn(0) ; setOldName(0); setOldEmail(0); setOldPassword(0)}}>
                                <FontAwesomeIcon icon="xmark" className='modal-xmark'></FontAwesomeIcon>
                        </div>
                    </div>
                    <div className='content-sign-up'>
                        <span className='inscription'>Inscris-toi avec ton email</span>
                        {UserNameInput(name, setName, oldName, setOldName)}
                        {UserEmailInput(email, setEmail, oldEmail, setOldEmail)}
                        {UserPassInput(password, setPassword, oldPassword, setOldPassword, visible, setVisible)}
                        <div className='condition-news'>
                            <div className={newsletter === true ? 'tickedbox' : 'emptybox'} onClick={() => {newsletter === true ?
                            setNewsletter(false) : setNewsletter(true)}}>
                                <FontAwesomeIcon icon="check" className='tick'></FontAwesomeIcon>
                            </div>
                            <div className='condition-text'>
                                <span className='condition-grey'>S'inscrire à notre newsletter</span>
                            </div>
                        </div>
                        <div className='condition-tcs'>
                            <div className={tcs === true ? 'tickedbox' : 'emptybox'} onClick={() => {tcs === true ?
                            setTcs(false) : setTcs(true)}}>
                                <FontAwesomeIcon icon="check" className='tick'></FontAwesomeIcon>
                            </div>
                            <div className='condition-text'>
                                <span className='condition-grey'>J'accepte les</span>
                                <span className='condition-blue'>Termes et conditions</span>
                                <span className='condition-grey'>et les</span>
                                <span className='condition-blue'>Conditions de vente Pro</span>
                                <span className='condition-grey'>de Vinted, et je confirme avoir lu la</span>
                                <span className='condition-blue'>Politique de confidentialité</span>
                                <span className='condition-grey'>et avoir plus de 18 ans.</span>
                            </div>
                        </div>
                        <button className='continue' onClick={ async() => {
                            if(oldName === 4 && oldEmail === 3 && oldPassword === 2 && tcs === true) {
                                try {
                                    const response = await axios.post("https://lereacteur-vinted-api.herokuapp.com/user/signup", {
                                        email: email, //
                                        username: name, //
                                        password: password, //
                                        newsletter: newsletter //
                                    })
                                    Cookies.set("token", response.data.token, {expires: 7})
                                    setTryConLogIn(0) // set it at 3 for "logged-in"
                                    let CookieToken = Cookies.get("token");
                                    setToken(CookieToken);
                                  } catch (error) {
                                    console.log(error.response)
                                  }
                            }
                        }}>Continuer</button>
                        <span className='condition-blue-end'>Besoin d'aide ?</span>
                    </div>
                </div>
            </>
        )
    } else if(tryConLogIn === 3) {
        return(<>
                        <div id='my-modal'></div>
                        <div className='tryConLogIn'>
                            <div className='close'>
                                <div className='close-button' onClick={() => {setTryConLogIn(0); setOldName(0); setOldEmail(0); setOldPassword(0)}}>
                                    <FontAwesomeIcon icon="xmark" className='modal-xmark'></FontAwesomeIcon>
                                </div>
                            </div>
                            <div className='content'>
                                <span className='join'>Bienvenue !</span>
                                <div className='click-on'>
                                    <img src={require("../../Content/facebook-logo.png")} alt="Facebook" className='company-logo'/>
                                    <span>Continuer avec Facebook</span>
                                </div>
                                <div className='click-on'>
                                    <img src={require("../../Content/google-logo.png")} alt="Google" className='company-logo'/>
                                    <span>Continuer avec Google</span>
                                </div>
                                <div className='click-on'>
                                    <img src={require("../../Content/Apple-logo.png")} alt="Apple" className='company-logo'/>
                                    <span>Continuer avec Apple</span>
                                </div>
                                <div className='last'>
                                    <div className='action'>
                                        <span className='grey-action'>Ou connecte-toi avec </span><span className='blue-action' onClick={() => {setTryConLogIn(4)}}>E-mail</span>
                                    </div>
                                    <div className='action'>
                                        <span className='grey-action'>Tu n'as pas de compte Vinted ? </span><span className='blue-action' onClick={() => {setTryConLogIn(2)}}>S'inscrire</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>)
    } else if(tryConLogIn === 4) {
        return(
            <>
            <div id='my-modal'></div>
                <div className='trySignUp'>
                    <div className='close'>
                        <div className='close-button' onClick={() => {setTryConLogIn(0) ; setOldName(0); setOldEmail(0); setOldPassword(0); setLoginMail(""); setLoginPass(""); setFailedLog(0)}}>
                                <FontAwesomeIcon icon="xmark" className='modal-xmark'></FontAwesomeIcon>
                        </div>
                    </div>
                    <div className='content-sign-up'>
                        <span className='inscription'>Se connecter</span>
                        <input type="text" className='login-field' placeholder="Adresse email" onChange={(event) => {
                            setLoginMail(event.target.value)
                        }}></input>
                        <div className='fullpassword'>
                            <input type={!visible ? "password" : "input"} className='login-field' placeholder="Mot de passe" onChange={(event) => {
                            setLoginPass(event.target.value)}}/>
                            {visible ? 
                                <FontAwesomeIcon icon="eye-slash" className='eye-slash' onClick={() => {setVisible(false)}}></FontAwesomeIcon>
                                :
                                <FontAwesomeIcon icon="eye" className='eye' onClick={() => {setVisible(true)}}></FontAwesomeIcon>
                            }
                        </div>
                        {FailedLogIn(failedLog)}
                        <button className='continue-login' onClick={async() => {
                            if(loginMail.length > 0 && loginPass.length > 0) {
                                try {
                                    const newresponse = await axios.post("https://lereacteur-vinted-api.herokuapp.com/user/login", {
                                        email: loginMail, //
                                        password: loginPass //
                                    })
                                    console.log(newresponse.data)
                                        setFailedLog(0)
                                        Cookies.set("token", newresponse.data.token, {expires: 7})
                                        setTryConLogIn(0)
                                        let CookieToken = Cookies.get("token");
                                        setToken(CookieToken);
                                  } catch (error) {
                                    console.log(error.response)
                                    setFailedLog(1)
                                  }
                            } else if(!loginMail) {
                                setFailedLog(2)
                            } else if(!loginPass) {
                                setFailedLog(3)
                            }
                        }}>Continuer</button>
                        <span className='condition-blue-pass'>J'ai oublié mon mot de passe</span>
                        <span className='condition-blue-end'>Un problème ?</span>
                    </div>
                </div>
            </>
        )
    }
}


const Header = (props) => {
    const {tryConLogIn, setTryConLogIn} = props;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [oldName, setOldName] = useState(0);
    const [oldEmail, setOldEmail] = useState(0);
    const [oldPassword, setOldPassword] = useState(0);
    const [newsletter, setNewsletter] = useState(false);
    const [tcs, setTcs] = useState(false);
    const [token, setToken] = useState(null);
    const [loginMail, setLoginMail] = useState("");
    const [loginPass, setLoginPass] = useState("");
    const [failedLog, setFailedLog] = useState(0);

    useEffect(() => {
        let CookieToken = Cookies.get("token");
        setToken(CookieToken);
      }, [token])

    return (
        <header>
            <Link to="/" className='Vinted'><img src={require("../../Content/Vinted_logo.png")} alt="Vinted's logo"/></Link>
            <div className="search">
                <div className="categsearch">
                    <span>Articles</span>
                    <FontAwesomeIcon icon="sort-down" className='sort-down'></FontAwesomeIcon>
                </div>
                <div className='article-search'>
                    <FontAwesomeIcon icon="magnifying-glass" className='magnifying-class'></FontAwesomeIcon>
                    <input type="text" id="article-name-search" placeholder='Rechercher des articles' />
                    <FontAwesomeIcon icon="xmark" className='xmark'></FontAwesomeIcon>
                </div>
            </div>
            {
                !token ? 
                <button className='inscr-connect' onClick={() => {setTryConLogIn(1)}}>S'inscrire | Se connecter</button> 
                :
                <button className='disconnect' onClick={() => {Cookies.remove("token"); setToken(null)}}>Se déconnecter</button> 
            }
            <button className='sell-now'>Vends maintenant</button>
            <button className='question'><span>?</span></button>
            <div className='language'>
                <span>FR</span>
                <FontAwesomeIcon icon="sort-down" className='sort-down2'></FontAwesomeIcon>
            </div>
            {ConOrLogIn(tryConLogIn, setTryConLogIn, name, setName, email, setEmail, password, setPassword, visible, setVisible, oldName, setOldName, oldEmail, setOldEmail, oldPassword, setOldPassword, newsletter, setNewsletter, tcs, setTcs, token, setToken, loginMail, setLoginMail, loginPass, setLoginPass, failedLog, setFailedLog)}
        </header>
    )
}

export default Header;