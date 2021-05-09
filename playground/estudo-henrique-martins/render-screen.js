//Usamos as keywords "EXPORT DEFAULT" para transformar a função em modulo através do ECMAScript
export default function renderScreen(screen, game, requestAnimationFrame){
    const context = screen.getContext('2d')
    //Limpa tela
    context.clearRect(0, 0, screen.width, screen.height)

    //Cor dos players
    context.fillStyle = 'black'
    //para cada player
    for(const playerId in game.state.players){
        const player = game.state.players[playerId]
        //desenhe
        context.fillRect(player.x, player.y, 1, 1)
    }

    //Cor das frutas
    context.fillStyle = 'green'
    //Para cada fruta
    for(const fruitId in game.state.fruits){
        const fruit = game.state.fruits[fruitId]
        //Desenhe
        context.fillRect(fruit.x, fruit.y, 1, 1)
    }
    
    
    //requestAnimationFrame: método eficiente que fica renderizando de forma eficiente
    //Se usar outro app, a chamada do método reduz economizando processamento
    //requestAnimationFrame precisa de um callback(função que é passada como propriedade mas não é executada. Em resumo, sem usar os parenteses)
    //A função renderScreen precisa de 3 parâmetros e é necessário passar os parâmetros para executar a função.
    //Por isso usamos arrow functionp para passar uma função sem executá-la e essa função vai ter a função render screen sendo executada
    requestAnimationFrame(() => {
        renderScreen(screen, game, requestAnimationFrame)
    })
}