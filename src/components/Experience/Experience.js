import React, { useEffect, useState } from "react"
import './index.css'
import backSign from '../../images/back-sign.png'
import { addLocalStorage } from "../../functions/addLocalStorage"

export const Experience = (props) => {

    const [position, setPosition] = useState([])
    const [employer, setEmployer] = useState([])
    const [startDate, setStartDate] = useState([])
    const [dueDate, setDueDate] = useState([])
    const [experienceDescription, setExperienceDescription] = useState([])
    const [formNum, setFormNum] = useState([0])

    const addForm = () => {
        setFormNum([...formNum, formNum[formNum.length - 1] + 1])
        addLocalStorage('formNum', [...formNum, formNum[formNum.length - 1] + 1])
    }

    useEffect(() => {
        const data = {position, employer, startDate, dueDate, experienceDescription, formNum}
        props.sendData(data)
    }, [position, employer, startDate, dueDate, experienceDescription, formNum])

    useEffect(() => {
        const position = JSON.parse(localStorage.getItem('position'))
        if(position){
            setPosition(position)
        }
    }, [])
    useEffect(() => {
        const employer = JSON.parse(localStorage.getItem('employer'))
        if(employer){
            setEmployer(employer)
        }
    }, [])
    useEffect(() => {
        const startDate = JSON.parse(localStorage.getItem('startDate'))
        if(startDate){
            setStartDate(startDate)
        }
    }, [])
    useEffect(() => {
        const dueDate = JSON.parse(localStorage.getItem('dueDate'))
        if(dueDate){
            setDueDate(dueDate)
        }
    }, [])
    useEffect(() => {
        const experienceDescription = JSON.parse(localStorage.getItem('experienceDescription'))
        if(experienceDescription){
            setExperienceDescription(experienceDescription)
        }
    }, [])
    useEffect(() => {
        const formNum = JSON.parse(localStorage.getItem('formNum'))
        if(formNum){
            setFormNum(formNum)
        }
    }, [])

    return (
        <div className="form experiecne-form">
            <div className='back-sign'>
                <img src={backSign} alt='back sign button'/>
            </div>
            <form>
                <div className='form-header'>
                    <span>ᲒᲐᲛᲝᲪᲓᲘᲚᲔᲑᲐ</span>
                    <span className='page-number'>2/3</span>
                </div>
                {
                    formNum.map(i => {
                        return (<div key={i} className='form-quantity'>
                            <div className="text-input long">
                                <p className="label">თანამდებობა</p>
                                <input type='text' placeholder="დეველოპერი, დიზაინერი, ა.შ." value={position[i] || ''} onChange={(event) => {
                                    let array = position
                                    array[i] = event.target.value
                                    addLocalStorage('position', array)
                                    setPosition([...array])
                                }}/>
                                <p className='input-validation'>მინიმუმ 2 სიმბოლო</p>
                            </div>
                            <div className="text-input long">
                                <p className="label">დამსაქმებელი</p>
                                <input type='text' placeholder="დამსაქმებელი" value={employer[i] || ''} onChange={(event) => {
                                    let array = employer
                                    array[i] = event.target.value
                                    addLocalStorage('employer', array)
                                    setEmployer([...array])
                                }}/>
                                <p className='input-validation'>მინიმუმ 2 სიმბოლო</p>
                            </div>
                            <div className='two-input'>
                                <div className="text-input">
                                    <p className="label">დაწყების რიცხვი</p>
                                    <input type='date' value={startDate[i] || ''} onChange={(event) => {
                                        let array = startDate
                                        array[i] = event.target.value
                                        addLocalStorage('startDate', array)
                                        setStartDate([...array])
                                    }}/>
                                </div>
                                <div className='text-input'>
                                    <p className="label">დამთავრების რიცხვი</p>
                                    <input type='date' value={dueDate[i] || ''} onChange={(event) => {
                                        let array = dueDate
                                        array[i] = event.target.value
                                        addLocalStorage('dueDate', array)
                                        setDueDate([...array])
                                    }}/>
                                </div>
                            </div>
                            <div className="textarea-div">
                                <p className='label'>აღწერა</p>
                                <textarea placeholder='როლი თანამდებობაზე და ზოგადი აღწერა' value={experienceDescription[i] || ''} onChange={(event) => {
                                    let array = experienceDescription
                                    array[i] = event.target.value
                                    addLocalStorage('experienceDescription', array)
                                    setExperienceDescription([...array])
                                }}>

                                </textarea>
                            </div>
                            </div>
                        )
                    })
                }
                
                <div>
                    <button type='button' className="add-button" onClick={addForm}>მეტი გამოცდილების დამატება</button>
                </div>
                <div className="navigation-buttons">
                    <button className='form-buttons'>უკან</button>
                    <button className='form-buttons'>შემდეგი</button>
                </div>
            </form>
        </div>
    )
}