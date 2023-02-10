import React, { useCallback, useContext, useEffect, useState } from "react"
import './index.css'
import backSign from '../../images/back-sign.png'
import { addLocalStorage } from "../../functions/addLocalStorage"
import { UserContext } from "../../App"
import { reqMin2 } from "../../validation/reqMin2"
import { isDate } from "../../validation/isDate"

export const Experience = (props) => {

    const [position, setPosition] = useState([])
    const [employer, setEmployer] = useState([])
    const [startDate, setStartDate] = useState([])
    const [dueDate, setDueDate] = useState([])
    const [experienceDescription, setExperienceDescription] = useState([])
    const [formNum, setFormNum] = useState([0])
    const [changed, setChanged] = useState([false])
    const [expInputChanged, setExpInputChanged] = useState([[false, false, false, false, false]])
    const [expIsValid, setExpIsValid] = useState([[false, false, false, false, false]])
    const context = useContext(UserContext)

    const addForm = () => {
        setFormNum([...formNum, formNum[formNum.length - 1] + 1])
        setExpInputChanged([...expInputChanged, [false, false, false, false, false]])
        setExpIsValid([...expIsValid, [false, false, false, false, false]])
        addLocalStorage('expInputChanged', [...expInputChanged, [false, false, false, false, false]])
        addLocalStorage('expIsValid', [...expIsValid, [false, false, false, false, false]])
        addLocalStorage('formNum', [...formNum, formNum[formNum.length - 1] + 1])
    }

    useEffect(() => {
        const data = {position, employer, startDate, dueDate, experienceDescription, formNum, changed, expInputChanged, expIsValid}
        props.sendData(data)
    }, [position, employer, startDate, dueDate, experienceDescription, formNum, changed, expInputChanged, expIsValid])

    useEffect(() => {
        const {position, employer, startDate, dueDate, experienceDescription, formNum, changed, expInputChanged, expIsValid} = context.experienceData
        setPosition(position)
        setEmployer(employer)
        setStartDate(startDate)
        setDueDate(dueDate)
        setExperienceDescription(experienceDescription)
        setFormNum(formNum)
        setChanged(changed)
        setExpInputChanged(expInputChanged)
        setExpIsValid(expIsValid)
    }, [])

    useEffect(() => {
        addLocalStorage('changed', changed)
    }, [changed])

    useEffect(() => {
        let array = expIsValid
        for(let i = 0; i<position.length; i++){
            if(reqMin2(position[i])){
                array[i][0] = true
            }else{
                array[i][0] = false
            }
        }
        addLocalStorage('expIsValid', [...array])
    }, [position])

    useEffect(() => {
        let array = expIsValid
        for(let i = 0; i<employer.length; i++){
            if(reqMin2(employer[i])){
                array[i][1] = true
            }else{
                array[i][1] = false
            }
        }
        addLocalStorage('expIsValid', [...array])
    }, [employer])

    useEffect(() => {
        let array = expIsValid
        for(let i = 0; i<experienceDescription.length; i++){
            if(experienceDescription !== undefined && experienceDescription[i].length > 0){
                array[i][4] = true
            }else{
                array[i][4] = false
            }
        }
        addLocalStorage('expIsValid', [...array])
    }, [experienceDescription])

    useEffect(() => {
        let array = expIsValid
        for(let i = 0; i<startDate.length; i++){
            if(isDate(startDate[i])){
                array[i][2] = true
            }else{
                array[i][2] = false
            }
        }
        addLocalStorage('expIsValid', [...array])
    }, [startDate])

    useEffect(() => {
        let array = expIsValid
        for(let i = 0; i<dueDate.length; i++){
            if(isDate(dueDate[i])){
                array[i][3] = true
            }else{
                array[i][3] = false
            }
        }
        addLocalStorage('expIsValid', [...array])
    }, [dueDate])

    const isAllValid = () => {
        for(let i = 0; i<expIsValid.length ;i++){
            if(i > 0 && (expIsValid.length - 1) === i && expIsValid.length !== 1){
                let counter = 0
                for(let j = 0; j<5; j++){
                    if(expInputChanged[i][j] === false){
                        counter += 1
                    }
                }
                if(counter === 5){
                    return true
                }
            }
            for(let j = 0; j<5; j++){
                if(expIsValid[i][j] === false){
                    return false
                }
            }
        }
        return true
    }
    

    if(expInputChanged[formNum.length - 1]!== undefined && expIsValid[formNum.length - 1] !== undefined){
    return (
        <div className="form e-form">
            <div className='back-sign' onClick={() => {
                    localStorage.clear()
                    props.clearData()
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
                                    <input className={expInputChanged[i][0] ? (expIsValid[i][0] ? 'valid' : 'invalid'): ''} 
                                        type='text' placeholder="დეველოპერი, დიზაინერი, ა.შ." value={position[i] || ''} onChange={(event) => {
                                        let array = position
                                        array[i] = event.target.value
                                        addLocalStorage('position', array)
                                        setPosition([...array])
                                        let changedArray = changed
                                        changedArray[i] = true
                                        setChanged([...changedArray])
                                        let expArray = expInputChanged
                                        expArray[i][0] = true
                                        setExpInputChanged([...expArray])
                                        addLocalStorage('expInputChanged', [...expArray])
                                    }}/>
                                    {(expInputChanged[i][0] && !expIsValid[i][0]) && <span className="invalid-span"></span> }
                                    <p className='input-validation'>მინიმუმ 2 სიმბოლო</p>
                                </div>
                                <div className="text-input long">
                                    <p className="label">დამსაქმებელი</p>
                                    <input className={expInputChanged[i][1]? (expIsValid[i][1] ? 'valid' : 'invalid'): ''} 
                                        type='text' placeholder="დამსაქმებელი" value={employer[i] || ''} onChange={(event) => {
                                        let array = employer
                                        array[i] = event.target.value
                                        addLocalStorage('employer', array)
                                        setEmployer([...array])
                                        let changedArray = changed
                                        changedArray[i] = true
                                        setChanged([...changedArray])
                                        let expArray = expInputChanged
                                        expArray[i][1] = true
                                        setExpInputChanged([...expArray])
                                        addLocalStorage('expInputChanged', [...expArray])
                                    }}/>
                                    {(expInputChanged[i][1] && !expIsValid[i][1]) && <span className="invalid-span"></span> }
                                    <p className='input-validation'>მინიმუმ 2 სიმბოლო</p>
                                </div>
                                <div className='two-input'>
                                    <div className="text-input">
                                        <p className="label">დაწყების რიცხვი</p>
                                        <input className={expInputChanged[i][2] ? (expIsValid[i][2] ? 'valid' : 'invalid'): ''} 
                                            type='date' value={startDate[i] || ''} onChange={(event) => {
                                            let array = startDate
                                            array[i] = event.target.value
                                            addLocalStorage('startDate', array)
                                            setStartDate([...array])
                                            let changedArray = changed
                                            changedArray[i] = true
                                            setChanged([...changedArray])
                                            let expArray = expInputChanged
                                            expArray[i][2] = true
                                            setExpInputChanged([...expArray])
                                            addLocalStorage('expInputChanged', [...expArray])
                                        }}/>
                                        {(expInputChanged[i][2] && !expIsValid[i][2]) && <span className="invalid-span"></span>}
                                    </div>
                                    <div className='text-input'>
                                        <p className="label">დამთავრების რიცხვი</p>
                                        <input className={expInputChanged[i][3] ? (expIsValid[i][3] ? 'valid' : 'invalid'): ''}  
                                            type='date' value={dueDate[i] || ''} onChange={(event) => {
                                            let array = dueDate
                                            array[i] = event.target.value
                                            addLocalStorage('dueDate', array)
                                            setDueDate([...array])
                                            let changedArray = changed
                                            changedArray[i] = true
                                            setChanged([...changedArray])
                                            let expArray = expInputChanged
                                            expArray[i][3] = true
                                            setExpInputChanged([...expArray])
                                            addLocalStorage('expInputChanged', [...expArray])
                                        }}/>
                                        {(expInputChanged[i][3] && !expIsValid[i][3]) && <span className="invalid-span"></span>}
                                    </div>
                                </div>
                                <div className="textarea-div">
                                    <p className='label'>აღწერა</p>
                                    <textarea className={expInputChanged[i][4]? (expIsValid[i][4] ? 'valid' : 'invalid'): ''}
                                        placeholder='როლი თანამდებობაზე და ზოგადი აღწერა' value={experienceDescription[i] || ''} onChange={(event) => {
                                        let array = experienceDescription
                                        array[i] = event.target.value
                                        addLocalStorage('experienceDescription', array)
                                        setExperienceDescription([...array])
                                        let changedArray = changed
                                        changedArray[i] = true
                                        setChanged([...changedArray])
                                        let expArray = expInputChanged
                                        expArray[i][4] = true
                                        setExpInputChanged([...expArray])
                                        addLocalStorage('expInputChanged', [...expArray])
                                    }}>
                                    </textarea>
                                    {(expInputChanged[i][4] && !expIsValid[i][4]) && <span className="invalid-span"></span>}
                                </div>
                                </div>
                            )}  
                        )
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
                        if(isAllValid()){
                            props.changePage(4)
                        }else{
                            let array = expInputChanged
                            let counter = 0
                            for(let i = 0; i<expInputChanged.length; i++){
                                if(i > 0 && (expInputChanged.length - 1) === i && expInputChanged.length !== 1){
                                    for(let j = 0; j<5; j++){
                                        if(array[i][j] === false){
                                            counter+=1
                                        }
                                    }
                                    if(counter !== 5){  
                                        for(let j = 0; j<5; j++){
                                            array[i][j] = true
                                        } 
                                    }
                                }
                            }
                            setExpInputChanged([...array])
                        }
                    }}>შემდეგი</button>
                </div>
            </div>
            
        </div>
    )}
}