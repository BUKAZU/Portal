import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'formik';
import Modal from './Modal';
import Icon from '../../icons/info.svg';
import CancelInsurance from './CancelInsurance';
// import DamageInsurance from "./DamageInsurance";
// import TravelInsurance from "./TravelInsurance";

function translatedOption(id, value) {
  return (
    <FormattedMessage id={id}>
      {formattedMessage => <option value={value}>{formattedMessage}</option>}
    </FormattedMessage>
  );
}

// function damage_insurance(house) {
//   if (house.damage_insurance && !house.damage_insurance_required) {
//     return <div className="form-row inline">
//         <label htmlFor="damage_insurance">
//           <FormattedMessage id="damage_insurance" />
//         </label>
//         <Field component="select" name="damage_insurance">
//           {translatedOption("choose", "")}
//           {translatedOption("yes", 1)}
//           {translatedOption("none", 0)}
//         </Field>
//         <Modal buttonText={<Icon />}>
//           <DamageInsurance />
//         </Modal>
//       </div>;
//   } else {
//     return "";
//   }
// }

function cancel_insurance(house) {
  if (house.cancel_insurance) {
    return (
      <div className="form-row inline">
        <label htmlFor="cancel_insurance">
          <FormattedMessage id="cancel_insurance" />
        </label>
        <Field component="select" name="cancel_insurance" required="true">
          {translatedOption('choose', '')}
          {translatedOption('cancel_insurance_all_risk', 2)}
          {translatedOption('cancel_insurance_normal', 1)}
          {translatedOption('none', 0)}
        </Field>
        <Modal buttonText={<Icon />}>
          <CancelInsurance />
        </Modal>
      </div>
    );
  }
}

// function travel_insurance(house) {
//   if (house.travel_insurance) {
//     return <div className="form-row inline">
//         <label htmlFor="travel_insurance">
//           <FormattedMessage id="travel_insurance" />
//         </label>
//         <Field component="select" name="travel_insurance" required="true">
//           {translatedOption("choose", "")}
//           {translatedOption("yes", 1)}
//           {translatedOption("none", 0)}
//         </Field>
//         <Modal buttonText={<Icon />}>
//           <TravelInsurance />
//         </Modal>
//       </div>;
//   }
// }

export const Insurances = ({ house }) => {
  if (
    (house.damage_insurance && !house.damage_insurance_required) ||
    house.cancel_insurance ||
    house.travel_insurance
  ) {
    return (
      <div className="form-section">
        <h2>
          <FormattedMessage id="insurances" />
        </h2>
        {/* {damage_insurance(house)} */}
        {cancel_insurance(house)}
        {/* {travel_insurance(house)} */}
      </div>
    );
  } else {
    return <div />;
  }
};

Insurances.propTypes = {
  house: PropTypes.object.isRequired,
};
