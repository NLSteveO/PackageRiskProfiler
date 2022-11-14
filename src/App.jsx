import { useState } from 'react';
import './App.css';

const getListOfPackages = packages => packages.split(',').map(pkg => pkg.trim());

const getNpmsScore = (pkg, setScores) => {
    fetch('http://api.npms.io/v2/package/' + pkg)
    .then(response => {
        if (response.status !== 200) {
            console.warn('Could not find a score for', pkg);
            return;
        }
        return response.json().then(npmsInfo => setScores(scores => {
            return { ...scores, [pkg]: npmsInfo.score }
        }));
    });
};

const formatScore = score => {
    return (Math.round(score * 1000)/10).toFixed(1);
};

const sortScores = scores => {
    const scoresList = Object.keys(scores).map(score => [score, scores[score].final, scores[score].detail]);
    scoresList.sort((a, b) => b[1] - a[1]);
    return scoresList;
};

const RenderList = ({scores}) => {
    const sortedScores = sortScores(scores);
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
            {sortedScores.map(([pkg, final, detail]) => {
                return(
                    <tbody key={pkg}>
                        <tr>
                            <td>{pkg}</td>
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
  const submit = () => getListOfPackages(pkgs).forEach(pkg => getNpmsScore(pkg, setScores));

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
