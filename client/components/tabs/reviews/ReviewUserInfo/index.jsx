import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import ReviewButton from '../ReviewButton/index';

import userPropTypes from '../../../../proptypes/users';

import {
  review__userInfo__avatar,
  review__userInfo__wrapper,
  review__extrasPopup__wrapper,
  review__userInfo__extras__wrapper,
  review__userInfo__username,
  review__userInfo__subInfo,
  review__userInfo__contributions,
  review__userInfo__popup,
} from './reviewUserInfo.scss';

import { review__inner__wrapper } from '../review.scss';

const ReviewUserInfo = ({ user, date, type }) => {
  const formattedDate = dateFormat(date, 'mmm yyyy');
  const [extrasPopup, setExtrasPopup] = useState(false);

  const toggleExtras = (_e, option) =>
    setExtrasPopup(typeof option === 'boolean' ? option : !extrasPopup);

  const togglePopupOff = e => {
    if (
      e.target.id !== 'extras_popup_wrapper' &&
      e.target.id !== 'extras_popup_ul' &&
      e.target.id !== 'extras_popup_li'
    ) {
      toggleExtras(null, false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', togglePopupOff);

    return function removeListener() {
      document.removeEventListener('click', togglePopupOff);
    };
  });

  return (
    <div className={`${review__inner__wrapper} ${review__userInfo__wrapper}`}>
      <div>
        <img
          src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png"
          alt="User Avatar"
          className={review__userInfo__avatar}
        />
      </div>
      <div>
        <div>
          <span className={review__userInfo__username}>{user.username}</span>
          <span>
            {` ${
              type === 'photo' ? 'posted a photo' : 'wrote a review'
            } ${formattedDate}`}
          </span>
        </div>
        <div className={review__userInfo__subInfo}>
          <span>{`${user.location && user.location.city}, `}</span>
          <span>{user.location && user.location.state}</span>
          <span className={review__userInfo__contributions}>
            {` - ${user.contributions} `}
          </span>
          <span>contributions</span>
          <span className={review__userInfo__contributions}>
            {` - ${user.helpful_votes} `}
          </span>
          <span>helpful votes</span>
        </div>
      </div>
      <div className={review__userInfo__extras__wrapper}>
        {/* put share button here */}
        <ReviewButton icon="user-plus" text="Follow" />
        <ReviewButton icon="ellipsis-h" text="" onClick={toggleExtras} />
        {extrasPopup && (
          <div
            id="extras_popup_wrapper"
            className={review__extrasPopup__wrapper}
          >
            <ul id="extras_popup_ul" className={review__userInfo__popup}>
              <li id="extras_popup_li">
                <a href="http://www.google.com">Report this</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

ReviewUserInfo.propTypes = {
  user: userPropTypes.isRequired,
  date: PropTypes.string.isRequired,
  type: PropTypes.string,
};

ReviewUserInfo.defaultProps = {
  type: 'review',
};

export default ReviewUserInfo;
