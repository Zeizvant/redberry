import './App.css';
import {Landing} from './components/Landing/Landing';
import { PersonInfo } from './components/PersonInfo/PersonInfo'
import { Info } from './components/Info/Info'
import { Experience } from './components/Experience/Experience'
import { useState } from 'react';


function App() {

  const [personInfoData, setPersonInfoData] = useState({})
  const [experienceData, setExperienceData] = useState({})

  const getPersonInfoData = (data) => {
    setPersonInfoData({...data})
  }
  const getExperienceData = (data) => {
    setExperienceData({...data})
  }

  console.log(setExperienceData)
  return (
    <div className="App">
      {/* <PersonInfo sendData={getPersonInfoData}/> */}
      <Experience sendData={getExperienceData}/>
      <Info personInfoData={personInfoData} experienceData={experienceData}/>
    </div>
  );
}

export default App;
