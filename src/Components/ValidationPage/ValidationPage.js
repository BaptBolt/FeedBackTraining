import React from 'react';
import {Link} from 'react-router-dom';
import './ValidationPage.css';
import Icon from '../../../src/Assets/Images/validation.png';

const ValidationPage = ()=>{

const Disconnect = () =>{
  localStorage.removeItem('token');
}

  return(
    <div className="allPageValidation">
      <img alt="validationimg" className="imgValidation" src={Icon}/>
      <p className="text">Merci pour tes renseignements et à demain !</p>
      <Link to="/"><button onClick={Disconnect} type="button" className="btn btn-secondary btn-lg">Deconnexion</button></Link>
    </div>
  )
};

export default ValidationPage;