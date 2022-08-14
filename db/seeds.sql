INSERT INTO department(department_name)
VALUES
('HR'),
('Admissions'),
('Diagnostics'),
('Finance Department'),
('Services');

INSERT INTO roles(title, salary, department_id)
VALUES 
('Manager', 65000, 1),
('Receptionist', 38000, 2),
('X-ray Tech', 40000, 3),
('Recruiter',40000, 1),
('Accountant',80000, 4),
('Director', 90000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Tom', 'Cruise',2,1),
('Shirley', 'Temple',1,1),
('Iowa', 'Davis',3,3),
('Pam', 'Crowley',5,4),
('Susan', 'Myers',4,2);
