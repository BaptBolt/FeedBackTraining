import React, { Fragment, useState, useContext } from 'react';
import {Link} from 'react-router-dom';
import {UserContext} from '../UserContext/UserContext';
import axios from 'axios';
import './AdminPageConnexion.css';
import Host from '../Host/Host.js';



const AdminPageConnexion = (props) =>{

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [alert, setAlert] = useState(false)

  const [user, setUser] = useContext(UserContext);

  const closeAlert = () => {
    setAlert(false)
  }

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
          props.history.push('/adminpage')
        }
      }
    })
  }


  return(
    <Fragment>
      <Link to="/login"><button type="submit" className="btn btn-secondary btn-lg mt-3 ml-3">Retour</button></Link>
      <div className="allPageConnexion container">
      <h1>Connecte toi en tant qu'admin !</h1>
        {
          alert && <div class="alert alert-warning alert-dismissible fade show" role="alert">
            Email ou mot de passe invalide!
        <button type="button" onClick={closeAlert} className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        }
        <div>
          <div className="form-group">
            <label htmlFor="InputEmailLogin">Adresse mail</label>
            <input type="email"
              placeholder="Ton email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className="form-control" id="InputEmailLogin" aria-describedby="emailHelp" />
            <label htmlFor="InputPasswordLogin">Mot de passe</label>
            <input type="password"
              placeholder="Ton mot de passe"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              className="form-control" id="InputPasswordLogin" />
          </div>
          <button type="submit" onClick={submitForm} className="btn btn-secondary btn-lg">Connexion</button>
        </div>
      </div>
    </Fragment>
  )
}

export default AdminPageConnexion;