import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import QuestionAnswer from '../QuestionAnswer/index';

const QuestionAnswers = ({ id: questionId }) => {
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [seeMore, setSeeMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/api/reviews/questions/${questionId}/answers`)
      .then(res => res.json())
      .then(data => {
        setAnswers(data);
        setLoading(false);
      });
  }, [questionId]);

  const [first, ...remaining] = answers;

  return (
    <>
      <QuestionAnswer answer={first} />
      {seeMore &&
        remaining.map(answer => (
          <QuestionAnswer key={answer._id} answer={answer} />
        ))}
      <button type="button" onClick={() => setSeeMore(!seeMore)}>
        See More
      </button>
    </>
  );
};

QuestionAnswers.propTypes = {
  id: PropTypes.string.isRequired,
};

export default QuestionAnswers;
