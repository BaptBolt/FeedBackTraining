import React, { useEffect, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import Accueil from './Components/Accueil/Accueil';
import ConnexionPage from './Components/ConnexionPage/ConnexionPage';
import ValidationPage from './Components/ValidationPage/ValidationPage';
import NewUser from './Components/NewUser/NewUser';
import ValidationNewUser from './Components/ValidationNewUser/ValidationNewUser.js';
import './App.css';
import axios from 'axios';
import {UserContext} from './Components/UserContext/UserContext';
import AdminPageConnexion from './Components/AdminConnexion/AdminPageConnexion';
import AdminPage from './Components/AdminPage/AdminPage.js';
import Host from './Components/Host/Host';


function App() {

  const[user, setUser] = useContext(UserContext);

  useEffect(()=>{
    if(localStorage.getItem('token')){
      axios.get(`http://${Host}:8000/users/`,{
        headers:{
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((response, err)=>{
        if(err){
          console.log(err)
        }else{
          console.log('je suis co')
          console.log(response.data)
          setUser(response.data)
        }
      })
    }else{
      console.log('je suis pas co')
    }
  },[])

  return (
    <>
        <Switch>
          <Route exact path="/" component={Accueil} />
          <Route path="/adminpage" component={AdminPage}/>
          <Route path="/adminpageconnexion" component={AdminPageConnexion}/>
          <Route path="/validationnewuser" component={ValidationNewUser} />
          <Route path="/homepage" component={HomePage} />
          <Route path="/login" component={ConnexionPage} />
          <Route path="/validation" component={ValidationPage} />
          <Route path="/newuser" component={NewUser} />
        </Switch>
    </>
  );
}

export default App;
