//Usamos as keywords "EXPORT DEFAULT" para transformar a função em modulo através do ECMAScript
export default function createGame(){
    const state = {
        players: {},
        fruits: {},
        screen: {
            width: 10,
            height: 10
        }
    }

    //Adiciona uma propriedade à propriedade do estado do jogo
    //Essa propriedade será a representação de game através do id playerId
    //e das coordenadas (x, y)
    function addPlayer(command){
        const playerId = command.playerId
        const playerX = command.playerX
        const playerY = command.playerY

        //Nomeia a propriedade e da a ela o objeto como valor
        state.players[playerId] = {
            x: playerX,
            y: playerY
        }
    }

    //Remove o player através do id
    function removePlayer(command){
        const playerId = command.playerId

        //delete: Comando do js para apagar uma propriedade de um obj
        delete state.players[playerId]
    }

    function addFruit(command){
        const fruitId = command.fruitId
        const fruitX = command.fruitX
        const fruitY = command.fruitY

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        }
    }

    function removeFruit(command){
        const fruitId = command.fruitId

        delete state.fruits[fruitId]
    }

    //Função responsavel por mover o jogador
    function movePlayer(command){
        
        //PATTERN: OBJECT LITERALS
        //Objeto que possui as funções executadas ao usar o teclado.
        const acceptedMoves = {
            ArrowUp(player){
                if(player.y - 1 >= 0){
                    player.y = player.y - 1
                }
            },
            ArrowRight(player){
                if(player.x + 1 < state.screen.width){
                    player.x = player.x + 1
                }
            },
            ArrowDown(player){
                if(player.y + 1 < state.screen.height){
                    player.y = player.y + 1
                }
            },
            ArrowLeft(player){
                if(player.x - 1 >= 0){
                    player.x = player.x - 1
                }
            }
        }

        //Command possui a key pressionada
        const keyPressed = command.keyPressed

        const playerId = command.playerId
        //Command possui a referência de jogador
        const player = state.players[playerId]
        //Obj recebe a propriedade do objeto acceptedMoves que possui o mesmo nome que a key pressionada
        const moveFunction = acceptedMoves[keyPressed]

        //Se a key pressionada existir como nome de propriedade do objeto
        if(player && moveFunction){
            //Então será executada a função referente a propriedade
            moveFunction(player)
            checkForFruitCollision(playerId)
        }
    }

    function checkForFruitCollision(playerId){
        const player = state.players[playerId]

        for(const fruitId in state.fruits){
            const fruit = state.fruits[fruitId]
            console.log(`Checking ${playerId} and ${fruitId}`)

            if(player.x === fruit.x && player.y === fruit.y){
                console.log(`Collision between ${playerId} and ${fruitId}`)
                removeFruit({ fruitId: fruitId })
            }
        }
    }

    return {
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        state,
        movePlayer
    }
}