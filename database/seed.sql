USE emptrack_db;

INSERT INTO department (name) VALUES ('Sales');
INSERT INTO department (name) VALUES ('Engineering');
INSERT INTO department (name) VALUES ('Finance');
INSERT INTO department (name) VALUES ('Legal');

INSERT INTO role (title, salary, department_id) VALUES ('Sales Lead', 100000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Salesperson', 60000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Lead Engineer', 150000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Software Engineer', 120000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Account Manager', 160000, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Accountant', 125000, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Legal Team Lead', 250000, 4);
INSERT INTO role (title, salary, department_id) VALUES ('Lawyer', 180000, 4);

INSERT INTO employee 
	(first_name, last_name, role_id, manager_id)
VALUES
	('John', 'Jones', 1, NULL),
    ('David', 'Ming', 2, 1),
    ('Mary', 'Diaz', 3, NULL),
    ('Kelly', 'Donnell', 4, 2),
    ('Marg', 'Jonah', 5, NULL),
    ('Mike', 'Brown', 6, 3),
    ('Sue', 'Born', 7, NULL),
    ('April', 'Storm', 8, 4)
    