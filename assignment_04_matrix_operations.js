// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
const readlineSync = require('readline-sync');

/**
 * Reads an M x N matrix from user input line by line.
 * @param {number} rows - Number of rows.
 * @param {number} cols - Number of columns.
 * @returns {number[][]} The constructed matrix.
 */
function readMatrix(rows, cols) {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    let rowInput = readlineSync.question(`Enter row ${i + 1}: `);
    let row = rowInput.trim().split(/\s+/).map(Number);

    // Input validation for correct number of elements in row
    while (row.length !== cols || row.some(isNaN)) {
      console.log(`Error: Please enter exactly ${cols} valid numbers separated by spaces.`);
      rowInput = readlineSync.question(`Enter row ${i + 1}: `);
      row = rowInput.trim().split(/\s+/).map(Number);
    }

    matrix.push(row);
  }
  return matrix;
}

/**
 * Prints a matrix in a neat, aligned grid format.
 * @param {number[][]} matrix - The matrix to display.
 */
function printMatrix(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    const formattedRow = matrix[i]
      .map(num => String(num).padStart(5, ' '))
      .join(' ');
    console.log(formattedRow);
  }
}

// =============================================================================
// PART A — Transpose Matrix
// =============================================================================

/**
 * Computes the transpose of a given matrix (swaps rows and columns).
 * @param {number[][]} matrix - An M x N matrix.
 * @returns {number[][]} An N x M matrix representing the transpose.
 */
function transposeMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const transposed = [];

  for (let j = 0; j < cols; j++) {
    const newRow = [];
    for (let i = 0; i < rows; i++) {
      newRow.push(matrix[i][j]);
    }
    transposed.push(newRow);
  }

  return transposed;
}

// =============================================================================
// PART B — Add Two Matrices
// =============================================================================

/**
 * Computes the element-wise sum of two matrices of the same dimensions.
 * @param {number[][]} matrixA - An M x N matrix.
 * @param {number[][]} matrixB - An M x N matrix.
 * @returns {number[][]} An M x N sum matrix.
 */
function addMatrices(matrixA, matrixB) {
  const rows = matrixA.length;
  const cols = matrixA[0].length;
  const sumMatrix = [];

  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(matrixA[i][j] + matrixB[i][j]);
    }
    sumMatrix.push(row);
  }

  return sumMatrix;
}

// =============================================================================
// PART C — Multiply Two Matrices
// =============================================================================

/**
 * Computes the product of two matrices A (M x N) and B (N x P).
 * @param {number[][]} matrixA - An M x N matrix.
 * @param {number[][]} matrixB - An N x P matrix.
 * @returns {number[][]} An M x P product matrix.
 */
function multiplyMatrices(matrixA, matrixB) {
  const rowsA = matrixA.length;
  const colsA = matrixA[0].length; // Must equal rowsB
  const colsB = matrixB[0].length;
  const productMatrix = [];

  for (let i = 0; i < rowsA; i++) {
    const row = [];
    for (let j = 0; j < colsB; j++) {
      let sum = 0;
      for (let k = 0; k < colsA; k++) {
        sum += matrixA[i][k] * matrixB[k][j];
      }
      row.push(sum);
    }
    productMatrix.push(row);
  }

  return productMatrix;
}

// =============================================================================
// MAIN PROGRAM EXECUTION
// =============================================================================

function main() {
  console.log("=========================================");
  console.log("       MATRIX OPERATIONS PROGRAM         ");
  console.log("=========================================\n");

  console.log("Select an operation:");
  console.log("1. Transpose a Matrix");
  console.log("2. Add Two Matrices");
  console.log("3. Multiply Two Matrices");
  
  const choice = readlineSync.question("\nEnter choice (1-3): ").trim();

  if (choice === '1') {
    console.log("\n--- PART A: Transpose a Matrix ---");
    const rows = parseInt(readlineSync.question("Enter number of rows: "), 10);
    const cols = parseInt(readlineSync.question("Enter number of columns: "), 10);

    if (isNaN(rows) || isNaN(cols) || rows <= 0 || cols <= 0) {
      console.log("Error: Dimensions must be positive integers.");
      return;
    }

    const matrix = readMatrix(rows, cols);

    console.log("\nOriginal Matrix:");
    printMatrix(matrix);

    const transposed = transposeMatrix(matrix);
    console.log("\nTransposed Matrix:");
    printMatrix(transposed);

  } else if (choice === '2') {
    console.log("\n--- PART B: Add Two Matrices ---");
    const rows = parseInt(readlineSync.question("Enter number of rows: "), 10);
    const cols = parseInt(readlineSync.question("Enter number of columns: "), 10);

    if (isNaN(rows) || isNaN(cols) || rows <= 0 || cols <= 0) {
      console.log("Error: Dimensions must be positive integers.");
      return;
    }

    console.log("\nMatrix A:");
    const matrixA = readMatrix(rows, cols);

    console.log("\nMatrix B:");
    const matrixB = readMatrix(rows, cols);

    const sumMatrix = addMatrices(matrixA, matrixB);

    console.log("\nResult (A + B):");
    printMatrix(sumMatrix);

  } else if (choice === '3') {
    console.log("\n--- PART C: Multiply Two Matrices ---");
    const rowsA = parseInt(readlineSync.question("Enter number of rows for Matrix A: "), 10);
    const colsA = parseInt(readlineSync.question("Enter number of columns for Matrix A: "), 10);

    const rowsB = parseInt(readlineSync.question("Enter number of rows for Matrix B: "), 10);
    const colsB = parseInt(readlineSync.question("Enter number of columns for Matrix B: "), 10);

    if (isNaN(rowsA) || isNaN(colsA) || isNaN(rowsB) || isNaN(colsB) || rowsA <= 0 || colsA <= 0 || rowsB <= 0 || colsB <= 0) {
      console.log("Error: Dimensions must be positive integers.");
      return;
    }

    if (colsA !== rowsB) {
      console.log(`Error: Cannot multiply matrix of size ${rowsA}x${colsA} with ${rowsB}x${colsB}.`);
      console.log("Number of columns in A must match number of rows in B.");
      return;
    }

    console.log("\nMatrix A:");
    const matrixA = readMatrix(rowsA, colsA);

    console.log("\nMatrix B:");
    const matrixB = readMatrix(rowsB, colsB);

    const productMatrix = multiplyMatrices(matrixA, matrixB);

    console.log("\nResult (A x B):");
    printMatrix(productMatrix);

  } else {
    console.log("Invalid choice. Program terminated.");
  }
}

// Run the main program
main();
// =============================================================================

