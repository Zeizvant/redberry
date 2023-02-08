import './App.css';
import {Landing} from './components/Landing/Landing';
import { PersonInfo } from './components/PersonInfo/PersonInfo'
import { Info } from './components/Info/Info'
import { Experience } from './components/Experience/Experience'
import { Education } from './components/Education/Education'
import { Success } from './components/Success/Success'
import { createContext, useEffect, useState } from 'react';
import { addLocalStorage } from './functions/addLocalStorage';


export const UserContext = createContext();

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
  useEffect(() => {
      
    const name = JSON.parse(localStorage.getItem('name')) || ''
    const lastName = JSON.parse(localStorage.getItem('lastName')) || ''
    const about = JSON.parse(localStorage.getItem('about')) || ''
    const email = JSON.parse(localStorage.getItem('email')) || ''
    const number = JSON.parse(localStorage.getItem('number')) || ''
    const image = JSON.parse(localStorage.getItem('image')) || ''
    const data = {
      name,
      lastName,
      about,
      email,
      number,
      image,
      
  }
    setPersonInfoData({...data})

  }, [])

  useEffect(() => {
      
    const position = JSON.parse(localStorage.getItem('position')) || []
    const employer = JSON.parse(localStorage.getItem('employer')) || []
    const startDate = JSON.parse(localStorage.getItem('startDate')) || []
    const dueDate = JSON.parse(localStorage.getItem('dueDate')) || []
    const experienceDescription = JSON.parse(localStorage.getItem('experienceDescription')) || []
    const formNum = JSON.parse(localStorage.getItem('formNum')) || [0]
    const changed = JSON.parse(localStorage.getItem('changed')) || [false]
    const data = {
      position, employer, startDate, dueDate, experienceDescription, formNum, changed
  }
    setExperienceData({...data})
  }, [])

  useEffect(() => {
    const institute = JSON.parse(localStorage.getItem('institute')) || []
    const degree = JSON.parse(localStorage.getItem('degree')) || []
    const endDate = JSON.parse(localStorage.getItem('endDate')) || []
    const educationDescription = JSON.parse(localStorage.getItem('educationDescription')) || []
    const eduFormNum = JSON.parse(localStorage.getItem('eduFormNum')) || [0]
    const eduChanged = JSON.parse(localStorage.getItem('eduChanged')) || [false]
    const data = {
      institute, degree, endDate, educationDescription, eduFormNum, eduChanged
  }
    setEducationData({...data})
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
    <UserContext.Provider value={{personInfoData, experienceData, educationData}}>
      <div className="App">
        {
          page === 1 && <Landing changePage={changePage}/>
        }
        {
          page === 2 && 
          <>
            <PersonInfo sendData={getPersonInfoData} changePage={changePage}/>
            <Info />
          </>
        }
        {
          page === 3 && 
          <>
            <Experience sendData={getExperienceData} changePage={changePage}/>
            <Info />
          </>
        }
        {
          page === 4 && 
          <>
            <Education sendData={getEducationData} changePage={changePage}/>
            <Info />
          </>
        }
        {
          page === 5 && 
          <>
            <Success changePage={changePage}/>
          </>
        }
      </div>
    </UserContext.Provider>
  );
}

export default App;
