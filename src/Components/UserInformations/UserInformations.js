import React from 'react';
import moment from 'moment';

// moment.locale();

const UserInformations = (props) => {
  return (
    <tr>
      <td>{moment(props.dateAjout).format('DD/MM/YYYY')}</td>
      <td>{props.firstname}</td>
      <td>{props.nightValue}</td>
      <td>{props.nightHours}</td>
      <td>{props.mentalDisposition}</td>
      <td>{props.trainingIntensity}</td>
      <td>{props.trainingEfficience}</td>
      <td>{props.muscleTensionDValue}</td>
      <td>{props.muscleTensionD}</td>
      <td>{props.muscleTensionGValue}</td>
      <td>{props.muscleTensionG}</td>
    </tr>
  )
}

export default UserInformations;