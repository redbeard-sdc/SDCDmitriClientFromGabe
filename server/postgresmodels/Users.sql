DROP TABLE IF EXISTS users;
CREATE Table users(
    _id serial PRIMARY KEY,
    username varchar(255),
    personname varchar(255),
    city varchar(255),
    astate varchar(255),
    contributions integer,
    helpful_votes integer
);

COPY users(_id,username,personname,city,astate,contributions,helpful_votes) 
FROM '/Users.csv' DELIMITER ',' CSV HEADER;

-- Users
--   username
--   name
--     -first_name
--     -last_nam
--   location
--     -city
--     -state
--   contributions
--   helpful_votes