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
import { API_URL } from './global_constants';
import Signup from './Signup';
import Login from './Login';
import { useEffect } from 'react';
export default function App() {
  const [data,setData]=useState();
  const [token,setToken]=useState(localStorage.getItem("x-auth-token"))
  const history=useHistory();

  const logout=()=>{
    localStorage.removeItem("x-auth-token");
    setToken(null)
    history.push("/login")
  }
  const movieview = () => {
    if (!token) {
        history.push("/login");
    }
fetch(`https://movieserverreview.herokuapp.com/movies`,{ method: "GET",
//fetch(`/fleetandpricing`,{ method: "GET",
headers: {
    "x-auth-token": token
}
}).then((res)=>res.json())
.then((a)=>{
    console.log("a",a)
setData(a)
}).catch(err=>console.log("err",err))
};

useEffect(movieview, []);

console.log("gh",data);


const [movies,setMovies]=useState();
//

const [mode,setMode]=useState("dark")
const theme = createTheme({
  palette: {
    mode: mode,
  },
});

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


<Button  style={{marginLeft:"auto"}}variant="text"color="inherit" onClick={()=>setMode(mode==="light"?"dark":"light")}>
{mode==="light"?"dark":"light"} mode </Button>
{
  !token ?(
    <>
<Button  style={{marginRight:"10px"}}variant="text"color="inherit" onClick={()=>history.push("/signup")}>
Sign up </Button>
<Button  style={{marginRight:"10px"}}variant="text"color="inherit" onClick={()=>history.push("/login")}>
Login </Button>
</>
  ):(<Button  style={{marginRight:"10px"}}variant="text"color="inherit" onClick={logout}>
  Logout </Button>)
}
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
  <Route path="/signup">
  <Signup/>
  </Route>
  
  <Route path="/login">
  <Login setToken={setToken}/>
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

