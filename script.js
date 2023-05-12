
//functions

const recursiveSolve = function (board) {
    for (let i = 0; i < board.length; i++) {
        for (let x = 0; x < board.length; x++) {
            if (board[i][x] === ".") {
                let rowArray = getCurrentRow(i, board);
                let columnArray = getCurrentColumn(x, board);
                let boxArray = getCurrentBox(i, x, board);
                for (let num = 1; num <= 9; num++) {
                    if (validNumber(num, rowArray, columnArray, boxArray)) {
                        board[i][x] = String(num);
                        if (recursiveSolve(board)) {
                            return true;
                        }
                        board[i][x] = ".";
                    }

                }
                return false;
            }
        }
    }

    return true;

}

const getCurrentRow = function (row, board) {
    const currentRowArray = new Array();
    for (let i = row; i < board.length; i++) {
        for (let x = 0; x < board.length; x++) {
            if (board[i][x] !== ".") {
                currentRowArray.push(board[i][x]);
            }
        }
        return currentRowArray;

    }
}


const getCurrentColumn = function (columnNum, board) {
    const currentColumnArray = new Array();
    for (let i = 0; i < board.length; i++) {
        if (board[i][columnNum] !== ".") {
            currentColumnArray.push(board[i][columnNum]);
        }
    }
    return currentColumnArray;

};

const getCurrentBox = function (rowNum, columnNum, board) {

    const startIndexMap = new Map();
    for (let i = 0; i < 9; i += 3) {
        let count = 0;
        for (let x = i; x < 9; x++) {
            startIndexMap.set(x, i);
            count++;
            if (count === 3) {
                break;
            }
        }
    }

    const startRow = startIndexMap.get(rowNum);
    const startColumn = startIndexMap.get(columnNum);
    const currentBoxArray = new Array();

    for (let i = startRow; i < startRow + 3; i++) {
        for (let x = startColumn; x < startColumn + 3; x++) {
            if (board[i][x] !== ".") {
                currentBoxArray.push(board[i][x]);
            }
        }
    }
    return currentBoxArray;
};


const validNumber = function (num, row, column, box) {
    num = String(num);
    if (!row.includes(num) && !column.includes(num) && !box.includes(num)) {
        return true;
    }
    return false;

};

const checkValidBoard = function (board) {
    const validDigits = '123456789';
    for (let i = 0; i < board.length; i++) {
        let currentRow = getCurrentRow(i, board);
        for (let x = 0; x < board.length; x++) {
            let currentColumn = getCurrentColumn(x, board);
            let currentBox = getCurrentBox(i, x, board);
            if (board[i][x] !== "." && !validDigits.includes(board[i][x])) {
                return false;
            }
            if (board[i][x] !== ".") {
                if (checkForDuplicates(board[i][x], currentRow) || checkForDuplicates(board[i][x], currentColumn) || checkForDuplicates(board[i][x], currentBox)) {
                    return false;
                }
            }
        }
    }
    return true;


}

const checkForDuplicates = function (num, array) {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] === num) {
            count++;
        }
        if (count > 1) {
            return true;
        }
    }
    return false;


}





//DOM Manipulation starts here

let board = new Array();


const cellElement = document.querySelectorAll('.cell');
for (let i = 0; i < cellElement.length; i++) {
    cellElement[i].classList.add('Width');
}

const statusElement = document.querySelector('.status');


const addInputs = function () {
    board = new Array(); 
    const inputs = new Array();
    for (let i = 0; i < cellElement.length; i++) {
        inputs.push(cellElement[i].value);
    }
    for (let i = 0; i < 9; i++) {
        let tempArray = new Array();
        for (let x = 0; x < 9; x++) {
            tempArray.push(inputs[0]);
            inputs.shift();
        }

        board.push(tempArray);

    }




}

const displaySolvedBoard = function (board) {
    for (let i = 0; i < cellElement.length; i++) {
        cellElement[i].value = "";
    }
    const entireBoardArray = new Array();
    for (let i = 0; i < board.length; i++) {
        for (let x = 0; x < board.length; x++) {
            entireBoardArray.push(board[i][x]);
        }
    }
    for (let i = 0; i < cellElement.length; i++) {
        cellElement[i].value = entireBoardArray[i];

    }


}

const solve = function () {
    statusElement.textContent = "Solving...";
    addInputs();
    if (checkValidBoard(board)) {
        recursiveSolve(board);
        displaySolvedBoard(board);
        statusElement.textContent = "Solved!";

    } else {
        statusElement.textContent = "The sudoku board you entered is not valid. There may be repeating numbers in the same row, column, or box or there may be inappropiate characters. Please enter the sudoku board again."

    }
}

const newBoard = function () {
    for (let i = 0; i < cellElement.length; i++) {
        cellElement[i].value = "";
    }
}

const calculateButton = document.querySelector('.solve');
calculateButton.addEventListener('click', solve);

const newBoardButton = document.querySelector('.new');
newBoardButton.addEventListener('click', newBoard);











