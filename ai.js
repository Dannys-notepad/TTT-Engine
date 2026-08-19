export function easyAI (gameBoardMapping) {

    function createSourceString (gameBoard) {
        let sourceString = ''

        if (typeof gameBoard.a[1] === 'number') {
            sourceString += '1'
        }

        if (typeof gameBoard.a[2] === 'number') {
            sourceString += '2'
        }

        if (typeof gameBoard.a[3] === 'number') {
            sourceString += '3'
        }

        if (typeof gameBoard.b[1] === 'number') {
            sourceString += '4'
        }

        if (typeof gameBoard.b[2] === 'number') {
            sourceString += '5'
        }

        if (typeof gameBoard.b[3] === 'number') {
            sourceString += '6'
        }

        if (typeof gameBoard.c[1] === 'number') {
            sourceString += '7'
        }

        if (typeof gameBoard.c[2] === 'number') {
            sourceString += '8'
        }

        if (typeof gameBoard.c[3] === 'number') {
            sourceString += '9'
        }

        return sourceString

    }

    try {

        const simplifiedGameBoardMapping = {
            1: 'a1',
            2: 'a2',
            3: 'a3',
            4: 'b1',
            5: 'b2',
            6: 'b3',
            7: 'c1',
            8: 'c2',
            9: 'c3'
        }

        let sourceString = createSourceString(gameBoardMapping)
        let index = Math.floor( Math.random() * sourceString.length )
        let selectedNumber = sourceString.length > 1 ? sourceString[index] : sourceString

        let response = simplifiedGameBoardMapping[Number(selectedNumber)]
        
        return response

    } catch (error) {
        throw error
    }

}