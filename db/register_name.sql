insert into user_info (user_username, first_name, last_name)
values ($1, $2, $3)
returning *;