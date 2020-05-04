import React, { useState, Fragment, useContext } from 'react';
import './HomePage.css';
import axios from 'axios';
import { UserContext } from '../UserContext/UserContext.js';
import Host from '../Host/Host';

const HomePage = (props) => {

  const [alert, setAlert] = useState(false)

  const [form, setForm] = useState({
    nightValue: null,
    nightHours: null,
    mentalDisposition: null,
    trainingIntensity: null,
    trainingEfficience: null,
    muscleTensionDValue: null,
    muscleTensionD: '',
    muscleTensionGValue: null,
    muscleTensionG: '',
  })

  const [user, setUser] = useContext(UserContext);

  const submitForm = () => {
    axios.post(`http://${Host}:8000/information/`, {
      nightValue: form.nightValue,
      nightHours: form.nightHours,
      mentalDisposition: form.mentalDisposition,
      trainingIntensity: form.trainingIntensity,
      trainingEfficience: form.trainingEfficience,
      muscleTensionDValue: form.muscleTensionDValue,
      muscleTensionD: form.muscleTensionD,
      muscleTensionGValue: form.muscleTensionGValue,
      muscleTensionG: form.muscleTensionG,
      userID: user.id
    }).then(response => {
      if (response.status === 200) {
        props.history.push('/validation')
      } else {
        if (response.status === 400) {
          setAlert(true)
        }
      }
    })
  }


  return (
    <Fragment>
      <div className="formulaire">
        <h1>Salut {user.firstname} !</h1>
        <div>
          {
            alert && <div class="alert alert-warning alert-dismissible fade show" role="alert">
              Tu as oublié(e) de remplir un des champs obligatoires !
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          }
        </div>

        <div className="critere mb-5">
          <h2>Critère 1 : Sommeil </h2>

          <label htmlFor="nightValue">Comment avez-vous dormi ? 0 étant « une nuit cauchemardesque ».</label>
          <div className="graduations">
            <p>0</p>
            <p>5</p>
            <p>10</p>
          </div>
          <input value={form.nightValue}
            onChange={(event) => setForm({ ...form, nightValue: event.target.value })}
            type="range" id="nightValue" name="nightValue"
            min="0" max="10" step="0.1" className="inputRange" />

          <label htmlFor="nightHours">Nombre d'heures de sommeil sur ta nuit précédente</label>
          <input value={form.nightHours}
            type="time" id="nightHours" 
            min="01:00" max="18:00"
            id="inputTime"
            onChange={(event) => setForm({ ...form, nightHours: event.target.value })} />
        </div>



        <div className="critere mb-5">
          <h2>Critère 2 : Disposition mentale à s'entrainer</h2>

          <label htmlFor="trainingValue">Dans quel état psychologique arrivez-vous à l’entraînement aujourd’hui ? 0 étant « je n’ai même pas envie de venir » </label>
          <div className="graduations">
            <p>0</p>
            <p>5</p>
            <p>10</p>
          </div>
          <input
            type="range" id="trainingValue" name="trainingValue"
            min="0" max="10" step="0.1" className="inputRange" value={form.mentalDisposition}
            onChange={(event) => setForm({ ...form, mentalDisposition: event.target.value })}/>
        </div>

        <div className="critere mb-5">
          <h2>Critère 3 : Intensité de l'entrainement</h2>

          <label>Quel est l'intensité ressentie de la séance ? 0 étant « aucune intensité »</label>
          <div className="graduations">
            <p>0</p>
            <p>5</p>
            <p>10</p>
          </div>
          <input
            type="range" id="trainingIntensity" name="trainingIntensity"
            min="0" max="10" step="0.1" className="inputRange" value={form.trainingIntensity}
            onChange={(event) => setForm({ ...form, trainingIntensity: event.target.value })}/>
        </div>

        <div className="critere mb-5">
          <h2>Critère 4 : Efficience. Capacité à se sentir efficace dans la séance.</h2>

          <label className="mb-3">Vous êtes vous senti efficace dans la séance ? 0 étant « aucune efficacité »</label>
          <div className="graduations">
            <p>0</p>
            <p>5</p>
            <p>10</p>
          </div>
          <input
            type="range" id="trainingIntensity" name="trainingIntensity"
            min="0" max="10" step="0.1" className="inputRange" value={form.trainingEfficience}
            onChange={(event) => setForm({ ...form, trainingEfficience: event.target.value })} />
        </div>

        <div className="critere mb-5">
          <h2>Critère 5 : Tensions musculaires</h2>

          <p>Avez-vous des tensions musculaires ? 0 étant « aucune tension » </p>
          <label htmlFor="anothersValues">Intensité de la tension N°1</label>
          <div className="graduations">
            <p>0</p>
            <p>5</p>
            <p>10</p>
          </div>
          <input
            type="range" id="trainingIntensity" name="trainingIntensity"
            min="0" max="10" step="0.1" className="mb-3" className="inputRange" value={form.muscleTensionDValue}
            onChange={(event) => setForm({ ...form, muscleTensionDValue: event.target.value })}/>
          <textarea className="form-control"
            onChange={(event) => setForm({ ...form, muscleTensionD: event.target.value })}
            id="anothersValues" rows="3" placeholder="Décris la zone et ta tension"></textarea>

          <label htmlFor="anothersValues" className="mt-4">Intensité de la tension N°2</label>
          <div className="graduations">
            <p>0</p>
            <p>5</p>
            <p>10</p>
          </div>
          <input
            type="range" id="trainingIntensity" name="trainingIntensity"
            min="0" max="10" step="0.1" className="mb-3" className="inputRange" value={form.muscleTensionGValue}
            onChange={(event) => setForm({ ...form, muscleTensionGValue: event.target.value })}/>
          <textarea className="form-control"
            onChange={(event) => setForm({ ...form, muscleTensionG: event.target.value })}
            id="anothersValues" rows="3" placeholder="Décris la zone et ta tension"></textarea>
        </div>

        <button type="submit" onClick={submitForm} className="btn btn-secondary btn-lg mb-5">Valide tes infos</button>
      </div>
    </Fragment>

  )
};

export default HomePage;