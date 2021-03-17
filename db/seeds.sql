USE employees_db;

INSERT INTO department (name)
VALUES
('Executive'),
('Finance'),
('Sales'),
('Engineering'),
('IT');

INSERT INTO role (title, salary, department_id)
VALUES
('President', 200000, 1),
('Vice President', 150000, 1),
('Finance Manager', 90000, 2),
('Accountant', 70000, 2),
('Sales Manager', 90000, 3),
('Sales Associate', 60000, 3),
('Engineering Manager', 90000, 4),
('Senior Engineer', 75000, 4),
('Junior Engineer', 60000, 4),
('IT Manager', 80000, 5),
('IT Associate', 65000, 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
('Nick', 'Fury', 1),
('Pepper', 'Potts', 2),
('Natasha', 'Romanov', 3),
('Clint', 'Barton', 4),
('Steve', 'Rogers', 5),
('Bucky', 'Barnes', 6),
('Tony', 'Stark', 7),
('Bruce', 'Banner', 8),
('Peter', 'Parker', 9),
('Maria', 'Hill', 10),
('Phil', 'Coulson', 11);