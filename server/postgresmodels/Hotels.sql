DROP TABLE IF EXISTS hotels;
CREATE Table hotels(
    _id serial PRIMARY KEY,
    aname varchar(255),
    street varchar(255),
    city varchar(255),
    astate varchar(255),
    zip varchar(255),
    country varchar(255),
    adescription varchar(255),
    phone varchar(255),
    nearest_airport varchar(255),
    aurl varchar(255),
    ranking integer,
    stars integer
);

COPY hotels(_id,aname,street,city,astate,zip,country,adescription,phone,nearest_airport,aurl,ranking,stars) 
FROM '/Hotels.csv' DELIMITER ',' CSV HEADER;
