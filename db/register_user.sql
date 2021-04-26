insert into users (username, hash)
values ($1, $2)
returning *;
