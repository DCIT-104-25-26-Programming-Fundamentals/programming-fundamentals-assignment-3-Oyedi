// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 8
// =============================================================================
//
// TASK: Student Record Management System
//
// Build a console-based program that stores and manages student information.
// Each student is represented as a JavaScript object containing:
//
//   - name   : the student's full name  (string)
//   - id     : a unique student ID number (number, e.g. 20240001)
//   - scores : an array of scores from multiple assessments (e.g. [75, 88, 90])
//
// Example object:
//   { name: "Alice Mensah", id: 20240001, scores: [78, 85, 90] }
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_08_student_records.js
//
// -----------------------------------------------------------------------------
// FEATURES YOUR PROGRAM MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Add a Student
//      - Ask the user to enter the student's name and ID.
//      - Ask how many scores to enter, then collect each score one by one.
//      - Save the student object and confirm it was added.
//
//   2. Display All Students
//      - Print a formatted table showing every student's:
//          Name, ID, individual scores, and their average score.
//      - If no students have been added yet, print a message saying so.
//
//   3. Calculate Average Score for a Specific Student
//      - Ask the user to enter a student ID.
//      - Find the student and print their average score.
//      - If the ID is not found, print an error message.
//
//   4. Quit
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ================================
//      STUDENT RECORD SYSTEM MENU
//   ================================
//   1. Add student
//   2. Display all students
//   3. Calculate average score
//   4. Quit
//   Enter your choice (1-4):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Enter your choice (1-4): 1
//   Student name: Alice Mensah
//   Student ID: 20240001
//   How many scores? 3
//   Enter score 1: 78
//   Enter score 2: 85
//   Enter score 3: 90
//   Student "Alice Mensah" added successfully.
//
//   Enter your choice (1-4): 3
//   Enter student ID: 20240001
//   Alice Mensah's average score: 84.33
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Store all student records in an array of objects.
// - Average scores must be displayed to 2 decimal places (use .toFixed(2)).
// - Each feature MUST be in its own function (see scaffold below).
// - Handle invalid menu choices and missing student IDs gracefully.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
const readlineSync = require('readline-sync');

/**
 * Calculates the average score for an array of numbers.
 * @param {number[]} scores - Array of numerical scores.
 * @returns {number} The average score.
 */
function calculateAverageScore(scores) {
  if (scores.length === 0) return 0;
  let sum = 0;
  for (let i = 0; i < scores.length; i++) {
    sum += scores[i];
  }
  return sum / scores.length;
}

/**
 * Prompts the user for details and adds a new student object to the records.
 * @param {Object[]} students - Array of student objects.
 */
function addStudent(students) {
  const name = readlineSync.question("Student name: ").trim();
  if (name === "") {
    console.log("Error: Student name cannot be empty.");
    return;
  }

  const idInput = readlineSync.question("Student ID: ");
  const id = parseInt(idInput, 10);
  if (isNaN(id) || id <= 0) {
    console.log("Error: Student ID must be a valid positive integer.");
    return;
  }

  // Ensure unique ID
  const exists = students.some(s => s.id === id);
  if (exists) {
    console.log(`Error: A student with ID ${id} already exists.`);
    return;
  }

  const scoreCountInput = readlineSync.question("How many scores? ");
  const scoreCount = parseInt(scoreCountInput, 10);
  if (isNaN(scoreCount) || scoreCount <= 0) {
    console.log("Error: Number of scores must be a positive integer.");
    return;
  }

  const scores = [];
  for (let i = 1; i <= scoreCount; i++) {
    const scoreInput = readlineSync.question(`Enter score ${i}: `);
    const score = parseFloat(scoreInput);
    if (isNaN(score) || score < 0 || score > 100) {
      console.log("Error: Score must be a valid number between 0 and 100.");
      return;
    }
    scores.push(score);
  }

  const newStudent = {
    name: name,
    id: id,
    scores: scores
  };

  students.push(newStudent);
  console.log(`Student "${name}" added successfully.`);
}

/**
 * Displays all student records along with their individual and average scores.
 * @param {Object[]} students - Array of student objects.
 */
function displayAllStudents(students) {
  if (students.length === 0) {
    console.log("No student records available.");
    return;
  }

  console.log("\n--------------------------------------------------------------------------------");
  console.log(`${"ID".padEnd(12)} | ${"Name".padEnd(20)} | ${"Scores".padEnd(20)} | ${"Average"}`);
  console.log("--------------------------------------------------------------------------------");

  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const avg = calculateAverageScore(student.scores).toFixed(2);
    const scoresStr = student.scores.join(", ");

    console.log(
      `${String(student.id).padEnd(12)} | ${student.name.padEnd(20)} | ${scoresStr.padEnd(20)} | ${avg}`
    );
  }
  console.log("--------------------------------------------------------------------------------");
}

/**
 * Calculates and prints the average score for a student specified by ID.
 * @param {Object[]} students - Array of student objects.
 */
function calculateSpecificAverage(students) {
  if (students.length === 0) {
    console.log("No student records available.");
    return;
  }

  const idInput = readlineSync.question("Enter student ID: ");
  const id = parseInt(idInput, 10);

  if (isNaN(id)) {
    console.log("Error: Invalid ID format.");
    return;
  }

  let foundStudent = null;
  for (let i = 0; i < students.length; i++) {
    if (students[i].id === id) {
      foundStudent = students[i];
      break;
    }
  }

  if (foundStudent) {
    const avg = calculateAverageScore(foundStudent.scores).toFixed(2);
    console.log(`${foundStudent.name}'s average score: ${avg}`);
  } else {
    console.log(`Error: Student with ID ${id} not found.`);
  }
}

/**
 * Main application loop.
 */
function main() {
  const students = [];
  let running = true;

  while (running) {
    console.log("\n================================");
    console.log("   STUDENT RECORD SYSTEM MENU   ");
    console.log("================================");
    console.log("1. Add student");
    console.log("2. Display all students");
    console.log("3. Calculate average score");
    console.log("4. Quit");

    const choice = readlineSync.question("Enter your choice (1-4): ").trim();

    switch (choice) {
      case '1':
        addStudent(students);
        break;
      case '2':
        displayAllStudents(students);
        break;
      case '3':
        calculateSpecificAverage(students);
        break;
      case '4':
        console.log("Goodbye!");
        running = false;
        break;
      default:
        console.log("Invalid option. Please enter a choice between 1 and 4.");
        break;
    }
  }
}

// Run the application
main();
// =============================================================================


