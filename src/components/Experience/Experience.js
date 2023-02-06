import React, { useCallback, useContext, useEffect, useState } from "react"
import './index.css'
import backSign from '../../images/back-sign.png'
import { addLocalStorage } from "../../functions/addLocalStorage"
import { UserContext } from "../../App"

export const Experience = (props) => {

    const [position, setPosition] = useState([])
    const [employer, setEmployer] = useState([])
    const [startDate, setStartDate] = useState([])
    const [dueDate, setDueDate] = useState([])
    const [experienceDescription, setExperienceDescription] = useState([])
    const [formNum, setFormNum] = useState([0])
    const [changed, setChanged] = useState([false])
    const context = useContext(UserContext)

    const addForm = () => {
        setFormNum([...formNum, formNum[formNum.length - 1] + 1])
        addLocalStorage('formNum', [...formNum, formNum[formNum.length - 1] + 1])
    }

    useEffect(() => {
        const data = {position, employer, startDate, dueDate, experienceDescription, formNum, changed}
        props.sendData(data)
    }, [position, employer, startDate, dueDate, experienceDescription, formNum, changed])

    useEffect(() => {
        const {position, employer, startDate, dueDate, experienceDescription, formNum, changed} = context.experienceData
        setPosition(position)
        setEmployer(employer)
        setStartDate(startDate)
        setDueDate(dueDate)
        setExperienceDescription(experienceDescription)
        setFormNum(formNum)
        setChanged(changed)
    }, [])

    useEffect(() => {
        addLocalStorage('changed', changed)
    }, [changed])

    return (
        <div className="form e-form">
            <div className='back-sign' onClick={() => {
                    localStorage.clear()
                    props.changePage(1)
            }}>
                <img src={backSign} alt='back sign button'/>
            </div>
            <div className="positioning">
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
                                        let changedArray = changed
                                        changedArray[i] = true
                                        setChanged([...changedArray])
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
                                        let changedArray = changed
                                        changedArray[i] = true
                                        setChanged([...changedArray])
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
                                            let changedArray = changed
                                            changedArray[i] = true
                                            setChanged([...changedArray])
                                        }}/>
                                    </div>
                                    <div className='text-input'>
                                        <p className="label">დამთავრების რიცხვი</p>
                                        <input type='date' value={dueDate[i] || ''} onChange={(event) => {
                                            let array = dueDate
                                            array[i] = event.target.value
                                            addLocalStorage('dueDate', array)
                                            setDueDate([...array])
                                            let changedArray = changed
                                            changedArray[i] = true
                                            setChanged([...changedArray])
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
                                        let changedArray = changed
                                        changedArray[i] = true
                                        setChanged([...changedArray])
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
                </form>
                <div className="navigation-buttons">
                    <button type='button' className='form-buttons' onClick={() => {
                        props.changePage(2)
                    }}>უკან</button>
                    <button type='button' className='form-buttons' onClick={() => {
                        props.changePage(4)
                    }}>შემდეგი</button>
                </div>
            </div>
            
        </div>
    )
}