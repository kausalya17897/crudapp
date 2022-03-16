import * as React from 'react';
import { Movie } from './Movie';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useHistory} from 'react-router';
import {useEffect ,useState} from 'react';
import { API_URL} from '../global_constants'


//const API_URL="https://61681515ba841a001727c589.mockapi.io";
export function Movielist() {
  const[movies,setMovies]=useState([]);

  const getMovies=()=>{
    fetch("https://movieserverreview.herokuapp.com/movies")
    .then((data)=>data.json())
    .then((mvs)=>setMovies(mvs))
    
    
  };
 
useEffect(getMovies,[]);
console.log("setmovies",setMovies)
//called 1time because of empty dependency
const deleteMovie=(id)=>{
  fetch(`https://movieserverreview.herokuapp.com/movies/${id}`,{
method:"DELETE",
  }).then(()=>getMovies());
  //.getmovie to refresh
};

  
  const history=useHistory();
  
    console.log("cghg",movies);
  return (
    
    <div className="movie-list">
        
      {movies.map(({ name, poster, rating, summary,_id },index) =>(
        <Movie
          name={name}
          poster={poster}
          rating={rating}
          summary={summary}
          key={index}
          id={_id} 
          //we are printing movelist  which doesnot match the same index and setting in setMovies
          deletebutton={
          <IconButton onClick={()=>deleteMovie(_id)}
          className="deletebutton"
          color="error"
          aria-label="delete">
          <DeleteIcon/>
          </IconButton>}

          editbutton={
           <IconButton onClick={()=>history.push("/movies/edit/"+_id) }
           className="editbutton"
           style={{marginLeft:"auto"}}
           color="primary"
           aria-label="edit">
           <EditIcon/>
           </IconButton>
           }/>
          
      ))} 
    </div>
    );
}


