function main () {
    try {

        const gameSpace = createGameSampleSpace()
        let turn = 0
        let player 
        console.log('Player 1 enter your preferred column to start')
        
        rl.prompt()

        rl.on('line', (line) => {

            const input = line.trim()

            if (input === 'exit') {
                console.log('Closing game')
                exit(0)
            }

            const playerInput = normalizePlayerInputs(input)
            turn++
            if (playerInput.length === 4) {
                if(turn > 4) {
                    const c = checkWin(gameSpace.gameBoardMapping)
                    if (c) {
                        console.log(`Player ${c} has won`)
                        exit(0)
                    }
                }

                if (isLegalMove(gameSpace.gameBoardMapping, playerInput)) {
                    player = turn % 2 === 0 ? 'o' : 'x'
                    playATurn(playerInput, player, gameSpace.gameBoardMapping, gameSpace.playersGameBoard)
                    console.log(gameSpace.playersGameBoard)
                } else {
                    console.log('The specified row or column as already been filled')
                }
            } else {
                console.log(playerInput)
            }
            

            rl.prompt()
        }).on('close', () => {
            console.log('Have a great day!')
            exit(0)
        })

    } catch (error) {
        console.log(error)
        exit(1)
    }
}
