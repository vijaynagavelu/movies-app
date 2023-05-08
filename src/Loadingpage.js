import Nav from "./Nav";
import "./movie.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { getRatingColor } from "./utlities";
import moment from "moment/moment";
import Footer from "./components/Footer";

export default function Loadingpage() {
    return (
        <div>
            <Nav />
            <div className="marginTop50">
                <div className=" movieLoading">
                    <img src={`https://retchhh.files.wordpress.com/2015/03/loading1.gif`}></img>
                </div>
            </div>

        </div>
    )

}
