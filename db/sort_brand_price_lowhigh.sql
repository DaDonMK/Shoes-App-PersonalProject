select * from shoes
where brand = $1
order by price asc


-- insert into shoes(brand, shoe_name, size, price, original_price, image, alt_image, quantity, popularity, dropped)
-- values('jordans', '', ARRAY[6,7,8,9,10,11,12,13,14,15,18], 300.00, 300.00, 'https://cdn.flightclub.com/1250/TEMPLATE/189347/1.jpg', ARRAY['https://cdn.flightclub.com/1250/TEMPLATE/189347/2.jpg','https://cdn.flightclub.com/1250/TEMPLATE/189347/3.jpg','https://cdn.flightclub.com/1250/TEMPLATE/189347/4.jpg'], 1, 7, 'old')