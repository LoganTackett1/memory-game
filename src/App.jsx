import { useEffect, useState } from 'react'
import './App.css'
import Card from './Card';

function updateWrapperCss () {
    const width = window.innerWidth;
    const height = window.innerHeight * (5/6);
    return Math.floor(Math.min(width,height)*0.8);
}

const wrapperWidth = updateWrapperCss();
  document.querySelector(':root').style.setProperty('--card-wrapper-width', `${wrapperWidth}px`);

  window.addEventListener('resize', () => {
    const wrapperWidth = updateWrapperCss();
    document.querySelector(':root').style.setProperty('--card-wrapper-width', `${wrapperWidth}px`);
  });

function getRandArr (arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    let rand = Math.random();
    if (rand > 0.5) {
      result.unshift(arr[i]);
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

function App() {
  const [cards,setCards] = useState([]);
  const [score,setScore] = useState(0);
  const [clicked,setClicked] = useState([]);
  const [losses,setLosses] = useState(0);

  useEffect(() => {
    fetch("https://api.giphy.com/v1/gifs/trending?api_key=1DZQ6GuOjaUVNesX7uEwWGm9rd4BJFgS&limit=9&offset=" + `${8*losses}` + "&rating=pg-13&bundle=messaging_non_clips")
    .then(response => response.json())
    .then(data => {
      const newArr = [];
      for (let i = 0; i < 9; i++) {
        newArr.push({
          src: data.data[i].images.fixed_height.webp,
          id: i
        });
      }
      setCards(newArr);
    })
  },[losses]);

  const cardArr = getRandArr(cards);

  return (
    <>
      <h1>Score : {score}</h1>
      <div className='card-wrapper'>
        {
          cardArr.map(card => <Card key={card.id} losses={losses} setLosses={setLosses} score={score} src={card.src} id={card.id} clickSetter={setClicked} clicked={clicked} scoreSetter={setScore} />)
        }
      </div>
    </>
  )
}

export default App
