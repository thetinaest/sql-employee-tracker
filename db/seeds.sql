USE emp_tracker;
INSERT INTO departments
    (department_name)
VALUES
    ('Management'),
    ('Engineering'),
    ('Finance');

INSERT INTO roles
    (title, salary, department_id)
VALUES
    ('Manager', 150000, 1),
    ('Developer', 75000, 2),
    ('Software Engineer', 120000, 2),
    ('Accountant', 95000, 3),
    ('Intern', 50000, 2);

INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Mike', 'Chan', 1, NULL),
    ('Ashley', 'Rodriquez', 1, NULL),
    ('Kevin', 'Tupik', 2, 2),
    ('Kunal', 'Singh', 4, 1),
    ('Malia', 'Brown', 5, 2),
    ('Sarah', 'Lourd', 4, 1),
    ('Tom', 'Allen', 3, 2);


