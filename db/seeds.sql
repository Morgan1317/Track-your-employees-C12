INSERT INTO department(department_name)
VALUES
('Engineering'),
('Finance'),
('Legal'),
('Sales');

INSERT INTO roles(title, salary, department_id)
VALUES 
('Sales Lead', 100000, 4),
('Sales Person', 80000, 4),
('Lead Engineer', 150000, 1),
('Software Engineer',120000, 1),
('Account Manager',160000, 2),
('Accountant', 125000, 2),
('Legal Team Lead',250000, 3),
('Lawyer', 125000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Tom', 'Cruise',1,NULL),
('Shirley', 'Temple',2,1),
('Iowa', 'Davis',3,NULL),
('Pam', 'Crowley',4,3),
('Susan', 'Myers',7,NULL);
