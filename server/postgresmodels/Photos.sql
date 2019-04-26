DROP TABLE IF EXISTS photos;
CREATE Table photos(
    _id serial PRIMARY KEY,
    hotel_id integer,
    user_id integer,
    aurl varchar(255),
    adate bigint,
    adescription varchar(255),
    likes integer,
    category varChar(255),
    ADD FOREIGN KEY (hotel_id) REFERENCES hotels (_id);
    ADD FOREIGN KEY (user_id) REFERENCES users (_id);

);

COPY photos(_id,hotel_id,aurl,adate,adescription,likes,category) 
FROM '/Photos.csv' DELIMITER ',' CSV HEADER;

--   photos
--       - _id
--       - hotel_id
--       - user_id
--       - url
--       - date
--       - description
--       - likes
--       - category
