USE employee_db; 
INSERT INTO department(dept_name)VALUES("Neurology"),("ICU"),("Emergency");
INSERT INTO role(title,salary,dept_id)VALUES("doctor",100000,1),("surgeon",300000,2),("nurse",65000,3);
INSERT INTO employee(first_name,last_name,role_id,manager_id)VALUES("Charles","Scott",1,null),("Mary","Wright",2,1),("Robina","Collins",3,1)


