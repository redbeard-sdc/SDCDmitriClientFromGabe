#!/bin/bash
psql -U postgres -f Users.sql
psql -U postgres -f Hotels.sql
psql -U postgres -f Reviews.sql
psql -U postgres -f Photos.sql
psql -U postgres -f Questions.sql
psql -U postgres -f RoomTips.sql
psql -U postgres -f Answers.sql
