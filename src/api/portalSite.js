import gql from "graphql-tag";

const PORTAL_SITE = gql`
  query PortalSiteQuery($id: ID!) {
    PortalSite(id: $id) {
      options
      countries {
        id
        name
      }
      regions {
        id
        name
        country_id
      }
      cities {
        id
        name
        region
        country_id
      }
      extra_search
      max_bathrooms
      max_bedrooms
      max_nights
      max_persons
      max_weekprice
      country_label
      country_placeholder
      region_label
    }
  }
`;
