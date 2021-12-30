import * as React from 'react';
import { Movie } from './Movie';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useHistory} from 'react-router';
import {useEffect ,useState} from 'react';


export function Movielist() {
  const[movies,setMovies]=useState([]);

  const getMovies=()=>{
    fetch("https://61681515ba841a001727c589.mockapi.io/movie")
    .then((data)=>data.json())
    .then((mvs)=>setMovies(mvs));
  };
useEffect(getMovies,[]);
//called 1time because of empty dependency
const deleteMovie=(id)=>{
  fetch(`https://61681515ba841a001727c589.mockapi.io/movie/${id}`,{
method:"DELETE",
  }).then(()=>getMovies());
  //.getmovie to refresh
};

  
  const history=useHistory();
  console.log("setmovies",setMovies)
    console.log("cghg",movies);
  return (
    
    <div className="movie-list">
        
      {movies.map(({ name, poster, rating, summary,id },index) =>(
        <Movie
          name={name}
          poster={poster}
          rating={rating}
          summary={summary}
          id={id} 
          //we are printing movelist  which doesnot match the same index and setting in setMovies
          deletebutton={
          <IconButton onClick={()=>deleteMovie(id)}
          className="deletebutton"
          color="error"
          aria-label="delete">
          <DeleteIcon/>
          </IconButton>}

          editbutton={
           <IconButton onClick={()=>history.push("/movies/edit/"+id) }
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


