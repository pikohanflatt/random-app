import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [player, setPlayer] = useState('');
  const [playerList, setPlayerList] = useState([]);
  const [shuffleFlg, setShuffleFlg] = useState(false);

  const intervalId = useRef(null);

  const handlePlayerNameChange = (e) => {
    setPlayer(e.target.value);
  }

  const handlePlayerNameKeyDown = (e) => {
    if (e.key == "Enter") handleSubmit();
  }

  const handleSubmit = () => {
    if (player === "") return;
    setPlayerList([...playerList, player]);
    setPlayer('');
  }

  const handleSuffle = () => {
    setShuffleFlg(true);
    intervalId.current = setInterval( () => {
      const shuffledList = [...playerList];

      for (let i = 0; i < playerList.length; i++) {
        const randIdx = Math.floor(Math.random() * (i + 1));

        const temp = shuffledList[i];
        shuffledList[i] = shuffledList[randIdx];
        shuffledList[randIdx] = temp;
      }

      setPlayerList(shuffledList);
    }, 100);
  }

  const handleSuffleStop = () => {
    setShuffleFlg(false);
    clearInterval(intervalId.current);
  }

  const disableRegist = () => {
    const maxPlayerCount = 8;

    if (playerList.length == maxPlayerCount) return true;
  }

  return (
    <>
      {/* <h1>参加者登録</h1> */}
      <div className="card">
        <input className="player-name" type="text" value={player} 
         onChange={handlePlayerNameChange} onKeyDown={handlePlayerNameKeyDown} disabled={disableRegist()}/>
        <button className="register" onClick={handleSubmit} disabled={disableRegist()}>登録</button>
        { shuffleFlg ? <button className="register" onClick={handleSuffleStop} disabled={!disableRegist()}>ストップ</button>
                     : <button className="register" onClick={handleSuffle} disabled={!disableRegist()}>シャッフル</button>
        }
      </div>

      <ul id="player-list">
        {
          playerList.map( (player, idx) => {
            return <li className="list-elem" key={idx}>{player}</li>;
          })
        }
      </ul>
      <footer id="page-footer" className="copy-right">
        © shinjo All rights reserved.
      </footer>
    </>
  )
}

export default App
