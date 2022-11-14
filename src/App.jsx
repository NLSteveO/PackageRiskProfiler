import { useState } from 'react';
import './App.css';

const getNpmsScore = (pkg, setScores) => {
    fetch('http://api.npms.io/v2/package/' + pkg)
    .then(response => response.json().then(npmsInfo => setScores({[pkg]: npmsInfo.score})));
};

const formatScore = score => {
    return (Math.round(score * 1000)/10).toFixed(1);
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
                const { detail, final } = scores[score];
                return(
                    <tbody key={score}>
                        <tr>
                            <td>{score}</td>
                            <td>{formatScore(final)}%</td>
                            <td>{formatScore(detail.quality)}%</td>
                            <td>{formatScore(detail.popularity)}%</td>
                            <td>{formatScore(detail.maintenance)}%</td>
                        </tr>
                    </tbody>
                );
            })}
        </table>
    );
}

function App() {
  const [pkgs, setPackage] = useState('');
  const [scores, setScores] = useState({});
  const updatePackage = evt => setPackage(evt.target.value);
  const submit = () => getNpmsScore(pkgs, setScores);

  return (
    <div className="App">
      <h1>Package Risk Profiler</h1>
      <div className="card">
        <label>Package Name: </label>
        <input onChange={updatePackage} />
        <button onClick={submit} >Check</button>
        <RenderList scores={scores} />
      </div>
    </div>
  );
};

export default App;
