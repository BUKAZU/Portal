import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import format from "../../_lib/format";
import { FormattedMessage, FormattedNumber } from "react-intl";

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

const PriceField = ({ portalCode, objectCode, startsAt, endsAt, locale }) => (
  <Query
    query={CALENDAR_QUERY}
    variables={{
      id: portalCode,
      house_id: objectCode,
      starts_at: startsAt,
      ends_at: endsAt
    }}
  >
    {({ loading, error, data }) => {
      if (loading) return <div>Fetching</div>;
      if (error) return <div>Error</div>;

      const result = data.PortalSite.houses[0].booking_price;

      return (
        <React.Fragment>
          <div className="price-overview--details" />
          <div className="price-overview--build">
            <table>
                <thead>
                    <th><FormattedMessage id="included_in_price" /></th>
                </thead>
              <tbody>
                <tr>
                  <td className="column">
                    <FormattedMessage id="rent_price" />
                  </td>
                  <td className="price">
                    € <FormattedNumber value={result.rent_price} minimumFractionDigits="2" maximumFractionDigits="2" />
                  </td>
                </tr>
                <tr>
                  <td className="column">
                    <FormattedMessage id="discount" />
                  </td>
                  <td className="price">{result.discount} %</td>
                </tr>
                <tr>
                  <td className="column">
                    <FormattedMessage id="price_after_discount" />
                  </td>
                  <td className="price">
                    € <FormattedNumber value={result.discounted_price} minimumFractionDigits="2" maximumFractionDigits="2" />
                  </td>
                </tr>
                <tr>
                  <td className="column">
                  </td>
                </tr>
                <tr>
                  <td className="column" style={{verticalAlign: 'top'}}>
                    <FormattedMessage id="extra_costs_included" />:
                  </td>
                  <td className="column">
                    <ul>
                        {result.required_house_costs.map(cost => {
                            return <li>{cost[`name_${locale}`]}</li>
                        })}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="column">
                    <FormattedMessage id="price" />
                  </td>
                  <td className="price">
                    € <FormattedNumber value={result.total_price} minimumFractionDigits="2" maximumFractionDigits="2" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="price-overview--extra">
            <table>
                <thead>
                    <tr>
                        <th>
                            <FormattedMessage id="optional_costs" />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr></tr>
                </tbody>
            </table>
          </div>
          <div className="price-overview--book">
            <div className="data-label">
                <FormattedMessage id="booking_from_til" />
            </div>
            <div className="data">
                { format(startsAt, "DD-MM-YYYY") } / { format(endsAt, "DD-MM-YYYY") }
            </div>
            <div className="price">
                € <FormattedNumber value={result.total_price} minimumFractionDigits="2" maximumFractionDigits="2" />
            </div>
            <div className="button">
              <FormattedMessage id="book" />
            </div>
            <div className="option">
              <FormattedMessage id="choose_for_option" />
            </div>
          </div>
        </React.Fragment>
      );
    }}
  </Query>
);


export default PriceField;
