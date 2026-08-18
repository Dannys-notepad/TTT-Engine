import readline from 'node:readline/promises'
import { exit, stdin, stdout } from 'node:process'

// Custom imports
import {
    createGameSampleSpace,
    normalizePlayerInputs,
    isLegalMove,
    playATurn,
    checkWin
} from './functions.js' 

const rl = readline.createInterface({
    input: stdin,
    output: stdout,
    //prompt: 'TTT> '
})

let playerScores

function changePLayer (turn) {
    let play = `player1 (O)`

    if (turn % 2 === 0) {
        return `player2 (X)`
    }

    return play
}

async function main (scores) {
    try {


        const gameSpace = createGameSampleSpace()

        if (scores) {
            gameSpace.playerScores = scores
        }

        let turn = 0
        let player, logPlayer, rawInput, currentPlayer, otherPlayer
        let gameStats = `Game stats: 
        Payer 1: ${gameSpace.playerScores.player1.wins} wins, ${gameSpace.playerScores.player1.loses} loses
        Payer 2: ${gameSpace.playerScores.player2.wins} wins, ${gameSpace.playerScores.player2.loses} loses
        Draws: ${gameSpace.playerScores.draws}
        `
        console.log(gameSpace.playersGameBoard)
        console.log(gameStats)

        while (true) {
            turn++

            let c
                
            if((turn > 4) && (turn < 10)) {

                c = checkWin(gameSpace.gameBoardMapping)
                currentPlayer = logPlayer.substring(0, 7)
                otherPlayer = currentPlayer === 'player1' ? 'player2' : 'player1'
                console.log(otherPlayer)

                if (c) {

                    playerScores = {
                        [currentPlayer]: { wins: ++gameSpace.playerScores[currentPlayer].wins, loses: gameSpace.playerScores[currentPlayer].loses },
                        [otherPlayer]: { wins: gameSpace.playerScores[otherPlayer].wins, loses: ++gameSpace.playerScores[otherPlayer].loses },
                        draws: gameSpace.playerScores.draws
                    }
                    

                    console.log(`${logPlayer} has won\n`)
                    console.log('New Game')

                    await main(playerScores)
                }
            } else if (turn > 9) {

                c = checkWin(gameSpace.gameBoardMapping)

                if (c) {

                    
                    playerScores = {
                        [currentPlayer]: { wins: ++gameSpace.playerScores[currentPlayer].wins, loses: gameSpace.playerScores[currentPlayer].loses },
                        [otherPlayer]: { wins: gameSpace.playerScores[otherPlayer].wins, loses: ++gameSpace.playerScores[otherPlayer].loses },
                        draws: gameSpace.playerScores.draws
                    }

                    console.log(`${logPlayer} has won\n`)
                    console.log('New Game')

                    await main(playerScores)
                } else {

                    playerScores = {
                        [currentPlayer]: { wins: gameSpace.playerScores[currentPlayer].wins, loses: gameSpace.playerScores[currentPlayer].loses },
                        [otherPlayer]: { wins: gameSpace.playerScores[otherPlayer].wins, loses: gameSpace.playerScores[otherPlayer].loses },
                        draws: ++gameSpace.playerScores.draws
                    }

                    console.log(`Game was a draw\n`)
                    console.log('New Game')

                    await main(playerScores)
                }

            }

            logPlayer = changePLayer(turn)
            rawInput = await rl.question(`${logPlayer} Enter your play space: `)

            const input = rawInput.trim()

            if (input === 'exit') {
                console.log('Closing game')
                exit(0)
            }

            const playerInput = normalizePlayerInputs(input)

            if (playerInput.length === 4) {

                if (isLegalMove(gameSpace.gameBoardMapping, playerInput)) {

                    player = turn % 2 === 0 ? 'o' : 'x'
                    playATurn(playerInput, player, gameSpace.gameBoardMapping, gameSpace.playersGameBoard)
                    console.log(gameSpace.playersGameBoard)

                } else {

                    turn--
                    console.log('The specified row or column as already been filled')
                }

            } else {
                turn--
                console.log(playerInput)
            }

        }

    } catch (error) {
        throw error
    }
}




console.log(`

    TIK TAK TOE Game

    
        1     2     3
    a [' ' | ' ' | ' ']
    b [' ' | ' ' | ' ']
    c [' ' | ' ' | ' ']

    Above is a sample game board and below are the play commands to enter

    rw11 = first row, first column
    rw12 = first row, second column
    rw13 = first row, third column

    rw21 = second row, first column
    rw22 = second row, second column
    rw23 = second row, third column

    rw31 = third row, first column
    rw32 = third row, second column
    rw33 = third row, third column

    Note: player 1 and 2 are automatically 'o' and 'x' respectively

`)

main()