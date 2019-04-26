DROP TABLE IF EXISTS answers;
CREATE Table answers(
    _id serial PRIMARY KEY,
    user_id integer,
    adate bigint,
    answer varchar(255),
    votes integer
);

COPY answers(_id, user_id, adate, answer, votes)
FROM '/Answers.csv' DELIMITER ',' CSV HEADER;

--  Answers
--      -user_id
--      -question_id
--      -date
--      -answer
--      -votes