import './App.css';
import * as React from 'react';
import { Movielist } from './movie/Movielist';
import { useState } from 'react';
import{Switch,Route,Redirect} from "react-router-dom";
import { AddMovie } from './AddMovie';
import { Editmovie } from './Editmovie';
import { Moviedetails } from './Moviedetails';
import { Notfound } from './Notfound';
import { Welcome } from './Welcome';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {useHistory} from 'react-router-dom';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Loginform } from './Loginform';

import { API_URL } from './global_constants';
export default function App() {
  // eslint-disable-next-line
 //name:"",poster:"",rating:"",summary:""
  



//const name=["kausi","madhu","prisci"];

const [movies,setMovies]=useState();
//
const history=useHistory();
const [mode,setMode]=useState("dark")
const theme = createTheme({
  palette: {
    mode: mode,
  },
});
React.useEffect(()=>{
  fetch(`${API_URL}`)
  .then((data)=>data.json())
  .then((mvs)=>setMovies(mvs));
},[]);
console.log("gh",movies);
return(
  <ThemeProvider theme={theme}>
    <Paper elevation={0} >
  <div className="App">

  <AppBar position="static" style={{marginBottom:"20px"}}>
    <Toolbar variant="dense">
      <Button variant="text"color="inherit" onClick={()=>history.push('/')}>
Home</Button>
<Button variant="text"color="inherit" onClick={()=>history.push("/movies")}>
Movies</Button>
<Button variant="text"color="inherit" onClick={()=>history.push("/Addmovie")}>
Add movies</Button>
<Button variant="text"color="inherit" onClick={()=>history.push("/colorbox")}>
colorbox</Button>

<Button  style={{marginLeft:"auto"}}variant="text"color="inherit" onClick={()=>setMode(mode==="light"?"dark":"light")}>
Light mode </Button>
<Button  style={{marginRight:"10px"}}variant="text"color="inherit" onClick={()=>history.push("/signup")}>
Sign up </Button>
  </Toolbar>
  </AppBar>
 
<Switch>
<Route exact path="/">
    <Welcome/>
</Route>
  <Route path="/films">
    <Redirect  to="/movies"/>
    </Route>
    <Route path="/movies/edit/:id"><Editmovie/></Route>
    <Route path="/movies/:id"> <Moviedetails />
  </Route>
  
  <Route path="/movies">
  <Movielist/>
 
  </Route>
  
  <Route path="/AddMovie">
  <AddMovie/>
  </Route>
  <Route path="/colorbox">
  <colorbox/>
  </Route>
  
  <Route path="/signup">
  <Loginform/>
  </Route>
  
  <Route path="**">
<Notfound/>
  </Route>
  </Switch>

</div>
</Paper>
</ThemeProvider>
)
}

