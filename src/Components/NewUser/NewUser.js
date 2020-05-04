import React, { Fragment, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './NewUser.css';
import Host from '../Host/Host';

const NewUser = (props)=>{

  const[alertforget, setAlertForget] = useState(false);
  const[alreadyUser, setAlreadyUser] = useState(false);

  const [form, setForm]=useState({
    firstname:'',
    lastname:'',
    email: '',
    password: '',
    cpassowrd: '',

  })

  const submitForm = () =>{
    axios.post(`http://${Host}:8000/users`, {
      firstname: form.firstname,
      lastname: form.lastname,
      email: form.email,
      password: form.password,
      cpassowrd: form.cpassowrd
    }).then(response => {
      if(response.status === 200){
        props.history.push('/validationnewuser') 
      }
    }).catch(error => {
      if(error.response.status === 400){
        setAlertForget(true)
      } else{
        if(error.response.status === 403)
        setAlreadyUser(true)
      }
    })
  }

  const closeAlertForget = () =>{
    setAlertForget(false)
  }

  const closeAlertAlreadyUser = () =>{
    setAlreadyUser(false)
  }

  const checkForm = () =>{
    let disable = true
    if(form.cpassowrd === form.password){
      disable = false
    }
    return disable;
  }

  return(
    <Fragment>
      <div className="returnButton mb-4">
      <Link to="Login"><button type="submit" className="btn btn-secondary btn-lg">Retour</button></Link>
      </div>
      <div className="formNewUser container">
       <h4 className="titleNewUser">Premiere Connexion ? <br /><br /> Rensigne ton adresse mail et ton mot de passe ci dessous.</h4> 
       {
        alertforget && <div className="alert alert-warning alert-dismissible fade show" role="alert">
         Tu as oublié(e) un ou plusieurs champs !
        <button type="button" onClick={closeAlertForget} className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      }
      {
        alreadyUser && <div className="alert alert-warning alert-dismissible fade show" role="alert">
         Tu as déja un compte !
        <button type="button" onClick={closeAlertAlreadyUser} className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      }
       <div className="form-group mb-4">
        <label htmlFor="exampleFistName">Prénom</label>
        <input type="text" 
        placeholder="Ton prénom"
        value ={form.firstname} 
        onChange={(event)=>setForm({...form,firstname:event.target.value})}
        className="form-control" id="InputFistName" aria-describedby="emailHelp" />
        <label htmlFor="InputLastName">Nom</label>
        <input type="text" 
        placeholder="Ton nom"
        value={form.lastname} 
        onChange={(event)=>setForm({...form, lastname:event.target.value})}
        className="form-control" id="InputLastName" aria-describedby="emailHelp" />
        <label htmlFor="InputEmail">Adresse mail</label>
        <input type="email" 
        placeholder="Ton email"
        value={form.email} 
        onChange={(event)=>setForm({...form,email:event.target.value})}
        className="form-control" id="InputEmail" aria-describedby="emailHelp" />
        <label htmlFor="InputPassword">Mot de passe</label>
        <input type="password" 
        placeholder="Ton mot de passe"
        value={form.password} 
        onChange={(event)=>setForm({...form, password:event.target.value})}
        className="form-control" id="InputPassword" />
        <label htmlFor="InputPasswordControl">Confirme ton mot de passe</label>
        <input type="password" 
        placeholder="Confirme ton mot de passe"
        value={form.cpassowrd} 
        onChange={(event)=>setForm({...form, cpassowrd:event.target.value})}
        className="form-control" id="InputPasswordControl" />
      </div>
      <button onClick={submitForm} type="submit" className="btn btn-secondary btn-lg" disabled={checkForm()}>Inscription</button>
    </div>
    </Fragment>
  )
}

export default NewUser;