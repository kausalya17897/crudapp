import { useState } from 'react';
import * as React from 'react';
import { Counter } from './Counter';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import IconButton from '@mui/material/IconButton'
import Card from '@mui/material/Card';
import { CardContent } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useHistory } from 'react-router';



export function Movie({ name, poster, rating, summary,id,deletebutton,editbutton }) {
  const [show, setShow] = useState(true);
  const styles = { color: rating > 8 ? "green" : "red", fontWeight: "bold" };
  const summarystyles = { display: show ? "block" : "none" };
  const history=useHistory();
   // history hook is used to update url 
  return (


    <Card className="movie-container">
      <img className="movie-poster" src={poster} alt={name} />
      <CardContent>
      <div className="movie-spec">

        <h3 className="movie-name">{name}
       
        <IconButton aria-label="info"
      className="moreinfo" 
      color="primary"
      onClick={() =>{console.log(id);
      history.push("/movies/"+id);
       }}>
      
      <InfoIcon/>
      </IconButton>

         <IconButton aria-label="hide"
      className="show-hide" 
      color="primary"
      onClick={() => setShow(!show)}>
       { show?<ExpandLessIcon/>:<ExpandMoreIcon/>}
      </IconButton>
      </h3>
        <p style={styles} className="movie-rating">⭐{rating}</p>
      </div>
      <p style={summarystyles} className="movie-summary">{summary}</p>
      <div className="icon">
      <Counter />{editbutton}{deletebutton}
      </div>
      </CardContent>
    </Card>
    //conditional statement is used to change icon onclick




  );
}
