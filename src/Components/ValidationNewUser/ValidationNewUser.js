import React from 'react';
import {Link} from 'react-router-dom';
import Icon from '../../../src/Assets/Images/succes-validation.png';
import './ValidationNewUser.css';


const ValidationNewUser = () =>{
  return(
    <div className="allPageValidationNewUser">
    <Link to="/login"><button>Clique ici pour te connecter</button></Link>
      <img alt="img validation" className="imgValidationNewUser" src={Icon}/>
      <p className="textNewUser">Ton compte est crée tu peux maintenant te connecter</p>
    </div>
  )
};

export default ValidationNewUser;