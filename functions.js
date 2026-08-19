/********************************* GAME SAMPLE SPACE ************************************/

export function createGameSampleSpace() {
    const gameBoardMapping = {
        a: { 1: 0, 2: 0, 3: 0 },
        b: { 1: 0, 2: 0, 3: 0 },
        c: { 1: 0, 2: 0, 3: 0 }
    }

    const playerScores = {
        player1: { wins: 0, loses: 0 },
        player2: { wins: 0, loses: 0 },
        draws: 0
    }

    return {
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

    if(input.length !== 2){
        return 'Input length must not be greater or lesser than 2'
    }

    if((input.substring(0, 1) !== 'a') && (input.substring(0, 1) !== 'b') && (input.substring(0, 1) !== 'c')){
        return 'Input must start with "a" or "b" or "c"'
    }

    if(!Number(input.substring(1))){
        return 'Input column specifier must be a number'
    }

    if(Number(input.substring(1)) < 1 || Number(input.substring(1)) > 3) {
        return 'Input column specifier must be between 1 - 3 '
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

    let rowKey = key.substring(0, 1)
    let colKey = key.substring(1)
    let isLegal = false

    if(gameBoardMapping[rowKey][colKey] === 0){
        isLegal = true
    }

    return isLegal
}

// Input the players character in the in game board and the updated players game board
export function playATurn (key, option, gameBoardMapping) {

    if(!key || !option || !gameBoardMapping){
        return 'Required values missing'
    }


    let rowKey = key.substring(0, 1)
    let colKey = key.substring(1)

    gameBoardMapping[rowKey][colKey] = option


    return gameBoardMapping
    
}

// checks if a player has won and returns a string of the player's character that won, or retruns null if no player wins
export function checkWin (gameBoardMapping) {
    if(!gameBoardMapping) {
        return 'players game board object is required'
    }

    let winner = null
    const row1 = gameBoardMapping.a
    const row2 = gameBoardMapping.b
    const row3 = gameBoardMapping.c


    // Logic for computing win

        // Computing for player "o"
        // combination = a1 a2 a3
    if (((row1[1] === 'o') && (row1[2] === 'o') && (row1[3] === 'o')) ||

        // combination = b1 b2 b3
        ((row2[1] === 'o') && (row2[2] === 'o') && (row2[3] === 'o')) ||

        // combination = c1 c2 c3
        ((row3[1] === 'o') && (row3[2] === 'o') && (row3[3] === 'o')) ||

        // combination = a1 b1 c1
        ((row1[1] === 'o') && (row2[1] === 'o') && (row3[1] === 'o')) ||

        // combination = a2 b2 c2
        ((row1[2] === 'o') && (row2[2] === 'o') && (row3[2] === 'o')) ||

        // combination = a3 b3 c3
        ((row1[3] === 'o') && (row2[3] === 'o') && (row3[3] === 'o')) ||

        // combination = a1 b2 c3
        ((row1[1] === 'o') && (row2[2] === 'o') && (row3[3] === 'o')) ||

        // combination = a3 a2 c1
        ((row1[3] === 'o') && (row2[2] === 'o') && (row3[1] === 'o'))) {

        winner = 'o'


                // Computing for player "x"
                // combination = a1 a2 a3
    } else if (((row1[1] === 'x') && (row1[2] === 'x') && (row1[3] === 'x')) ||
    
               // combination = b1 b2 b3
               ((row2[1] === 'x') && (row2[2] === 'x') && (row2[3] === 'x')) ||

               // combination = c1 c2 c3
               ((row3[1] === 'x') && (row3[2] === 'x') && (row3[3] === 'x')) ||

               // combination = a1 b1 c1
               ((row1[1] === 'x') && (row2[1] === 'x') && (row3[1] === 'x')) ||

               // combination = a2 b2 c2
               ((row1[2] === 'x') && (row2[2] === 'x') && (row3[2] === 'x')) ||

               // combination = a3 b3 c3
               ((row1[3] === 'x') && (row2[3] === 'x') && (row3[3] === 'x')) ||

               // combination = a1 b2 c3
               ((row1[1] === 'x') && (row2[2] === 'x') && (row3[3] === 'x')) ||

               // combination = a3 a2 c1
               ((row1[3] === 'x') && (row2[2] === 'x') && (row3[1] === 'x'))) {

        winner = 'x'

    }

    return winner

}


/************************************************* END *******************************************************/