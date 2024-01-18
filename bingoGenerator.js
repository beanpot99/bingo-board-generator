function generateBingoBoard() {
    let board = Array.from({ length: 5 }, () => new Array(5).fill(''));
    board[2][2] = 'Free'; // Free space in the center

    // Define the numbers for each column based on their calling order
    const columnNumbers = [
        [7, 36, 69], // Column 1 numbers
        [12, 41, 74], // Column 2 numbers
        [19, 52, 22], // Column 3 numbers
        [23, 58],     // Column 4 numbers, 45 will be added later
        [31, 63]      // Column 5 numbers
    ];

    // Randomly place a subset of the columnNumbers in their respective columns
    columnNumbers.forEach((numbers, columnIndex) => {
        // Randomly decide how many numbers to place in this column (0 to 2)
        let numberOfNumbersToPlace = Math.floor(Math.random() * 3);

        // Shuffle and pick the subset
        let shuffledNumbers = [...numbers].sort(() => 0.5 - Math.random());
        let selectedNumbers = shuffledNumbers.slice(0, numberOfNumbersToPlace);

        selectedNumbers.forEach(number => {
            let row;
            do {
                row = Math.floor(Math.random() * 5);
            } while (board[row][columnIndex] !== '' || (row === 2 && columnIndex === 2));
            board[row][columnIndex] = number;
        });
    });

    // Place the winning number (45) in the 4th column
    let winningRow;
    do {
        winningRow = Math.floor(Math.random() * 5);
    } while (board[winningRow][3] !== '' || winningRow === 2);
    board[winningRow][3] = 45;

    // Fill the rest of the board with random numbers
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (board[i][j] === '') {
                let randomNum;
                do {
                    randomNum = Math.floor(Math.random() * 99) + 1;
                } while (board.some(row => row.includes(randomNum)) || columnNumbers.flat().includes(randomNum) || randomNum === 45);
                board[i][j] = randomNum;
            }
        }
    }

    return board;
}



function containsBingo(board) {
    // Check rows and columns for bingo
    for (let i = 0; i < 5; i++) {
        if (board[i].every(val => val === 'X') || board.map(row => row[i]).every(val => val === 'X')) {
            return true;
        }
    }

    // Check diagonals for bingo
    if (Array.from({ length: 5 }, (_, i) => i).every(i => board[i][i] === 'X') ||
        Array.from({ length: 5 }, (_, i) => i).every(i => board[i][4 - i] === 'X')) {
        return true;
    }

    return false;
}

function isValidBoard(board, calledNumbers, winningNumber) {
    let markedBoard = board.map(row => row.map(cell =>
        calledNumbers.includes(cell) || cell === 'Free' ? 'X' : cell));

    if (containsBingo(markedBoard)) {
        return false;
    }

    markedBoard = markedBoard.map(row => row.map(cell =>
        cell === winningNumber ? 'X' : cell));

    return containsBingo(markedBoard);
}

function createBingoBoards(numBoards, calledNumbers, winningNumber) {
    let boards = [];
    while (boards.length < numBoards) {
        let newBoard = generateBingoBoard(calledNumbers, winningNumber);
        if (isValidBoard(newBoard, calledNumbers, winningNumber)) {
            boards.push(newBoard);
        }
    }
    return boards;
}

function transposeBoard(boardB) {
    let boardA = [];
    for (let i = 0; i < boardB.length; i++) {
        let row = [];
        for (let j = 0; j < boardB[i].length; j++) {
            row.push(boardB[j][i]);
        }
        boardA.push(row);
    }
    return boardA;
}

const calledNumbers = [7, 12, 19, 23,
    31, 36, 41, 52, 58, 63, 69, 74, 22];
const winningNumber = 45;
const numberOfBoards = 30;

let bingoBoards = createBingoBoards(numberOfBoards, calledNumbers, winningNumber);
let transposedBoards = bingoBoards.map(board => transposeBoard(board));
console.log('[');
transposedBoards.forEach((board, index) => {
    console.log(board, ",");
});
console.log(']');
