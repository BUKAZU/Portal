import React from 'react';
import { Query } from 'react-apollo';
import Pagination from 'react-js-pagination';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
// import { Container } from './Pagination.css';
import { HOUSE_COUNT_QUERY } from '../../_lib/SearchQueries';
import Loading from '../icons/loading.svg';

class Paginator extends React.Component {
  constructor(props) {
    super(props);

    this.handlePageChange = this.handlePageChange.bind(this);

    this.state = {
      activePage: 1,
      totalAmount: 10,
    };
  }

  handlePageChange(pageNumber) {
    // console.log(`active page is ${pageNumber}`);
    this.props.onPageChange(pageNumber);
  }

  render() {
    return (
      <Query query={HOUSE_COUNT_QUERY} variables={this.props.variables}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Loading />
              </div>
            );
          if (error) return <div>Error</div>;

          const results = data.PortalSite.houses;
          return (
            <div className="bu-paginator">
              <div>
                {results.length} <FormattedMessage id="results" />
              </div>
              <Pagination
                activePage={this.props.activePage}
                itemsCountPerPage={this.props.limit}
                totalItemsCount={results.length}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

Paginator.propTypes = {
  activePage: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  variables: PropTypes.object.isRequired,
};

export default Paginator;
