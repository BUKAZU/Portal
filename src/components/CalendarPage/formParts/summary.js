import React from "react";
import { FormattedMessage, FormattedNumber } from "react-intl";

export const Summary = ({ house, bookingPrice }) => (
  <React.Fragment>
    <h2>
      <FormattedMessage id="booking_details" />
    </h2>
    <div className="house-details">
      <div>{house.name}</div>
      <img src={house.image_url} alt="" />
      <table>
        <tbody>
          <tr>
            <th>
              <FormattedMessage id="arrival_date" />
            </th>
            <td />
          </tr>
          <tr>
            <th>
              <FormattedMessage id="departure_date" />
            </th>
            <td />
          </tr>
        </tbody>
      </table>
    </div>
  </React.Fragment>
);
