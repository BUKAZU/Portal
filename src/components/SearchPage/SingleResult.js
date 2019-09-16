import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import ArrowRight from '../icons/ArrowRight.svg';

const SingleResult = ({ result, options }) => {
  // console.log({ options });
  let thisOptions = options || {};

  return (
    <a className="bukazu-result" href={result.house_url}>
      <div className="bukazu-result-inner">
        <div className="image-holder">
          <img src={result.image_url} alt={result.name} />
        </div>
        <div className="result">
          <div className="result-title">{result.name}</div>
          <div className="result-place">
            {thisOptions.showCity && <span>{result.city}, </span>}
            {thisOptions.showRegion && <span>{result.province}, </span>}
            {thisOptions.showCountry && <span>{result.country_name}</span>}
          </div>
          <div
            className="result-description"
            dangerouslySetInnerHTML={{ __html: result.description }}
          />
          <div className="result-details">
            {thisOptions.showPersons && (
              <div>
                {result.persons} <FormattedMessage id="persons" />
              </div>
            )}
            {thisOptions.showBedrooms && (
              <div>
                {result.bedrooms} <FormattedMessage id="bedrooms" />
              </div>
            )}
            {thisOptions.showBathrooms && (
              <div>
                {result.bathrooms} <FormattedMessage id="bathrooms" />
              </div>
            )}
          </div>
          {thisOptions.showPrice && (
            <div className="result-price">
              <FormattedMessage id="minimum_week_price" />
              <span className="price">
                €{' '}
                <FormattedNumber
                  value={result.minimum_week_price}
                  minimumFractionDigits={0}
                  maximumFractionDigits={0}
                />
              </span>
            </div>
          )}
          <div className="result-button">
            <ArrowRight />
          </div>
        </div>
      </div>
    </a>
  );
};

SingleResult.propTypes = {
  result: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
};

export default SingleResult;
