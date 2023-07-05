
import { useEffect, useState } from 'react';
import './App.css';

import { HangImage } from './components/HangImage';
import { letters } from './helpers/letters';
import { getRandomWord } from './helpers/getRandomWord';


function App() {

  const [word, setWord] = useState(getRandomWord);
  const [hiddenWord, setHiddenWord] = useState('_ '.repeat(word.length));
  const [attempts, setAttempts] = useState(0);
  const [lose, setLose] = useState(false);
  const [won, setWon] = useState(false);

  // console.log(word)
  
  // Determinar si el jugador perdio.
  useEffect(() => {
    
    if(attempts >= 9){
      setLose(true);
    }

  }, [attempts]);
  
  // determinar si el jugador gano.
  useEffect(() => {

    const currentHiddenWord = hiddenWord.split(' ').join('');

    if(currentHiddenWord === word){
      setWon(true);
    }

  }, [hiddenWord])
  

  const checkLetter = (letter: string) => {

    if(lose) return;
    if(won) return;

    if(!word.includes(letter)){
      setAttempts( Math.min(attempts + 1, 9) )
      return;
    }

    const hiddenWordArray = hiddenWord.split(' ');

    for(let i = 0; i < word.length; i ++){

      if(word[i] === letter){
        hiddenWordArray[i] = letter;
      }
    }
    setHiddenWord(hiddenWordArray.join(' '))

    if(attempts > 9){
      setLose(true);
    }

  }

  // Reiniciar el juego.
  const newGame = () =>{

    // window.location.reload(); // para reiniciar el navegador como si presionaramos la tecla F2.

    const newWord = getRandomWord();
    
    setWord(newWord);
    setHiddenWord('_ '.repeat(newWord.length));
    setAttempts(0);
    setLose(false);
    setWon(false);
  }
  
  return (
    <div className='App'>
      
      {/* Imagenes */}
      <HangImage imageNumber= {attempts}/>

      {/* Palabra oculta */}
      <h3>{hiddenWord}</h3>


      {/* Contador de intentos */}
      <h3>Intentos: {attempts}</h3>

      {/* Mensaje si perdio */}
      {
        (lose) 
        ? <h3>Perdiste la palabra era: {word}</h3> 
        : ''
      }

      {/* Mensaje si gano */}
      {
        (won)
        ? <h3>Ganaste!!</h3>
        : ''
      }

      {/* Botones de letras */}
      {
        letters.map((letra) => (
          <button className='buttones'
            key={letra}
            onClick={() => checkLetter(letra)}
            >
            {letra}
          </button>
        ))
      }

      {/* Boton reinicio del juego */}
      <br />
      <button className='boton'
      onClick={() => newGame()}
      >
        Nuevo juego
      </button>

    </div>
  )
};
export default App;
