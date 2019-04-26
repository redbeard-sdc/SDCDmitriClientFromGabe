DROP TABLE IF EXISTS questions;
CREATE Table questions(
    _id serial PRIMARY KEY,
    hotel_id  integer,
    adate  bigint,
    question  varchar(255)
);

COPY questions(_id,hotel_id,adate,question)
FROM '/Questions.csv' DELIMITER ',' CSV HEADER;


--      questions
--          - id
--          - userid
--          - date
--          - question
