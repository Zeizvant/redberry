import './App.css';
import {Landing} from './components/Landing/Landing';
import { PersonInfo } from './components/PersonInfo/PersonInfo'
import { Info } from './components/Info/Info'
import { Experience } from './components/Experience/Experience'
import { Education } from './components/Education/Education'
import { Success } from './components/Success/Success'
import { useEffect, useState } from 'react';
import { addLocalStorage } from './functions/addLocalStorage';


function App() {

  const [personInfoData, setPersonInfoData] = useState({})
  const [experienceData, setExperienceData] = useState({})
  const [educationData, setEducationData] = useState({})
  const [page, setPage] = useState(1)

  useEffect(() => {
    const page = JSON.parse(localStorage.getItem('page'))
    if(page){
      setPage(page)
    }
  }, [])

  const getPersonInfoData = (data) => {
    setPersonInfoData({...data})
  }
  const getExperienceData = (data) => {
    setExperienceData({...data})
  }
  const getEducationData = (data) => {
    setEducationData({...data})
  }
  const changePage = (num) =>{
    addLocalStorage('page', num)
    setPage(num)
  }

  return (
    <div className="App">
      {
        page === 1 && <Landing changePage={changePage}/>
      }
      {
        page === 2 && 
        <>
          <PersonInfo sendData={getPersonInfoData} changePage={changePage}/> 
          <Info personInfoData={personInfoData} experienceData={experienceData} educationData={educationData}/>
        </>
      }
      {
        page === 3 && 
        <>
          <Experience sendData={getExperienceData} changePage={changePage}/>
          <Info personInfoData={personInfoData} experienceData={experienceData} educationData={educationData}/>
        </>
      }
      {
        page === 4 && 
        <>
          <Education sendData={getEducationData} changePage={changePage}/>
          <Info personInfoData={personInfoData} experienceData={experienceData} educationData={educationData}/>
        </>
      }
      {
        page === 5 && 
        <Success />
      }
    </div>
  );
}

export default App;
