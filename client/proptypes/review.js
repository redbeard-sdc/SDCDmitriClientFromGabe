import { string, number, shape } from 'prop-types';
import userPropTypes from './users';

const reviewPropTypes = shape({
  _id: string.isRequired,
  hotel_id: string.isRequired,
  user_id: userPropTypes.isRequired,
  title: string.isRequired,
  description: string.isRequired,
  date: string.isRequired,
  language: string.isRequired,
  traveler_type: string.isRequired,
  ratings: shape({
    _id: string.isRequired,
    rating: number.isRequired,
    cleanliness: number.isRequired,
    location: number.isRequired,
    service: number.isRequired,
    sleep_quality: number.isRequired,
  }).isRequired,
});

export default reviewPropTypes;
