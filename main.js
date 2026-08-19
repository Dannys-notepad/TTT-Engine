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

import { easyAI } from './ai.js'

const rl = readline.createInterface({
    input: stdin,
    output: stdout,
    //prompt: 'TTT> '
})

let playerScores

function changePLayer (turn) {
    let play = `player1 (X)`

    if (turn % 2 === 0) {
        return `player2 (O)`
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

        let a1 = typeof gameSpace.gameBoardMapping.a[1] === 'number' ? ' ' : gameSpace.gameBoardMapping.a[1]
        let a2 = typeof gameSpace.gameBoardMapping.a[2] === 'number' ? ' ' : gameSpace.gameBoardMapping.a[2]
        let a3 = typeof gameSpace.gameBoardMapping.a[3] === 'number' ? ' ' : gameSpace.gameBoardMapping.a[3]

        let b1 = typeof gameSpace.gameBoardMapping.b[1] === 'number' ? ' ' : gameSpace.gameBoardMapping.b[1]
        let b2 = typeof gameSpace.gameBoardMapping.b[2] === 'number' ? ' ' : gameSpace.gameBoardMapping.b[2]
        let b3 = typeof gameSpace.gameBoardMapping.b[3] === 'number' ? ' ' : gameSpace.gameBoardMapping.b[3]

        let c1 = typeof gameSpace.gameBoardMapping.c[1] === 'number' ? ' ' : gameSpace.gameBoardMapping.c[1]
        let c2 = typeof gameSpace.gameBoardMapping.c[2] === 'number' ? ' ' : gameSpace.gameBoardMapping.c[2]
        let c3 = typeof gameSpace.gameBoardMapping.c[3] === 'number' ? ' ' : gameSpace.gameBoardMapping.c[3]
        
        let board = `
            
        1   2    3
    a [ ${a1} | ${a2} | ${a3} ]
    b [ ${b1} | ${b2} | ${b3} ]
    c [ ${c1} | ${c2} | ${c3} ]
            
            `
        
        console.log(gameStats)
        console.log(board)

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

            if (turn % 2 === 0) {
                rawInput = easyAI(gameSpace.gameBoardMapping)
            } else {
                rawInput = await rl.question(`${logPlayer} Enter your play space: `)
            }
            
            const input = rawInput.trim()

            if (input === 'exit') {
                console.log('Closing game')
                exit(0)
            }

            const playerInput = normalizePlayerInputs(input)

            if (playerInput.length === 2) {

                if (isLegalMove(gameSpace.gameBoardMapping, playerInput)) {

                    player = turn % 2 === 0 ? 'o' : 'x'
                    playATurn(playerInput, player, gameSpace.gameBoardMapping)

                    a1 = typeof gameSpace.gameBoardMapping.a[1] === 'number' ? ' ' : gameSpace.gameBoardMapping.a[1]
                    a2 = typeof gameSpace.gameBoardMapping.a[2] === 'number' ? ' ' : gameSpace.gameBoardMapping.a[2]
                    a3 = typeof gameSpace.gameBoardMapping.a[3] === 'number' ? ' ' : gameSpace.gameBoardMapping.a[3]

                    b1 = typeof gameSpace.gameBoardMapping.b[1] === 'number' ? ' ' : gameSpace.gameBoardMapping.b[1]
                    b2 = typeof gameSpace.gameBoardMapping.b[2] === 'number' ? ' ' : gameSpace.gameBoardMapping.b[2]
                    b3 = typeof gameSpace.gameBoardMapping.b[3] === 'number' ? ' ' : gameSpace.gameBoardMapping.b[3]

                    c1 = typeof gameSpace.gameBoardMapping.c[1] === 'number' ? ' ' : gameSpace.gameBoardMapping.c[1]
                    c2 = typeof gameSpace.gameBoardMapping.c[2] === 'number' ? ' ' : gameSpace.gameBoardMapping.c[2]
                    c3 = typeof gameSpace.gameBoardMapping.c[3] === 'number' ? ' ' : gameSpace.gameBoardMapping.c[3]
        
                    board = `
            
        1   2    3
    a [ ${a1} | ${a2} | ${a3} ]
    b [ ${b1} | ${b2} | ${b3} ]
    c [ ${c1} | ${c2} | ${c3} ]
            
            `

                    console.log(board)

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

    a1 = first row, first column
    a2 = first row, second column
    a3 = first row, third column

    b1 = second row, first column
    b2 = second row, second column
    b3 = second row, third column

    c1 = third row, first column
    c2 = third row, second column
    c3 = third row, third column

    Note: player 1 and 2 are automatically 'o' and 'x' respectively, also the ingame ai is automatically player 2

`)

main()