import './App.css';
import {Landing} from './components/Landing/Landing';
import { PersonInfo } from './components/PersonInfo/PersonInfo'
import { Info } from './components/Info/Info'


function App() {
  return (
    <div className="App">
      <PersonInfo />
      <Info />
    </div>
  );
}

export default App;
