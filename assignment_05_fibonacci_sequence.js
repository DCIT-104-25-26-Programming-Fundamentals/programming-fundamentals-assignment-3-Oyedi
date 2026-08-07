// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 5
// =============================================================================
//
// TASK: Fibonacci Sequence Generator
//
// The Fibonacci sequence is a series of numbers where each number is the sum
// of the two numbers before it:
//
//   0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
//
// Write a JavaScript program with TWO parts, each implemented as a function.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_05_fibonacci_sequence.js
//
// -----------------------------------------------------------------------------
// PART A — Print the First N Terms
// -----------------------------------------------------------------------------
// - Ask the user how many terms (N) to display.
// - Print the first N numbers of the Fibonacci sequence on one line.
//
// Example:
//   How many terms? 7
//   Fibonacci sequence: 0 1 1 2 3 5 8
//
// -----------------------------------------------------------------------------
// PART B — Check if a Number Belongs to the Sequence
// -----------------------------------------------------------------------------
// - Ask the user to enter a number.
// - Determine whether that number is a Fibonacci number.
// - Print an appropriate message.
//
// Example:
//   Enter a number to check: 13
//   13 is a Fibonacci number.
//
//   Enter a number to check: 20
//   20 is NOT a Fibonacci number.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use a loop (not recursion) to generate the sequence in both parts.
// - N must be a positive integer. If it is not, print an error message.
// - Each part must be implemented in its own function (see scaffold below).
//

//
// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
const readlineSync = require('readline-sync');

/**
 * Generates and displays the first N terms of the Fibonacci sequence.
 * @param {number} n - The number of terms to generate.
 */
function printFibonacciSequence(n) {
  if (n <= 0) {
    console.log("Error: Number of terms must be a positive integer.");
    return;
  }

  const terms = [];
  let a = 0;
  let b = 1;

  for (let i = 0; i < n; i++) {
    terms.push(a);
    const nextTerm = a + b;
    a = b;
    b = nextTerm;
  }

  console.log(`Fibonacci sequence: ${terms.join(' ')}`);
}

/**
 * Checks whether a given number belongs to the Fibonacci sequence.
 * @param {number} num - The number to check.
 * @returns {boolean} True if the number is in the sequence, false otherwise.
 */
function isFibonacci(num) {
  if (num < 0) return false;

  let a = 0;
  let b = 1;

  while (a < num) {
    const nextTerm = a + b;
    a = b;
    b = nextTerm;
  }

  return a === num;
}

/**
 * Main function to handle user prompts and program flow.
 */
function main() {
  console.log("--- PART A: Print the First N Terms ---");
  const countInput = readlineSync.question("How many terms? ");
  const n = parseInt(countInput, 10);

  if (isNaN(n) || n <= 0) {
    console.log("Error: N must be a positive integer.");
  } else {
    printFibonacciSequence(n);
  }

  console.log("\n--- PART B: Check if a Number Belongs to the Sequence ---");
  const checkInput = readlineSync.question("Enter a number to check: ");
  const targetNumber = parseInt(checkInput, 10);

  if (isNaN(targetNumber) || targetNumber < 0) {
    console.log("Error: Please enter a non-negative integer.");
  } else {
    if (isFibonacci(targetNumber)) {
      console.log(`${targetNumber} is a Fibonacci number.`);
    } else {
      console.log(`${targetNumber} is NOT a Fibonacci number.`);
    }
  }
}

// Run the program
main();
// =============================================================================


