import "./styles.css";
import Pagination from './components/Pagination';
import { Fragment, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";

export default function App() {

  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const loadingArray = [1, 2, 3, 4, 5, 6, 7, 8]


  useEffect(() => {
    const endpoint = `https://api.themoviedb.org/3/trending/movie/week?api_key=d908cdc5e4223e480c0497b5a861d68d&page=${pageNumber}`;
    fetch(endpoint)
      .then(blob => blob.json())
      .then(api => {
        setMovies(api.results)
        setTotalPages(api.total_pages)
      });
  }, [pageNumber]);



  return (
    < div className="App" >
      <Nav />

      <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalPages={totalPages} />

      <main>
        {loadingArray.map(function (array, index) {
          return (
            <Fragment key={index}>
              <div className={`outer content ${movies.length === 0 ? " display" : " hide"}`} >
                <div className=" movieLoading">
                  <img alt="" src={`https://retchhh.files.wordpress.com/2015/03/loading1.gif`}></img>
                </div>
              </div>
            </Fragment>
          )
        })}

        {movies.map(function (movie, index) {
          return (
            < Fragment key={index} >
              <div className="outer">
                <Link className="link" to={(`/Movie/${movie.id}`)}>
                  <div className="row content">
                    <div className={movies.length === 0 ? " hide" : 'row  '}>

                      <div className="subContent1  ">
                        <img alt="" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}></img>
                      </div>

                      <div className="textAlignLeft subContent2">

                        <h3 className="movieTitle">{movie.title}</h3>
                        <span className="releaseDate fontSize14px">{movie.release_date}</span>
                        <p className="overview fontSize13px">{movie.overview}</p>
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

