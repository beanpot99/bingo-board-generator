function generateBingoBoard() {
    let board = [];
    for (let i = 0; i < 5; i++) {
        let row = [];
        for (let j = 0; j < 5; j++) {
            if (i === 2 && j === 2) {
                row.push('Free');
                continue;
            }
            let num;
            do {
                num = Math.floor(Math.random() * 99) + 1;
            } while (row.includes(num) || board.flat().includes(num));
            row.push(num);
        }
        board.push(row);
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
    if ([0, 1, 2, 3, 4].every(i => board[i][i] === 'X') || [0, 1, 2, 3, 4].every(i => board[i][4 - i] === 'X')) {
        return true;
    }

    return false;
}

function isValidBoard(board, calledNumbers, winningNumber) {
    let markedBoard = board.map(row => row.map(cell => (calledNumbers.includes(cell) || cell === 'Free') ? 'X' : cell));

    if (containsBingo(markedBoard)) {
        return false;
    }

    markedBoard = markedBoard.map(row => row.map(cell => (cell === winningNumber) ? 'X' : cell));

    return containsBingo(markedBoard);
}

function createBingoBoards(numBoards, calledNumbers, winningNumber) {
    let boards = [];
    while (boards.length < numBoards) {
        let newBoard = generateBingoBoard();
        if (isValidBoard(newBoard, calledNumbers, winningNumber)) {
            boards.push(newBoard);
        }
    }
    return boards;
}

const calledNumbers = [7, 12, 19, 23,
    31, 36, 41, 52, 58, 63, 69, 74];
const winningNumber = 45;
const numberOfBoards = 30;

let bingoBoards = createBingoBoards(numberOfBoards, calledNumbers, winningNumber);

bingoBoards.forEach((board, index) => {
    console.log(`Board ${index + 1}:`);
    console.log(board);
});