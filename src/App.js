import './App.css';
import {Landing} from './components/Landing/Landing';
import { PersonInfo } from './components/PersonInfo/PersonInfo'
import { Info } from './components/Info/Info'
import { Experience } from './components/Experience/Experience'


function App() {
  return (
    <div className="App">
      <Experience />
      <Info />
    </div>
  );
}

export default App;
