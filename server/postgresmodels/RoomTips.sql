DROP TABLE IF EXISTS roomtips;
CREATE Table roomtips(
    _id serial PRIMARY KEY,
    review_id  integer,
    adate  bigint,
    tip varchar(255),
    rating integer
);

COPY roomtips(_id,review_id,adate,tip,rating)
FROM '/RoomTips.csv' DELIMITER ',' CSV HEADER;


--      roomTips
--           - id
--           - reviewid
--           - date
--           - tip
--           - rating