import React from 'react';
import { Link } from 'react-router-dom'
import './Accueil.css';
import Icon from '../../Assets/Images/18143.png';

const Accueil = () => {
  return (
    <div className="allPage">
      <div className="title">
        <img alt="logoapp" className="img" src={Icon} />
        <h1>FeedBack Training</h1>
        <Link to="/login"><button type="button" className="btn btn-secondary btn-lg">Connexion</button></Link>
      </div>
    </div>
  )
};

export default Accueil;