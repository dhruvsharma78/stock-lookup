import React from 'react';
import PropTypes from 'prop-types';

import './styles/newsitem.css';

function timeDiff(t1) {
  const a = new Date(t1);
  const now = new Date();
  const timeData = [now - a];
  const timeFractions = [1000, 60, 60, 24, 30, 12];
  const formatter = [
    'Milliseconds',
    'Seconds',
    'Minutes',
    'Hours',
    'Days',
    'Months',
    'Years',
  ];
  for (let i = 0; i < timeFractions.length; i += 1) {
    timeData.push(parseInt(timeData[i] / timeFractions[i], 10));
    timeData[i] %= timeFractions[i];
    if (timeData[i] === 0) {
      if (i === 0) return 'Just Now';
      let formattedText = formatter[i - 1];
      if (timeData[i - 1] === 1) {
        formattedText = formatter[i - 1].slice(0, -1);
      }
      return `${timeData[i - 1]} ${formattedText} Ago`;
    }
  }
  return timeData;
}

function timeConverter(timestamp) {
  const a = new Date(timestamp);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  return `${date} ${month}, ${year} | ${timeDiff(timestamp)}`;
}

export default function newsitem(props) {
  const { data } = props;
  const { headline, image, source, datetime, summary, url } = data;
  const date = timeConverter(datetime);
  return (
    <div className="news-item">
      <div className="top-bar">
        <a href={url} className="img-link">
          <img src={image} alt={source} />
        </a>
        <div className="headline-section">
          <a className="headline" href={url}>
            {headline}
          </a>
          <div className="row-two">
            <h2 className="source">{source}</h2>
            <h2 className="date">{date}</h2>
          </div>
        </div>
      </div>
      <div className="bottom-bar">
        <p className="summary">{summary}</p>
        <a className="read-more" href={url}>
          Read More
        </a>
      </div>
    </div>
  );
}

newsitem.propTypes = {
  data: PropTypes.shape({
    headline: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    datetime: PropTypes.number.isRequired,
  }),
};

newsitem.defaultProps = {
  data: 0,
};
