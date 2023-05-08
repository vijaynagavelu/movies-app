import { Link, useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, reload, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from './firebase-config';




export default function Nav(props) {

    const [user, setUser] = useState({});
    const navigate = useNavigate();


    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })
        return subscriber;
    }, [])

    const logout = async () => {
        await signOut(auth);
        document.location.reload();
        window.location.reload();
        navigate('');
    }

    function profileLetter(letter) {
        if (letter) {
            return ((letter?.charAt(0)).toUpperCase());
        }
    }

    return (
        <nav>
            <ul className="row navBar">
                <li className="fontSize22px">🧮</li>
                <ul className="row navSub">
                    <Link to={"/"}>
                        <li >
                            <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
                                width="50" height="30"></img>
                        </li>
                    </Link>

                    <Link to={"/Favourites"}>
                        <div className={user ? " display favourites" : 'hide'} >
                            <input className="transparent" type="checkbox"></input>
                            <label
                                className={1 ? 'redHeart' : " greyHeart"} >❤</label>
                        </div>
                    </Link>

                    <li  >🔔 </li>

                    <Link className={`link  ${user ? "hide" : " "}`} to={"/Login"}>
                        <li className="loginSignIn" >Login</li>
                    </Link>
                    <Link className={`link  ${user ? "hide" : " "}`} to={"/SignIn"}>
                        <li className="loginSignIn" >Join TMDB </li>
                    </Link>

                    <li className={`userAlphabet  ${user ? "" : " hide"}`}>{user ? profileLetter(user.email) : ""} </li>
                    <li className={`logOut  ${user ? "" : " hide"}`} onClick={logout}>{user ? "Sign Out" : ""} </li>

                    <li>🔍</li>
                </ul>
            </ul>
        </nav >
    )
}