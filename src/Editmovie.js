import * as React from 'react';
import { useState ,useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams,useHistory } from "react-router-dom";

//higher order component
export function Editmovie() {
  const { id } = useParams();

  //const movie = movies[id];
  const[movie,setMovie]=useState(null);
useEffect(()=>{
  fetch(`https://61681515ba841a001727c589.mockapi.io/movie/${id}`,{
  method:"GET",
})
  .then((data)=>data.json())
  .then((mvs)=>setMovie(mvs));
},[id]);
console.log("cgc",movie)
  //replace the updatedmovie
  //only show movie when dataavailable
  return movie ? <UpdatedMovie movie={movie} />:"";
}
function UpdatedMovie({movie}){
  console.log("bnb",movie)
  
  const [name, setName] = useState(movie.name);
  const [poster, setPoster] = useState(movie.poster);
  const [rating, setRating] = useState(movie.rating);
  const [summary, setSummary] = useState(movie.summary);
  const [trailer, setTrailer] = useState(movie.trailer);
const history=useHistory();
const editmovie = () => {
const updatedMovie = {
   name, poster, rating, summary,trailer,
  };

  fetch(`https://61681515ba841a001727c589.mockapi.io/movie/${movie.id}`,{
    method:"PUT",
    body:JSON.stringify(updatedMovie),
    headers:{
      "Content-Type":"application/json",

    },
  }).then(()=>history.push("/movies"));
};
  return (
    <div className="addmoviedata">
      <TextField id="standard-basic" variant="standard" value={name} type="text"
        onChange={(event) => setName(event.target.value)}
        placeholder="enter movie name" />
      <TextField id="standard-basic" variant="standard" value={poster}
        onChange={(event) => setPoster(event.target.value)}
        placeholder="enter movie url" />

      <TextField id="standard-basic" variant="standard" value={rating} onChange={(event) => setRating(event.target.value)}
        placeholder="enter rating" />
      <TextField id="standard-basic" variant="standard" value={summary} onChange={(event) => setSummary(event.target.value)}
        placeholder="enter movie summary" />
        <TextField id="standard-basic" variant="standard" value={trailer} onChange={(event) => setTrailer(event.target.value)}
        placeholder="enter movie trailer" />
      <Button variant="outlined" onClick={editmovie}>update movie</Button>
<Button onClick={()=>history.goBack("/movies")}
variant="outlined"
startIcon={<ArrowBackIcon/>} >back</Button>
    </div>
  );
}
