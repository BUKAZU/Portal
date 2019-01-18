import React from "react";
import { FormattedMessage } from "react-intl";
import { Field } from "formik";
import Modal from './Modal'
import Icon from "../../icons/info.svg";

function translatedOption(id, value) {
  return (
    <FormattedMessage
      id={id}
      children={formattedMessage => (
        <option value={value}>{formattedMessage}</option>
      )}
    />
  );
}


function damage_insurance(house) {
  if (house.damage_insurance && !house.damage_insurance_required) {
    return <div className="form-row inline">
        <label htmlFor="damage_insurance">
          <FormattedMessage id="damage_insurance" />
        </label>
        <Field component="select" name="damage_insurance">
          {translatedOption("choose", "")}
          {translatedOption("yes", 1)}
          {translatedOption("none", 0)}
        </Field>
      </div>;
  } else {
    return "";
  }
}

function cancel_insurance(house) {
  if (house.cancel_insurance) {
    return <div className="form-row inline">
        <label htmlFor="cancel_insurance">
          <FormattedMessage id="cancel_insurance" />
        </label>
        <Field component="select" name="cancel_insurance" required="true">
          {translatedOption("choose", "")}
          {translatedOption("cancel_insurance_all_risk", 2)}
          {translatedOption("cancel_insurance_normal", 1)}
          {translatedOption("none", 0)}
        </Field>
        <Modal buttonText={<Icon />}>
          <h2>
            <FormattedMessage id="cancel_insurance" />
          </h2>
          <p>
            Er kunnen zich helaas altijd situaties voordoen, waardoor u uw
            vakantie moet afzeggen. Of het kan noodzakelijk zijn dat u later
            vertrekt of eerder terugkeert. Met een annuleringsverzekering
            hoeft u zelf niet voor deze kosten op te draaien. U heeft de
            keuze uit twee annuleringsverzekeringen:
          </p>
        </Modal>
      </div>;
  }
}

function travel_insurance(house) {
  if (house.travel_insurance) {
    return (
      <div className="form-row inline">
        <label htmlFor="travel_insurance">
          <FormattedMessage id="travel_insurance" />
        </label>
        <Field component="select" name="travel_insurance" required="true">
          {translatedOption("choose", "")}
          {translatedOption("yes", 1)}
          {translatedOption("none", 0)}
        </Field>
      </div>
    );
  }
}

export const Insurances = ({ house }) => {
  if ((house.damage_insurance && !house.damage_insurance_required) || house.cancel_insurance || house.travel_insurance) {
    return <div className="form-section">
        <h2>
          <FormattedMessage id="insurances" />
        </h2>
        {damage_insurance(house)}
        {cancel_insurance(house)}
        {travel_insurance(house)}
      </div>;
  } else {
    return <div></div>
  }
}
