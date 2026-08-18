/********************************* GAME SAMPLE SPACE ************************************/

export function createGameSampleSpace() {

    const playersGameBoard = {
        rw1: ['-', '-', '-'],
        rw2: ['-', '-', '-'],
        rw3: ['-', '-', '-']
    }

    const gameBoardMapping = {
        rw1: { rw11: 0, rw12: 0, rw13: 0 },
        rw2: { rw21: 0, rw22: 0, rw23: 0 },
        rw3: { rw31: 0, rw32: 0, rw33: 0 }
    }

    const playerScores = {
        player1: { wins: 0, loses: 0 },
        player2: { wins: 0, loses: 0 },
        draws: 0
    }

    return {
        playersGameBoard,
        gameBoardMapping,
        playerScores
    }
}

/**************************************** END ********************************************/









/*********************************************** INPUT SANITIZER *************************************************************/

// validates the user row and column options and returns an object of the row and column
export function normalizePlayerInputs (input) {

    if(!input) {
        return 'Input required'
    }

    if(input.length !== 4){
        return 'Input length must not be greater or lesser than 4'
    }

    if(input.substring(0, 1) == 'rw'){
        return 'Input must start with "rw"'
    }

    if(!Number(input.substring(2, 3))){
        return 'Input row and column specifiers must be numbers'
    }

    if(!Number(input.substring(2)) || Number(input.split('')[2]) < 1 || Number(input.split('')[2]) > 3) {
        return 'Input row specifier must be a number, it must be between 1 - 3 '
    }

    if(!Number(input.substring(3)) || Number(input.substring(3)) < 1 || Number(input.substring(3)) > 3) {
        return 'Input column specifier must be a number, it must be between 1 - 3 '
    }

    return input
}

/**************************************************** END *************************************************/









/*************************************************** MAIN GAME FUNCTIONS ********************************************************/

// checks if a move is legal and returns a boolean
export function isLegalMove(gameBoardMapping, key) {

    if(!key && !gameBoardMapping){
        return 'Missing in game board mapping object or key'
    }

    let rowKey = key.substring(0, 3)
    let isLegal = false

    if(gameBoardMapping[rowKey][key] === 0){
        isLegal = true
    }

    return isLegal
}

// Input the players character in the in game board and the updated players game board
export function playATurn (key, option, gameBoardMapping, playersGameBoard) {

    if(!key || !option || !gameBoardMapping || !playersGameBoard){
        return 'Required values missing'
    }


    let rowKey = key.substring(0, 3)

    gameBoardMapping[rowKey][key] = option

    let column

    switch (Number(key.substring(3))) {
        case Number(1):
            column = 0
            break;
        
        case Number(2):
            column = 1
            break;

        case Number(3):
            column = 2
            break;
    }

    playersGameBoard[rowKey][column] = option

    return {
        gameBoardMapping,
        playersGameBoard
    }
    
}

// checks if a player has won and returns a string of the player's character that won, or retruns null if no player wins
export function checkWin (gameBoardMapping) {
    if(!gameBoardMapping) {
        return 'players game board object is required'
    }

    let winStatus = null
    const row1 = gameBoardMapping.rw1
    const row2 = gameBoardMapping.rw2
    const row3 = gameBoardMapping.rw3

    if (((row1.rw11 === 'o') && (row1.rw12 === 'o') && (row1.rw13 === 'o')) || ((row2.rw21 === 'o') && (row2.rw22 === 'o') && (row2.rw23 === 'o')) || ((row3.rw31 === 'o') && (row3.rw32 === 'o') && (row3.rw33 === 'o')) || ((row1.rw11 === 'o') && (row2.rw21 === 'o') && (row3.rw31 === 'o')) || ((row1.rw12 === 'o') && (row2.rw22 === 'o') && (row3.rw32 === 'o')) || ((row1.rw13 === 'o') && (row2.rw23 === 'o') && (row3.rw33 === 'o')) || ((row1.rw11 === 'o') && (row2.rw22 === 'o') && (row3.rw33 === 'o')) || ((row1.rw13 === 'o') && (row2.rw22 === 'o') && (row3.rw31 === 'o'))) {
        winStatus = 'o'
    } else if (((row1.rw11 === 'x') && (row1.rw12 === 'x') && (row1.rw13 === 'x')) || ((row2.rw21 === 'x') && (row2.rw22 === 'x') && (row2.rw23 === 'x')) || ((row3.rw31 === 'x') && (row3.rw32 === 'x') && (row3.rw33 === 'x')) || ((row1.rw11 === 'x') && (row2.rw21 === 'x') && (row3.rw31 === 'x')) || ((row1.rw12 === 'x') && (row2.rw22 === 'x') && (row3.rw32 === 'x')) || ((row1.rw13 === 'x') && (row2.rw23 === 'x') && (row3.rw33 === 'x')) || ((row1.rw11 === 'x') && (row2.rw22 === 'x') && (row3.rw33 === 'x')) || ((row1.rw13 === 'x') && (row2.rw22 === 'o') && (row3.rw31 === 'o'))) {
        winStatus = 'x'
    }
    return winStatus
}


/************************************************* END *******************************************************/