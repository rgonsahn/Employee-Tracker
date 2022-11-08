const db = require("./config/connection");
const inquirer = require("inquirer")

function mainMenu() {
    inquirer.prompt({
        type: "list",
        name: "direction",
        message: "Select your action from the list below.",
        choices: [
            "view departments",
            "view roles",
            "view employees",
            "view company",
            "add department",
            "add new role",
            "add new employee"

        ]
    }).then(({ direction }) => {
        if (direction === "view departments") {
            viewDepartments()

        } else if (direction === "view roles") {
            viewRoles()
        }
        else if (direction === "view employees") {
            viewEmployees()
        }
        else if (direction === "view company") {
            viewCompany()
        } else if (direction === "add department") {
            addDepartment()
        } else if (direction === "add new role") {
            addRole()
        } else if (direction === "add new employee") {
            addEmployee()
        }
    })
}
function viewDepartments() {
    db.promise().query("SELECT department.dept_name AS name FROM department").then(([response]) => {
        console.table(response)
        mainMenu()
    })
}
function viewRoles() {
    db.promise().query("SELECT role.title, role.salary, department.dept_name AS department FROM role LEFT JOIN department on role.dept_id = department.id").then(([response]) => {
        console.table(response)
        mainMenu()
    })
}
function viewEmployees() {
    db.promise().query("SELECT * FROM employee").then(([response]) => {
        console.table(response)
        mainMenu()
    })
}
function viewCompany() {
    db.promise().query("SELECT * FROM employee").then(([response]) => {
        console.table(response)
        mainMenu()
    })
}
function addDepartment() {
    inquirer.prompt({
        type: "input",
        name: "department",
        message: "Please enter the new department name."
    }).then(answer => {
        var departmentObj = {
            dept_name: answer.department
        }
        db.promise().query("INSERT INTO department SET ?", departmentObj).then(([response]) => {
            if (response.affectedRows === 1) {
                viewDepartments()
            } else {
                console.info("department creation failed!")
            }

        })
    })
}
async function addRole() {
    // db.query("SELECT role.title AS Title, role.salary AS Salary FROM role",   function(err, res) 
    const [departments] = await db.promise().query("SELECT * FROM department")
    const departmentArray = departments.map(department => (
        {
            name: department.dept_name,
            value: department.id
        }
    ))
    console.log(departments)












    inquirer.prompt([
        {
            type: "input",
            name: "role",
            message: "Please enter your role."
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of this role?(enter a number)"
        },
        {
            type: "list",
            name: "id",
            message: "Select the department",
            choices: departmentArray
        }
    ]).then(answer => {
        console.log(answer)
        var roleObj = {
            title: answer.role,
            salary: answer.salary,
            dept_id: answer.id
        }
        db.promise().query("INSERT INTO role SET ?", roleObj).then(([response]) => {
            if (response.affectedRows === 1) {
                viewRoles()
            } else {
                console.info("err")
            }

        })
    })
}
async function addEmployee() {
    const [roles] = await db.promise().query("SELECT * FROM role")
    const roleArray = roles.map(role => (
        {
            name: role.title,
            value: role.id
        }
    ))
    const [managers] = await db.promise().query("SELECT * FROM employee")
    const managersArray = managers.map(manager => (
        {
            name: manager.first_name+" "+manager.last_name,
            value: manager.manager_id
        }
    ))
    inquirer.prompt([{
        type: "input",
        name: "first",
        message: "Please enter the name of the new employee."
    },
    {
        type: "input",
        name: "last",
        message: "Please enter the employee's last name"
    }, {
        type: "list",
        name: "id",
        message: "Please select the employee's role",
        choices: roleArray
    },{
        type: "list",
        name: "manager_id",
        message: "Please select the manager",
        choices: managersArray

    }]).then(answer => {
        var employeeObj = {
            first_name: answer.first,
            last_name: answer.last,
            role_id: answer.id,
            manager_id:answer.manager_id

        }
        db.promise().query("INSERT INTO employee SET ?", employeeObj).then(([response]) => {
            if (response.affectedRows === 1) {
                viewEmployees()
            } else {
                console.info("err")
            }

        })
    })
}
async function updateEmployee(){
    const [employees] = await db.promise().query("SELECT * FROM employee")
    const roleArray = roles.map(role => (
        {
            name: role.title,
            value: role.id
        }
    ))
}

mainMenu()