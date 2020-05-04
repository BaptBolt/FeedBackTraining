import React, { useState, Fragment, useContext, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './AdminPage.css';
import { UserContext } from '../UserContext/UserContext.js';
import Host from '../Host/Host';
import UserInformations from '../UserInformations/UserInformations.js'

const AdminPage = (props) => {


  const [nameFilter, setNameFilter] = useState('');

  const handleFilterNameInput = (event) => {
    setNameFilter(event.target.value)
  }


  const [values, setValues] = useState([])

  const [user, setUser] = useContext(UserContext);

  useEffect( ()=> {
    axios.get(`http://${Host}:8000/information/`)
      .then(response => setValues(response.data))
  },[]);

  const Disconnect = () =>{
    localStorage.removeItem('token');
  }


  return (
    <Fragment>
      <div className="allPageAdmin">
        <h2>Cherche l'athlète que tu souhaite ici !</h2>
        <input onChange={handleFilterNameInput} type='text' />
        <div className="card-body resultsArrary">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Name</th>
                <th scope="col">Sommeil qualité</th>
                <th scope="col">sommeil quantité</th>
                <th scope="col">Disposition Mental</th>
                <th scope="col">Intensité entrainement</th>
                <th scope="col">Efficience</th>
                <th scope="col">Intensité tension musculaire N°1</th>
                <th scope="col">Zone tension N°1</th>
                <th scope="col">Intensité tension musculaire N°2</th>
                <th scope="col">Zone tension N°2</th>
              </tr>
            </thead>
            <tbody>
              {values.filter(value => {
                return value.firstname.toLowerCase().includes(nameFilter.toLowerCase())
              }).map(value => {
                console.log(value)
                  return (
                    <UserInformations
                    dateAjout={value.dateAjout}
                      firstname={value.firstname}
                      nightValue={value.nightValue}
                      nightHours={value.nightHours}
                      mentalDisposition={value.mentalDisposition}
                      trainingIntensity={value.trainingIntensity}
                      trainingEfficience={value.trainingEfficience}
                      muscleTensionDValue={value.muscleTensionDValue}
                      muscleTensionD={value.muscleTensionD}
                      muscleTensionGValue={value.muscleTensionGValue}
                      muscleTensionG={value.muscleTensionG}
                    />
                  )
                })
              }

            </tbody>
          </table>
        </div>
        <Link to="/"><button onClick={Disconnect} type="button" className="btn btn-secondary btn-lg mt-3">Deconnexion</button></Link>
      </div>
    </Fragment>

  )
};

export default AdminPage;