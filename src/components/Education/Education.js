import React, { useCallback, useContext, useEffect, useState } from "react"
import './index.css'
import backSign from '../../images/back-sign.png'
import { addLocalStorage } from "../../functions/addLocalStorage"
import { UserContext } from "../../App"
import { reqMin2 } from "../../validation/reqMin2"
import { isDate } from "../../validation/isDate"

export const Education = (props) => {

    const [options, setOptions] = useState([])
    const [institute, setInstitute] = useState([])
    const [degree, setDegree] = useState([])
    const [endDate, setEndDate] = useState([])
    const [educationDescription, setEducationDescription] = useState([])
    const [eduFormNum, setEduFormNum] = useState([0])
    const [eduChanged, setEduChanged] = useState([false])
    const [eduInputChanged, setEduInputChanged] = useState([[false, false, false, false]])
    const [eduIsValid, SetEduIsValid] = useState([[false, false, false, false]])
    const context = useContext(UserContext)

    useEffect(() => {
        fetch('https://resume.redberryinternship.ge/api/degrees').then((response) => response.json())
        .then((data) => setOptions([...data]));
    }, [])

    useEffect(() => {
        const data = {institute, degree, endDate, educationDescription, eduFormNum, eduChanged, eduInputChanged, eduIsValid}
        props.sendData(data)
    }, [institute, degree, endDate, educationDescription, eduFormNum, eduChanged, eduInputChanged, eduChanged, eduIsValid])

    useEffect(() => {
        const {institute, degree, endDate, educationDescription, eduFormNum, eduChanged,eduInputChanged, eduIsValid} = context.educationData
        setInstitute(institute)
        setDegree(degree)
        setEndDate(endDate)
        setEducationDescription(educationDescription)
        setEduFormNum(eduFormNum)
        setEduChanged(eduChanged)
        setEduInputChanged(eduInputChanged)
        SetEduIsValid(eduIsValid)
    }, [])


    const addForm = () => {
        setEduFormNum([...eduFormNum, eduFormNum[eduFormNum.length - 1] + 1])
        setEduInputChanged([...eduInputChanged, [false, false, false, false]])
        SetEduIsValid([...eduIsValid, [false, false, false, false]])
        addLocalStorage('eduFormNum', [...eduFormNum, eduFormNum[eduFormNum.length - 1] + 1])
        addLocalStorage('eduInputChanged', [...eduInputChanged, [false, false, false, false]])
        addLocalStorage('eduIsValid', [...eduIsValid, [false, false, false, false]])
    }

    useEffect(() => {
        addLocalStorage('eduChanged', eduChanged)
    }, [eduChanged])

    useEffect(() => {
        let array = eduIsValid
        for(let i = 0; i<institute.length; i++){
            if(reqMin2(institute[i])){
                array[i][0] = true
            }else{
                array[i][0] = false
            }
        }
        addLocalStorage('eduIsValid', [...array])
    }, [institute])

    useEffect(() => {
        let array = eduIsValid
        for(let i = 0; i<degree.length; i++){
            if(degree !== undefined && degree[i].length > 0){
                array[i][1] = true
            }else{
                array[i][1] = false
            }
        }
        addLocalStorage('eduIsValid', [...array])
    }, [degree])

    useEffect(() => {
        let array = eduIsValid
        for(let i = 0; i<educationDescription.length; i++){
            if(educationDescription !== undefined && educationDescription[i].length > 0){
                array[i][3] = true
            }else{
                array[i][3] = false
            }
        }
        addLocalStorage('eduIsValid', [...array])
    }, [educationDescription])

    useEffect(() => {
        let array = eduIsValid
        for(let i = 0; i<endDate.length; i++){
            if(isDate(endDate[i])){
                array[i][2] = true
            }else{
                array[i][2] = false
            }
        }
        addLocalStorage('eduIsValid', [...array])
    }, [endDate])

    const isAllValid = () => {
        for(let i = 0; i<eduIsValid.length ;i++){
            if(i > 0 && (eduIsValid.length - 1) === i && eduIsValid.length !== 1){
                let counter = 0
                for(let j = 0; j<5; j++){
                    if(eduInputChanged[i][j] === false){
                        counter += 1
                    }
                }
                if(counter === 5){
                    return true
                }
            }
            for(let j = 0; j<5; j++){
                if(eduIsValid[i][j] === false){
                    return false
                }
            }
        }
        return true
    }

    const sendApiData = () => {
        const {name, lastName, about, email, number, image, inputChanged, isValid} = context.personInfoData
        const {position, employer, startDate, dueDate, experienceDescription, formNum, changed, expInputChanged, expIsValid} = context.experienceData
        let exp = []
        let edu = []
        for(let i = 0; i<position.length; i++){
            let data = {
                position: position[i],
                employer: employer[i],
                start_date: startDate[i],
                due_date: dueDate[i],
                description: experienceDescription[i]
            }
            exp.push(data)
        }
        for(let j = 0; j<institute.length; j++){
            let data = {
                institute: institute[j],
                degree: degree[j],
                due_date: endDate[j],
                description: educationDescription[j]
            }
            edu.push(data)

        }
        const data = {
            name: name,
            surname: lastName,
            email: email,
            phone_number: number,
            experiences: exp,
            educations: edu,
            image: image,
            about_me: about
        }
        fetch('https://resume.redberryinternship.ge/api/cvs', {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok) {
                return response
            }
        }).then(data => {
            console.log(data);
        }).then(error => {
            console.log(error);
        })
        
    }
    
    if(eduInputChanged[eduFormNum.length - 1]!== undefined && eduIsValid[eduFormNum.length - 1] !== undefined){
    return (
        <div className='form e-form'>
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
                        <span>განათლება</span>
                        <span className='page-number'>3/3</span>
                    </div>
                    {
                        eduFormNum.map(i => {
                            return (
                                <div key={i} className='form-quantity'>
                                    <div className="text-input long">
                                        <p className="label">სასწავლებელი</p>
                                        <input className={eduInputChanged[i][0] ? (eduIsValid[i][0] ? 'valid' : 'invalid'): ''}
                                            type='text' placeholder="სასწავლებელი" value={institute[i] || ''} onChange={(event) => {
                                            let array = institute
                                            array[i] = event.target.value
                                            addLocalStorage('institute', array)
                                            setInstitute([...array])
                                            let changedArray = eduChanged
                                            changedArray[i] = true
                                            setEduChanged([...changedArray])
                                            let eduArray = eduInputChanged
                                            eduArray[i][0] = true
                                            setEduInputChanged([...eduArray])
                                            addLocalStorage("eduInputChanged", [...eduArray])
                                        }}/>
                                        {(eduInputChanged[i][0] && !eduIsValid[i][0]) && <span className="invalid-span"></span>}
                                        <p className='input-validation'>მინიმუმ 2 სიმბოლო</p>
                                    </div>
                                    <div className='two-input'>
                                        <div className="text-input select">
                                            <p className="label">ხარისხი</p>
                                            <select className={eduInputChanged[i][1] ? (eduIsValid[i][1] ? 'valid' : 'invalid'): ''}
                                                name='degree' id='degree' value={degree[i] || ''} onChange={event => {
                                                let array = degree
                                                array[i] = event.target.value
                                                addLocalStorage('degree', array)
                                                setDegree([...array])
                                                let changedArray = eduChanged
                                                changedArray[i] = true
                                                setEduChanged([...changedArray])
                                                let eduArray = eduInputChanged
                                                eduArray[i][1] = true
                                                setEduInputChanged([...eduArray])
                                                addLocalStorage("eduInputChanged", [...eduArray])
                                            }}>
                                                <option value='' disabled>აირჩიეთ ხარისხი</option>
                                                {
                                                    options.map((option) => {
                                                        return (
                                                            <option key={option.id} value={option.title}>{option.title}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <span className="select-span"></span>
                                            {(eduInputChanged[i][1] && !eduIsValid[i][1]) && <span className="invalid-span"></span>}
                                        </div>
                                        <div className="text-input">
                                            <p className="label">დამთავრების რიცხვი</p>
                                            <input className={eduInputChanged[i][2] ? (eduIsValid[i][2] ? 'valid' : 'invalid'): ''}
                                                type='date' value={endDate[i] || ''} onChange={(event) => {
                                                let array = endDate
                                                array[i] = event.target.value
                                                addLocalStorage('endDate', array)
                                                setEndDate([...array])
                                                let changedArray = eduChanged
                                                changedArray[i] = true
                                                setEduChanged([...changedArray])
                                                let eduArray = eduInputChanged
                                                eduArray[i][2] = true
                                                setEduInputChanged([...eduArray])
                                                addLocalStorage("eduInputChanged", [...eduArray])
                                            }}/>
                                            {(eduInputChanged[i][2] && !eduIsValid[i][2]) && <span className="invalid-span"></span>}
                                        </div>
                                    </div>
                                    <div className="textarea-div">
                                        <p className='label'>აღწერა</p>
                                        <textarea className={eduInputChanged[i][3] ? (eduIsValid[i][3] ? 'valid' : 'invalid'): ''}
                                            placeholder="განათლების აღწერა" value={educationDescription[i] || ''} onChange={(event) => {
                                            let array = educationDescription
                                            array[i] = event.target.value
                                            addLocalStorage('educationDescription', array)
                                            setEducationDescription([...array])
                                            let changedArray = eduChanged
                                            changedArray[i] = true
                                            setEduChanged([...changedArray])
                                            let eduArray = eduInputChanged
                                            eduArray[i][3] = true
                                            setEduInputChanged([...eduArray])
                                            addLocalStorage("eduInputChanged", [...eduArray])
                                        }}></textarea>
                                        {(eduInputChanged[i][3] && !eduIsValid[i][3]) && <span className="invalid-span"></span>}
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div>
                        <button type='button' className="add-button" onClick={addForm}>სხვა სასწავლებლის დამატება</button>
                    </div>
                </form>
                <div className="navigation-buttons">
                    <button type='button' className='form-buttons' onClick={() => {
                        props.changePage(3)
                    }}>უკან</button>
                    <button type='button' className='form-buttons' onClick={() => {
                        if(isAllValid()){
                            sendApiData()
                            props.changePage(5)
                        }else{
                            let array = eduInputChanged
                            let counter = 0
                            for(let i = 0; i<eduInputChanged.length; i++){
                                if(i > 0 && (eduInputChanged.length - 1) === i && eduInputChanged.length !== 1){
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
                            setEduInputChanged([...array])
                        }
                    }}>ᲓᲐᲡᲠᲣᲚᲔᲑᲐ</button>
                </div>
            </div>
            
        </div>
    )}
}