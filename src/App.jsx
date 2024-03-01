import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [player, setPlayer] = useState({ name: "", color: null});
  const [playerList, setPlayerList] = useState([]);
  const [shuffleFlg, setShuffleFlg] = useState(false);

  // シャッフル処理を定期的に実行するためのインターバルID
  const intervalId = useRef(null);

  /**
   * 参加者名を変更した際のハンドラ
   * 
   * @param {*} e イベント
   */
  const handlePlayerNameChange = (e) => {
    const playerInfo = {...player};
    playerInfo.name = e.target.value;
    setPlayer(playerInfo);
  }

  /**
   * 参加者名でキー入力した際のハンドラ
   * 
   */
  const handlePlayerNameKeyDown = (e) => {
    if (e.key == "Enter") handleSubmit();
  }

  /**
   * 登録ボタン押下時ののハンドラ
   * 
   */
  const handleSubmit = () => {
    if (player.name === "") return;
    setPlayerList([...playerList, {...player}]);
    setPlayer({ name: "", color: null});
  }

  /**
   * シャッフルボタン押下時のハンドラ
   * 
   */
  const handleSuffle = () => {
    setShuffleFlg(true);
    intervalId.current = setInterval( () => {
      const shuffledList = [...playerList];

      for (let i = 0; i < playerList.length; i++) {
        const randIdx = Math.floor(Math.random() * (i + 1));
        
        shuffledList[i].color = generateColorCode();
        const temp = shuffledList[i];
        shuffledList[i] = shuffledList[randIdx];
        shuffledList[randIdx] = temp;
      }

      setPlayerList(shuffledList);
    }, 100);
  }

  const generateColorCode = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `${r}, ${g}, ${b}`;
  }

  /**
   * ストップボタン押下時のハンドラ
   */
  const handleSuffleStop = () => {
    setShuffleFlg(false);
    clearInterval(intervalId.current);

    const pList = [...playerList];
    pList.forEach((x) => {
      x.color = null;
    })
    setPlayerList(pList);
  }

  /**
   * 登録ボタンを非活性にするか判定
   * 
   * @returns true/false
   */
  const disableRegist = () => {
    const maxPlayerCount = 8;

    if (playerList.length == maxPlayerCount) return true;
  }

  return (
    <>
      <h1 class="title">超便利自動卓割り振りクソ便利あぷり</h1>
      <div className="card">
        <input className="player-name" type="text" value={player.name} 
         onChange={handlePlayerNameChange} onKeyDown={handlePlayerNameKeyDown} disabled={disableRegist()}/>
        <button className="register" onClick={handleSubmit} disabled={disableRegist()}>登録</button>
        { shuffleFlg ? <button className="register" onClick={handleSuffleStop} disabled={!disableRegist()}>ストップ</button>
                     : <button className="register" onClick={handleSuffle} disabled={!disableRegist()}>シャッフル</button>
        }
      </div>

      <ul id="player-list">
        {
          playerList.map( (player, idx) => {
            return <li className="list-elem" style={player.color ? {color: `rgb(${player.color})`} : {}} key={idx}>{player.name}</li>;
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
