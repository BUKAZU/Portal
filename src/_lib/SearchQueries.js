import gql from "graphql-tag";

export const HOUSES_QUERY = gql`
  query PortalSiteHousesQuery($id: ID!, $country_id: ID!) {
    PortalSite(id: $id) {
      houses(country_id: $country_id) {
        id
        name
        persons
        description
        image_url
        house_url
        minimum_week_price
      }
    }
  }
`;
