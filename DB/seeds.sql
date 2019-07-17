INSERT INTO user
(
name, email
)
VALUES
(
'Lukas', 'lsimianer@gmail.com'
);

INSERT INTO events
 (
    vendorid, phone, city, state,  occasion, courses, consideration, size, alcohol, decor, comments, createdAt, updatedAt
 )
 VALUES 
 (
  12,'402-350-2259', 'austin', 'tx', 'party', '2', 'none', '50', true , false, 'I want wine, whiskey, and vodka only',now(),now()
 );


INSERT INTO user
(
name, email
)
VALUES
(
'Jess', 'jess@gmail.com'
);


 INSERT INTO events
 (
   vendorid, phone, city, state,  occasion, courses, consideration, size, alcohol, decor, comments, createdAt, updatedAt
 )
 VALUES 
 (
  11,'949-555-2284', 'seattle', 'wa', 'wedding', '4', 'kosher', '100', true , false, 'I would prefer a higher end champagne selection and wines.',now(),now()
 );


INSERT INTO user
(
name, email
)
VALUES
(
'sandy', 'fake@gmail.com'
);

 INSERT INTO events
 (
   vendorid, phone, city, state,  occasion, courses, consideration, size, alcohol, decor, comments, createdAt, updatedAt
 )
 VALUES 
 (
 01, '949-555-2857', 'omaha', 'ne', 'birthday', '2', 'halal', '1000', true , true, 'I would prefer flower  table settings. its my 50th birthday so yeah jkngeintinginirtningitngtintrniungrtiunrtiungtriungrtiungtingtringt',now(),now()
 );



INSERT INTO vendor
(
name, email, phone
)
VALUES
(
'The catercrew', 'cater@gmail.com', '111-255-8877'
);


-- pluralize this shit
select * from events;
select * from users;
select * from vendors;
--  new syntax


select * from events;
select * from user;

select distinct occasion, id from events where (id%2) = 0;
-- by size 
select * from events where size <= 1000;
select * from events where size <= 100;
select * from events where size <= 50;

-- by state and size
select * from events where state = "tx";
select * from events where state = "wa" and  size <= 500;

select * from events where state = "tx" and  size <= 500 and decor = false;

select * from events where state = "tx" and city = "austin" and size <= 500 and decor = false;

select * from events where state = "tx" and city = "austin" and size <= 500 and decor = false and consideration = "none";