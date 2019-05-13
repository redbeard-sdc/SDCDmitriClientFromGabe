#!/bin/bash
#docker cp ./server/postgresmodels/Users.sql postgres.cm6vtohwc8z6.us-east-1.rds.amazonaws.com:Users.sql
#docker cp ./server/postgresmodels/Answers.sql postgres.cm6vtohwc8z6.us-east-1.rds.amazonaws.com:Answers.sql
#docker cp ./server/postgresmodels/Reviews.sql postgres.cm6vtohwc8z6.us-east-1.rds.amazonaws.com:Reviews.sql
#docker cp ./server/postgresmodels/Hotels.sql postgres.cm6vtohwc8z6.us-east-1.rds.amazonaws.com:Hotels.sql
#docker cp ./server/postgresmodels/Photos.sql postgres.cm6vtohwc8z6.us-east-1.rds.amazonaws.com:Photos.sql
#docker cp ./server/postgresmodels/RoomTips.sql postgres.cm6vtohwc8z6.us-east-1.rds.amazonaws.com:RoomTips.sql
#docker cp ./server/postgresmodels/Questions.sql postgres.cm6vtohwc8z6.us-east-1.rds.amazonaws.com:Questions.sql

#docker cp ./server/seedpostgres/files/Users.csv postgres.cm6vtohwc8z6.us-east-1.rds.amazonaws.com:Users.csv
#docker cp ./server/seedpostgres/files/Answers.csv postgres.cm6vtohwc8z6.us-east-1.rds.amazonaws.com:Answers.csv
#docker cp ./server/seedpostgres/files/Reviews.csv postgres.cm6vtohwc8z6.us-east-1.rds.amazonaws.com:Reviews.csv
#docker cp ./server/seedpostgres/files/Hotels.csv postgres.cm6vtohwc8z6.us-east-1.rds.amazonaws.com:Hotels.csv
#docker cp ./server/seedpostgres/files/Photos.csv postgres.cm6vtohwc8z6.us-east-1.rds.amazonaws.com:Photos.csv
#docker cp ./server/seedpostgres/files/RoomTips.csv postgres.cm6vtohwc8z6.us-east-1.rds.amazonaws.com:RoomTips.csv
#docker cp ./server/seedpostgres/files/Questions.csv postgres.cm6vtohwc8z6.us-east-1.rds.amazonaws.com:Questions.csv


psql --host=postgres.cm6vtohwc8z6.us-east-1.rds.amazonaws.com --port=5432 --username=postgres --password --dbname=postgres -c "COPY users FROM STDIN DELIMITER ',' CSV HEADER;" < /home/student/Desktop/Immersive/SDC/gabe-reviews-service/server/seedpostgres/files/Users.csv
psql --host=postgres.cm6vtohwc8z6.us-east-1.rds.amazonaws.com --port=5432 --username=postgres --password --dbname=postgres -c "COPY answers FROM STDIN DELIMITER ',' CSV HEADER;" < /home/student/Desktop/Immersive/SDC/gabe-reviews-service/server/seedpostgres/files/Answers.csv
psql --host=postgres.cm6vtohwc8z6.us-east-1.rds.amazonaws.com --port=5432 --username=postgres --password --dbname=postgres -c "COPY reviews FROM STDIN DELIMITER ',' CSV HEADER;" < /home/student/Desktop/Immersive/SDC/gabe-reviews-service/server/seedpostgres/files/Reviews.csv
psql --host=postgres.cm6vtohwc8z6.us-east-1.rds.amazonaws.com --port=5432 --username=postgres --password --dbname=postgres -c "COPY hotels FROM STDIN DELIMITER ',' CSV HEADER;" < /home/student/Desktop/Immersive/SDC/gabe-reviews-service/server/seedpostgres/files/Hotels.csv
psql --host=postgres.cm6vtohwc8z6.us-east-1.rds.amazonaws.com --port=5432 --username=postgres --password --dbname=postgres -c "COPY photos FROM STDIN DELIMITER ',' CSV HEADER;" < /home/student/Desktop/Immersive/SDC/gabe-reviews-service/server/seedpostgres/files/Photos.csv
psql --host=postgres.cm6vtohwc8z6.us-east-1.rds.amazonaws.com --port=5432 --username=postgres --password --dbname=postgres -c "COPY roomtips FROM STDIN DELIMITER ',' CSV HEADER;" < /home/student/Desktop/Immersive/SDC/gabe-reviews-service/server/seedpostgres/files/RoomTips.csv
psql --host=postgres.cm6vtohwc8z6.us-east-1.rds.amazonaws.com --port=5432 --username=postgres --password --dbname=postgres -c "COPY questions FROM STDIN DELIMITER ',' CSV HEADER;" < /home/student/Desktop/Immersive/SDC/gabe-reviews-service/server/seedpostgres/files/Questions.csv


#docker cp ./seedpostgres.bash postgres.cm6vtohwc8z6.us-east-1.rds.amazonaws.com:launchpsql.bash