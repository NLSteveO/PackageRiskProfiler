import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

const getNpmsScores = (pkg, setScore) => {
    fetch('http://api.npms.io/v2/package/' + pkg)
    .then(response => response.json().then(blah => setScore({[pkg]: blah.score})));
};

const RenderList = ({scores}) => {
    return (
        <table>
            <thead>
                <tr>
                    <td>Dependency</td>
                    <td>Final</td>
                    <td>Quality</td>
                    <td>Popularity</td>
                    <td>Maintenance</td>
                </tr>
            </thead>
            {Object.keys(scores).map(score => {
                return(
                    <tbody key={score}>
                        <tr>
                            <td>{score}</td>
                            <td>{Math.round(scores[score].final * 100)}</td>
                            <td>{Math.round(scores[score].detail.quality * 100)}</td>
                            <td>{Math.round(scores[score].detail.popularity * 100)}</td>
                            <td>{Math.round(scores[score].detail.maintenance * 100)}</td>
                        </tr>
                    </tbody>
                );
            })}
        </table>
    );
}

function App() {
  const [count, setCount] = useState(0);
  const [pkg, setPackage] = useState('');
  const [score, setScore] = useState({});
  const updatePackage = evt => setPackage(evt.target.value);
  const submit = () => getNpmsScores(pkg, setScore);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <div className="card">
        <label>Package Name: </label>
        <input onChange={updatePackage} />
        <button onClick={submit} >Check</button>
        <RenderList scores={score} />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
};

export default App;
