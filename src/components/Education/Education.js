import React, { useEffect, useState } from "react"
import './index.css'
import backSign from '../../images/back-sign.png'
import { addLocalStorage } from "../../functions/addLocalStorage"

export const Education = (props) => {

    const [options, setOptions] = useState([])
    const [institute, setInstitute] = useState([])
    const [degree, setDegree] = useState([])
    const [endDate, setEndDate] = useState([])
    const [educationDescription, setEducationDescription] = useState([])
    const [eduFormNum, setEduFormNum] = useState([0])

    useEffect(() => {
        fetch('https://resume.redberryinternship.ge/api/degrees').then((response) => response.json())
        .then((data) => setOptions([...data]));
    }, [])

    useEffect(() => {
        const data = {institute, degree, endDate, educationDescription, eduFormNum}
        props.sendData(data)
    }, [institute, degree, endDate, educationDescription, eduFormNum])

    useEffect(() => {
        const institute = JSON.parse(localStorage.getItem('institute'))
        if(institute){
            setInstitute(institute)
        }
    }, [])

    useEffect(() => {
        const degree = JSON.parse(localStorage.getItem('degree'))
        if(degree){
            setDegree(degree)
        }
    }, [])

    useEffect(() => {
        const endDate = JSON.parse(localStorage.getItem('endDate'))
        if(endDate){
            setEndDate(endDate)
        }
    }, [])

    useEffect(() => {
        const educationDescription = JSON.parse(localStorage.getItem('educationDescription'))
        if(educationDescription){
            setEducationDescription(educationDescription)
        }
    }, [])

    useEffect(() => {
        const eduFormNum = JSON.parse(localStorage.getItem('eduFormNum'))
        if(eduFormNum){
            setEduFormNum(eduFormNum)
        }
    }, [])


    const addForm = () => {
        setEduFormNum([...eduFormNum, eduFormNum[eduFormNum.length - 1] + 1])
        addLocalStorage('eduFormNum', [...eduFormNum, eduFormNum[eduFormNum.length - 1] + 1])
    }
    return (
        <div className='form e-form'>
            <div className='back-sign'>
                <img src={backSign} alt='back sign button' onClick={() => {
                        localStorage.clear()
                        props.changePage(1)
                    }}/>
            </div>
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
                                    <input type='text' placeholder="სასწავლებელი" value={institute[i] || ''} onChange={(event) => {
                                        let array = institute
                                        array[i] = event.target.value
                                        addLocalStorage('institute', array)
                                        setInstitute([...array])
                                    }}/>
                                    <p className='input-validation'>მინიმუმ 2 სიმბოლო</p>
                                </div>
                                <div className='two-input'>
                                    <div className="text-input select">
                                        <p className="label">ხარისხი</p>
                                        <select name='degree' id='degree' value={degree[i] || ''} onChange={event => {
                                            let array = degree
                                            array[i] = event.target.value
                                            addLocalStorage('degree', array)
                                            setDegree([...array])
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
                                    </div>
                                    <div className="text-input">
                                        <p className="label">დამთავრების რიცხვი</p>
                                        <input type='date' value={endDate[i] || ''} onChange={(event) => {
                                            let array = endDate
                                            array[i] = event.target.value
                                            addLocalStorage('endDate', array)
                                            setEndDate([...array])
                                        }}/>
                                    </div>
                                </div>
                                <div className="textarea-div">
                                    <p className='label'>აღწერა</p>
                                    <textarea placeholder="განათლების აღწერა" value={educationDescription[i] || ''} onChange={(event) => {
                                        let array = educationDescription
                                        array[i] = event.target.value
                                        addLocalStorage('educationDescription', array)
                                        setEducationDescription([...array])
                                    }}></textarea>
                                </div>
                            </div>
                        )
                    })
                }
                <div>
                    <button type='button' className="add-button" onClick={addForm}>სხვა სასწავლებლის დამატება</button>
                </div>
                <div className="navigation-buttons">
                    <button type='button' className='form-buttons' onClick={() => {
                        props.changePage(3)
                    }}>უკან</button>
                    <button type='button' className='form-buttons' onClick={() => {
                        props.changePage(5)
                    }}>ᲓᲐᲡᲠᲣᲚᲔᲑᲐ</button>
                </div>
                
            </form>
        </div>
    )
}