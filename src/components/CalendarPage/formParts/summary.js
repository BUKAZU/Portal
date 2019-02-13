import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import format from '../../../_lib/format';

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
              <FormattedMessage id="arrival" />
            </th>
            <td className="price">
              {format(bookingPrice.arrival_date, 'dddd DD MMMM YYYY')}
            </td>
            <td>{bookingPrice.arrival_time}</td>
          </tr>
          <tr>
            <th>
              <FormattedMessage id="departure" />
            </th>
            <td className="price">
              {format(bookingPrice.departure_date, 'dddd DD MMMM YYYY')}
            </td>
            <td>{bookingPrice.departure_time}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </React.Fragment>
);

Summary.propTypes = {
  house: PropTypes.object.isRequired,
  bookingPrice: PropTypes.object.isRequired,
};
