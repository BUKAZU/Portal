import React from "react";
import { FormattedMessage, FormattedNumber } from "react-intl";

const SingleResult = ({ result }) => {
  console.log({ result });

  return (
    <a className="bukazu-result" href={result.house_url}>
      <div className="bukazu-result-inner">
        <div className="image-holder">
          <img src={result.image_url} alt={result.name} />
        </div>
        <div className="result">
          <div className="result-title">{result.name}</div>
          <div
            className="result-description"
            dangerouslySetInnerHTML={{ __html: result.description }}
          />
          <div className="result-details">
            <div>
              {result.persons} <FormattedMessage id="persons" />
            </div>
            <div>
              {result.bedrooms} <FormattedMessage id="bedrooms" />
            </div>
          </div>
          <div className="result-price">
            <FormattedMessage id="minimum_week_price" />
            <span className="price">
              €{" "}
              <FormattedNumber
                value={result.minimum_week_price}
                minimumFractionDigits={0}
                maximumFractionDigits={0}
              />
            </span>
          </div>
          <div className='result-button'>
            ->
          </div>
        </div>
      </div>
    </a>
  );
};

export default SingleResult;
