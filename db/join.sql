select user_info.first_name, user_info.last_name, user_info.user_username
from user_info
join users on user_info.user_username = users.username
where username=$1

