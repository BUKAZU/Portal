import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from '../icons/loading.svg';
import format from '../../_lib/format';
import { FormattedMessage, FormattedNumber } from 'react-intl';

export const CALENDAR_QUERY = gql`
  query BookingPriceQuery(
    $id: ID!
    $house_id: String!
    $starts_at: Date!
    $ends_at: Date!
  ) {
    PortalSite(id: $id) {
      houses(house_code: $house_id) {
        id
        name
        booking_price(starts_at: $starts_at, ends_at: $ends_at)
      }
    }
  }
`;

class PriceField extends React.Component {
  render() {
    const { portalCode, objectCode, startsAt, endsAt, locale } = this.props;
    return (
      <Query
        query={CALENDAR_QUERY}
        variables={{
          id: portalCode,
          house_id: objectCode,
          starts_at: startsAt,
          ends_at: endsAt,
          locale: locale,
        }}
      >
        {({ loading, data }) => {
          if (loading)
            return (
              <div className="price-overview--build">
                <Loading />
              </div>
            );
          // if (error) return <div>Error</div>;

          const result = data.PortalSite.houses[0].booking_price;

          return (
            <React.Fragment>
              <div className="price-overview--details" />
              <div className="price-overview--build">
                <table>
                  <thead>
                    <tr>
                      <th>
                        <FormattedMessage id="included_in_price" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="column" colSpan="2">
                        <FormattedMessage id="rent_price" />
                      </td>
                    </tr>
                    <tr className={result.discount > 0 ? '' : 'hidden'}>
                      <td className="column" colSpan="2">
                        <FormattedMessage id="discount" />
                      </td>
                      <td className="price">{result.discount} %</td>
                    </tr>
                    <tr className={result.discount > 0 ? '' : 'hidden'}>
                      <td className="column" colSpan="2">
                        <FormattedMessage id="price_after_discount" />
                      </td>
                    </tr>
                    <tr>
                      <td className="column">
                        <ul>
                          {result.required_house_costs.map(cost => {
                            return <li key={cost.id}>{cost.name}</li>;
                          })}
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="price-overview--extra">
                <div className="data-label">
                  <FormattedMessage id="booking_from_til" />
                </div>
                <div className="data">
                  {format(startsAt, 'DD-MM-YYYY')} /{' '}
                  {format(endsAt, 'DD-MM-YYYY')}
                </div>
              </div>
              <div className="price-overview--book">
                <div className="price">
                  €{' '}
                  <FormattedNumber
                    value={result.total_price}
                    minimumFractionDigits={2}
                    maximumFractionDigits={2}
                  />
                </div>
                <div>
                  <i>
                    <FormattedMessage id="based_on_one_person" />
                  </i>
                </div>
                <button
                  className="button"
                  onClick={() => {
                    this.props.onStartBooking('false');
                  }}
                >
                  <FormattedMessage id="calculate" />
                </button>
              </div>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

PriceField.propTypes = {
  portalCode: PropTypes.string.isRequired,
  objectCode: PropTypes.string.isRequired,
  startsAt: PropTypes.string.isRequired,
  endsAt: PropTypes.string.isRequired,
  onStartBooking: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

export default PriceField;
