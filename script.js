// const members = [
//     {first_name:"John", last_name: "Doe", email:"johndoe@example.com", birthdate:"1999-12-31", salary:80000},
//     {first_name:"Jane", last_name: "Smith", email:"janesmith@example.com", birthdate:"2015-09-01", salary:75000}
// ]; // array of objects



// //OLD WAY DEMO - CONSTRUCTOR FUNCTION
// function Employee(firstName, lastName, email, birthdate, salary) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.email = email;
//     this.birthdate = birthdate;
//     this.salary = salary;
//   }

//   Employee.addEmployee = function(firstName, lastName, email, birthdate, salary) {
//     return new Employee(firstName, lastName, email, birthdate, salary);
//   };

//   Employee.prototype.editEmployee = function(updates) {
//     Object.assign(this, updates);
//   };

//   // Usage example:
//   const bill = Employee.addEmployee("Bill", "Doe", "bill@example.com", "1990-01-01", 50000);
//   console.log(bill);

//   bill.editEmployee({ salary: 7777777, email: "xxxxxxx@example.com" });
//   console.log(bill);


//ES6 way - CLASSES - Create a new Employee class that adds a new employee and console logs them
// Goals:
// 1. Create a new Employee class with a constructor for Employee giving them a firstname, lastname, email, and birthdate

class Employee {
  constructor(firstname, lastname, email, birthdate) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.birthdate = birthdate;
  }

  // get employee
  getEmployee() {
    return {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      birthdate: this.birthdate
    };
  }

  // add employee (static)
 static addEmployee(firstname, lastname, email, birthdate){
    const newEmployee = new Employee(firstname, lastname, email, birthdate);
    return newEmployee;
  }

  // edit employee
  editEmployee(updatedDetails) {
    this.firstname = updatedDetails.firstname || this.firstname; // if updated is null, leave it as is
    this.lastname = updatedDetails.lastname || this.lastname;
    this.email = updatedDetails.email || this.email;
    this.birthdate = updatedDetails.birthdate || this.birthdate;
  }
}

// 2. Instantiate (i.e. create a new instance) of an Employee with your info and save it to a const with your first name
const aayushi = new Employee("Aayushi", "Dumka", "aayushi@gmail.com", "2004-06-29");

// 3. After step 2, console log your const and then try to console.log parts of the object
console.log(aayushi);
console.log(aayushi.firstname);

// 4. Then create a const array that creates many "new Employee" objects and says to an array.  Console this object as a whole and parts of it
const employees = [
  new Employee("Aayushi", "Dumka", "aayushi@gmail.com", "2004-06-29"),
  new Employee("Noah", "Kahan", "noah@gmail.com", "1990-09-15"),
  new Employee("Dominic", "Fike", "dominic@gmail.com", "1993-04-21")
];

console.log(employees);
console.log(employees[1].lastname);
console.log(employees[2].birthdate);

// 5. Add methods to your class to "getEmployees" which just returns all the fields in the object.
//    Also add methods to addEmployee (this will be static) and a method to editEmployee
//    Test your methods using JS

// testing the get employee
console.log(aayushi.getEmployee()); // gets all fields in the aayushi object

// testing the add employee
let addEmployeesTest = [];
let clint = Employee.addEmployee("Clint", "Tuttle", "clint@gmail.com", "1990-01-01") // creates new instance of the object
console.log(clint);
addEmployeesTest.push(clint);
console.log(addEmployeesTest);
addEmployeesTest.push(Employee.addEmployee("Jane", "Doe", "jane@gmail.com", "2000-01-01"))
console.log(addEmployeesTest);

const employeesArray = [
  Employee.addEmployee("Clint", "Tuttle", "clint@gmail.com", "1990-01-01"), // creates new instance of the object
  Employee.addEmployee("Jane", "Doe", "jane@gmail.com", "2000-01-01")
];
console.log(employeesArray);
console.log(employeesArray[1].firstname);

// testing the edit employee
console.log(employeesArray[0].email);
employeesArray[0].editEmployee({email: "tuttle@gmail.com"});
console.log(employeesArray[0].email);

// 6. Try to get instances of your class object to display in the table.  You can set the innerhtml of the
//    of the table to be empty and then replace it with the looped-through values of your object

//get the table from the dom
const tableBody = document.querySelector("#employeeTable tbody"); // selects tbody based on ID
tableBody.innerHTML = ""; // Clear existing rows in the table

// Populate the table
employees.forEach(employee => {
  const details = employee.getEmployee();
  console.log(details) ;

  // Create a new row
  const row = document.createElement("tr");
  row.innerHTML = `
  <td>${details.firstname}</td>
  <td>${details.lastname}</td>
  <td>${details.email}</td>
  <td>${details.birthdate}</td>
`;
// Append the row to the table
tableBody.appendChild(row);

});


//Try to output 3 instances of your class object into the table

//////////////////////////
// CALLBACKS CHALLENGE

function sendInvoice(clientName, callback) {
  console.log(`Sending invoice...`);
  setTimeout(() => {
    callback(`Email sent to ${clientName}`);
  }, 1500); // Simulate 1.5-sec processing time
}

// Usage
sendInvoice("aayushi@gmail.com", (confirmation) => {
  console.log('Success:', confirmation); 
});

//////////////////////////
// PROMISES CHALLENGE

function verifyPayment(orderTotal){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      orderTotal < 5000 ? resolve(`Order of $${orderTotal} was accepted `) :
                          reject(`Order of $${orderTotal} requires manager approval`);

    }, 1500);
  })
}

// Usage
verifyPayment(3000)
  .then(console.log)
  .catch(console.error);

verifyPayment(6000)
.then(console.log)
.catch(console.error);

//////////////////////////
// ASYNC/AWAIT CHALLENGE

async function processRefund(requestId) {
  // Simulate refund verification (1 second)
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Refund verification complete for request #${requestId}`);
    
    // Simulate payment reversal (2 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(`Payment reversal complete for request #${requestId}`);
  
    // Return final message
    console.log(`Refund complete for request #${requestId}`);
  }
  catch (error) {
    console.log(`Error processing refund for request #${requestId}`);
  }
}
// USAGE
processRefund(12345) // console log outputs "Payment reversal complete for request #12345" only


// async function processRefund(requestId) {
//   try {
//     // Simulates 1-sec refund verification
//     console.log(`Verifying refund request #${requestId}...`);
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     // Simulates 2-sec payment reversal
//     console.log(`Reversing payment for request #${requestId}...`);
//     await new Promise(resolve => setTimeout(resolve, 2000)); // 2-sec payment reversal
//     // Returns "Refund complete for request #X"
//     console.log(`Refund complete for request #${requestId}`);
//   } catch (error) {
//     console.log(`Error processing refund for request #${requestId}`);
//   }
// }
// processRefund("12345");

// async function main() {
//   const result = await processRefund(12345);
//   console.log(result);  // Now it logs the final result after all async operations complete
// }
// main(); // console log outputs ""Payment reversal complete ..." AND "refund complete for ..."

