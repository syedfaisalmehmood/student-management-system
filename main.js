#! /usr/bin/env node
import inquirer from "inquirer";
//Define the student class
class student {
    static counter = 10001;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 5000;
    }
    //method to enroll a student in a class
    enroll_course(course) {
        this.courses.push(course);
    }
    //Method to view the student balance
    view_balance() {
        console.log(`Balance of ${this.name} is: $${this.balance}`);
    }
    //method to pay student fees
    pay_Fees(fee_Amount) {
        this.balance -= fee_Amount;
        if (fee_Amount <= this.balance) {
            console.log(`$${fee_Amount} Fees paid sucessfully for ${this.name}`);
            console.log(`Remaining balance : $${this.balance}`);
        }
        else {
            console.log("You have insufficient Balance in your Wallet.");
        }
    }
    //method to display student status
    show_status() {
        console.log(`ID:        ${this.id}`);
        console.log(`Name:      ${this.name}`);
        console.log(`Courses:   ${this.courses}`);
        console.log(`Balance:   ${this.balance}`);
    }
}
// Assigning a student manager class to manage students;
class student_manager {
    students;
    constructor() {
        this.students = [];
    }
    //method to add a new student
    add_student(name) {
        let studnt = new student(name);
        this.students.push(studnt);
        console.log(`Student: ${name} added sucessfully. Student ID: ${studnt.id}.`);
    }
    //Method to enroll a student in a course;
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`${student.name} Sucessfully Enrolled in ${course}. `);
        }
    }
    //method to view a student balance
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log("Student not found. Please enter a correct Student ID.");
        }
    }
    //method to pay student fees;
    pay_studentfees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_Fees(amount);
        }
        else {
            console.log("Student not found. Please enter a correct Student ID.");
        }
    }
    //method to display student status
    show_studentstatus(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
    //method to find a student by student id;
    find_student(student_id) {
        return this.students.find((std) => std.id === student_id);
    }
}
// Main function to run the Student Managment System Program;
async function main() {
    console.log("\n");
    console.log("=".repeat(86));
    console.log("\t\t\tWelcome to Student Management System");
    console.log("=".repeat(86));
    let student_managr = new student_manager();
    //while loop to keep program running;
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an Option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit",
                ],
            },
        ]);
        //using switch case to handle user choice
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student Name",
                    },
                ]);
                student_managr.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a Course Name",
                    },
                ]);
                student_managr.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                ]);
                student_managr.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fees":
                let Fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter your Fee Amount",
                    },
                ]);
                student_managr.pay_studentfees(Fees_input.student_id, Fees_input.amount);
                break;
            case "Show Status":
                let student_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                ]);
                student_managr.show_studentstatus(student_input.student_id);
                break;
            case "Exit":
                console.log("Thank You for using this Application. Good Bye....!");
                process.exit();
        }
    }
}
//Calling a main function
main();
