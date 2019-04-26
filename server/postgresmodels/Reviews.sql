DROP TABLE IF EXISTS reviews;
CREATE Table reviews(
    _id serial PRIMARY KEY,
    user_id integer,
    hotel_id integer,
    username varchar(255),
    aname varchar(255),
    city varchar(255),
    astate varchar(255),
    adate bigint,
    title varchar(255),
    adescription varchar(255),
    alanguage varchar(255),
    helpful_votes varchar(255),
    rating integer,
    ratinglocation integer,
    cleanliness integer,
    aservice integer,
    sleep_quality integer
);

COPY reviews(_id, user_id, hotel_id, username, aname, city, astate, adate, title, adescription, alanguage, helpful_votes, rating, ratinglocation, cleanliness, aservice, sleep_quality) 
FROM '/Reviews.csv' DELIMITER ',' CSV HEADER;
-- reviews
--     -id
--     -user_id
--     -hotel_id
--     -username
--     -name
--     -city
--     -state
--     -date
--     -description
--     -language
--     -helpful_votes
--     - overall rating
--     - location
--     - cleanliness
--     - service
--     - sleep_quality
