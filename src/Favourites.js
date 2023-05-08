import "./styles.css";
import { db } from "./firebase-config";
import Pagination from './components/Pagination';
import { Fragment, useEffect, useState, useRef } from "react";
import Nav from "./Nav";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, onAuthStateChanged, reload, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from './firebase-config';
import {
    addDoc,
    deleteDoc,
    doc,
    getDocs,
    collection,
    updateDoc,
    query,
    where
} from "firebase/firestore";


export default function Favourites() {

    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const loadingArray = [1]


    const [movieDetails, setMovieDetails] = useState([]);
    const [documentId, setDocumentId] = useState();
    const [user, setUser] = useState("");
    const [timer, setTimer] = useState(0);

    const params = useParams();
    const collectionRef = collection(db, "favouriteMovies")

    const navigate = useNavigate();



    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser.uid);
            // console.log(currentUser.uid);
            getMovie()
        })
        return subscriber;
    }, [user]);

    const getMovie = async () => {
        const movieMatch = query(collectionRef, where("userId", "==", user))
        const data = await getDocs(movieMatch);
        if (data.docs[0]) {
            console.log(data.docs[0].data().movieId);
            console.log(data.docs);
            setDocumentId(data.docs[0].id);
            setMovieDetails(data.docs);

            setTimeout(() => {
                setTimer(1);
            }, 100);

        } else {
            setMovieDetails([]);
            console.log("No such document!");
            setTimeout(() => {
                setTimer(1);
            }, 700);
        }
    }

    console.log('movieDetails', movieDetails)

    return (
        < div className="App" >
            <Nav />

            <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalPages={totalPages} />

            <main>
                {loadingArray.map(function (array, index) {
                    return (
                        <Fragment key={index}>
                            <div className={`outer content ${movieDetails.length == 0 ? " display" : " hide"}`} >
                                <div className=" movieLoading">
                                    <img src={`https://retchhh.files.wordpress.com/2015/03/loading1.gif`}></img>
                                </div>
                            </div>
                        </Fragment>
                    )
                })}

                {movieDetails.map(function (movie, index) {
                    console.log(movie.data().movieId)
                    return (
                        < Fragment key={index} >
                            <div className="outer">
                                <Link className="link" to={(`/Movie/${movie.data().movieId}`)}>
                                    <div className="row content">
                                        <div className={movie.data().length == 0 ? " hide" : 'row  '}>

                                            <div className="subContent1  ">
                                                <img src={`https://image.tmdb.org/t/p/w500/${movie.data().moviePosterPath}`}></img>
                                            </div>

                                            <div className="textAlignLeft subContent2">

                                                <h3 className="movieTitle">{movie.data().movieTitle}</h3>
                                                <span className="releaseDate fontSize14px">{movie.data().movieReleaseDate}</span>
                                                {/* <p className="overview fontSize13px">ff</p> */}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </Fragment >
                    )
                })}
            </main >

        </div >
    );
}


//rotating animation  done
//constant layout (nav bar) done
//pageNumber increase (optional)
//pagination done
//max page limit to be done
//variable names to be checked

