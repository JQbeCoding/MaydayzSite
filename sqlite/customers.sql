--INSERT INTO customers (name, phoneNumber, email) 
--VALUES ('Ed', 7043033300, 'ebmay85@gmail.com');

--INSERT INTO customers (name, phoneNumber, email) 
--VALUES ('April', 7048910418, 'mylife8429@gmail.com');

-- Update phone numbers for specific IDs (make sure these IDs exist first)
UPDATE customers
SET phoneNumber = '+17049675408'
WHERE id = 1;

UPDATE customers
SET phoneNumber = '+17043033300'
WHERE id = 2;

UPDATE customers
SET phoneNumber = '+17048910418'
WHERE id = 3;


-- INSERT INTO customers (name, phoneNumber) VALUES 
--('Adreanna', '+17047461789'),
--('Aquanda', '+170428121'),
--('Artrice', '+9803789740'),
--('Asonie', '+9808993029'),
--('Patricia', '+17042588307'),
--('Bridgette', '+17046056417'),
--('Schenna', '+19804755909'),
--('Cole', '+17049150310'),
--('Nathdaniel', '+17046172546'),
--('Danny', '+17739324360'),
--('Ernest', '+17042588842'),
/*('J Boog', '+18646339230'),
('Jay', '+17044498350'),
('Jevon', '+19802642071'),
('Josh', '+17047433479'),
('Kenan', '+17048063045'),
('Ma', '+17047722089'),
('Montoya', '+17049652106'),
('Darlene', '+19803696563'),
('Shamicee', '+17042777224'),
('Tamiya', '+17049052350'),
('Tiny', '+17046497173'),
('Vent', '+17046060308'),
('Wanda', '+17047803377'),
('Kesha', '+17046847016'),
('Patrick', '+17049016859'),
('Bryan', '+19804155465');*/

/*INSERT INTO customers (name, phoneNumber) 
VALUES ('Taylor', '+17049495173');*/

/*(UPDATE customers 
SET phoneNumber ='7042812121'
WHERE id = 5;*/

UPDATE customers 
SET phoneNumber ='+17042812121'
WHERE id = 5;


UPDATE customers 
SET phoneNumber ='+19803789740'
WHERE id = 6;


UPDATE customers 
SET phoneNumber ='+19808993029'
WHERE id = 7;

DELETE FROM customers WHERE id BETWEEN 32 AND 38;

SELECT * FROM customers;