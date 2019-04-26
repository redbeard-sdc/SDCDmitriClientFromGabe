DROP TABLE IF EXISTS photos;
CREATE Table photos(
    _id serial PRIMARY KEY,
    hotel_id integer,
    aurl varchar(255),
    adate bigint,
    adescription varchar(255),
    likes integer,
    category varChar(255)
);

COPY photos(_id,hotel_id,aurl,adate,adescription,likes,category) 
FROM '/Photos.csv' DELIMITER ',' CSV HEADER;

--   photos
--       - _id
--       - hotel_id
--       - url
--       - date
--       - description
--       - likes
--       - category
