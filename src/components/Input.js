import { Fragment, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../firebase-config';
import Nav from "../Nav";
import "./component.css";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";


export default function Input({ type, placeHolder, setItem, label, errorMessage }) {

    return (
        <div>
            <label className="inputLabel">
                {label}
            </label>

            <input className="inputBox" type={type} placeholder={placeHolder} onChange={(e) => {
                setItem(e.target.value)
            }} />

            <div className={errorMessage ? "errorMessage" : "transparentMessage"}>{errorMessage ? errorMessage : ""}</div>

        </div >
    )
}