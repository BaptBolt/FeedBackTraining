import React, { useState, Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import './ConnexionPage.css';
import axios from 'axios';
import { UserContext } from '../UserContext/UserContext.js';
import Host from '../Host/Host.js';

const ConnexionPage = (props) => {

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [alert, setAlert] = useState(false)

  const [user, setUser] = useContext(UserContext);

  const submitForm = () => {
    axios.post(`http://${Host}:8000/login/`, {
      email: form.email,
      password: form.password
    }).then(response => {
      console.log(response);
      if (response.status === 200) {
        if (response.data.status === 400) {
          setAlert(true)
        } else {
          const { data } = response;
          setUser({ ...user, ...data.user })
          localStorage.setItem('token', data.token)
          props.history.push('/homepage')
        }
      }
    })
  }

  const closeAlert = () => {
    setAlert(false)
  }

  return (
    <Fragment>
      <div className="allPageConnexion">

        <h1>Connecte toi</h1>
        {
          alert && <div class="alert alert-warning alert-dismissible fade show" role="alert">
            Email ou mot de passe invalide!
        <button type="button" onClick={closeAlert} className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        }
        <div className="container">
          <div className="form-group">
            <label htmlFor="InputEmailLogin">Adresse mail</label>
            <input type="email"
              placeholder="Ton email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className="form-control" id="InputEmailLogin" aria-describedby="emailHelp" />
          </div>
          <div className="form-group">
            <label htmlFor="InputPasswordLogin">Mot de passe</label>
            <input type="password"
              placeholder="Ton mot de passe"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              className="form-control" id="InputPasswordLogin" />
          </div>
          <button type="submit" onClick={submitForm} className="btn btn-secondary btn-lg">Connexion</button>
        </div>
        <Link to="newuser"><small id="emailHelp" className="newCompte">Tu n'as pas encore de compte? Clique ici</small></Link>
        <div className="buttonsRetourAdmin mt-4">
          <Link to="/adminpageconnexion"><button type="submit" className="btn btn-secondary btn-lg">Admin</button></Link>
          <Link to="/"><button type="submit" className="btn btn-secondary btn-lg">Retour</button></Link>
        </div>
      </div>
    </Fragment>
  )
};

export default ConnexionPage;