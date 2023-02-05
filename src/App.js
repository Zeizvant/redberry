import './App.css';
import {Landing} from './components/Landing/Landing';
import { PersonInfo } from './components/PersonInfo/PersonInfo'
import { Info } from './components/Info/Info'
import { Experience } from './components/Experience/Experience'
import { Education } from './components/Education/Education'
import { useState } from 'react';


function App() {

  const [personInfoData, setPersonInfoData] = useState({})
  const [experienceData, setExperienceData] = useState({})
  const [educationData, setEducationData] = useState({})

  const getPersonInfoData = (data) => {
    setPersonInfoData({...data})
  }
  const getExperienceData = (data) => {
    setExperienceData({...data})
  }
  const getEducationData = (data) => {
    setEducationData({...data})
  }

  return (
    <div className="App">
      {/* <PersonInfo sendData={getPersonInfoData}/> */}
      {/* <Experience sendData={getExperienceData}/> */}
      <Education sendData={getEducationData}/>
      <Info personInfoData={personInfoData} experienceData={experienceData} educationData={educationData}/>
    </div>
  );
}

export default App;
