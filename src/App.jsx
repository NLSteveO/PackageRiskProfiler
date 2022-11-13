import { useState } from 'react';
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
  const [pkg, setPackage] = useState('');
  const [score, setScore] = useState({});
  const updatePackage = evt => setPackage(evt.target.value);
  const submit = () => getNpmsScores(pkg, setScore);

  return (
    <div className="App">
      <h1>Package Risk Profiler</h1>
      <div className="card">
        <label>Package Name: </label>
        <input onChange={updatePackage} />
        <button onClick={submit} >Check</button>
        <RenderList scores={score} />
      </div>
    </div>
  );
};

export default App;
