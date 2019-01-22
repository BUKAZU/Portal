import React from "react";
import { FormattedMessage as FM } from "react-intl";

const DamageInsurance = () => (
  <React.Fragment>
    <h2>
      <FM id="damage_insurance" />
    </h2>
    <hr />
    <p>
      <FM id="damage_insurance_desc" />
    </p>
    
    <h3>
      <FM id="terms_and_costs" />
    </h3>
    
    <p>
      <FM id="181_costs" />
    </p>    
    <p>
      <FM id="more_information" />
    </p>
    <a
      href="http://bukazu.com/insurances/nl/Voorwaarden%20Annuleringsverzekering.pdf"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FM id="show_terms" />
    </a>    

    <hr />
    <h2>
      <FM id="poliscosts" />
    </h2>
    <p>
      <FM id="poliscosts_are" />
    </p>

    <p>
      <FM id="youwillrecieve" />
    </p>
  </React.Fragment>
);

export default DamageInsurance;
