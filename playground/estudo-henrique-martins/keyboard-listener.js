//NOTA: as keywords "EXPORT DEFAULT" tornam essa função um modulo que pode ser importado
//em uma tag script declarada com o type="module". Ex.: <script type="module">import createKeyboardListener from './keyboard-listener.js'</script>
//Para um bloco de script importar um modulo ele também precisa ser um modulo.

//Ouve o teclado
export default function createKeyboardListener(document){
    //Guarda os observers como state
    const state = {
        observers: []
    }

    //Carrega as funções de observer na lista
    function subscribe(observerFunction){
        state.observers.push(observerFunction)
    }

    //Utiliza obj command que possui player e comportamento do keyboard
    function notifyAll(command){

        for(const observerFunction of state.observers){
            observerFunction(command)
        }
    }

    document.addEventListener('keydown', handleKeydown)

    function handleKeydown(event){
        const keyPressed = event.key

        const command = {
            playerId: 'player1',
            keyPressed
        }

        notifyAll(command)

    }

    return {
        subscribe
    }

}