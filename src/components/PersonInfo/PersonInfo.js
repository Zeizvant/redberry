import React, { useContext, useEffect, useState } from "react"
import './index.css'
import backSign from '../../images/back-sign.png'
import { addLocalStorage } from "../../functions/addLocalStorage"
import { UserContext } from "../../App"
import { reqMin2Geo } from "../../validation/reqMin2Geo"
import { geoNumber } from "../../validation/geoNumber"
import { addSpacesToInput } from "../../functions/addSpacesToInput"
import { reqMail } from "../../validation/reqMail"

export const PersonInfo = (props) => {
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [about, setAbout] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [image, setImage] = useState(null)
    const [inputChanged, setInputChanged] = useState([false, false, false, false, false])
    const [isValid, setIsValid] = useState([false, false, false, false, false])
    const context = useContext(UserContext)

    useEffect(() => {
        const data = {
            name,
            lastName,
            about,
            email,
            number,
            image,
            inputChanged,
            isValid
        }
        props.sendData(data)
    }, [name, lastName, about, email, number, image, inputChanged, isValid])

    useEffect(() => {
        const {name, lastName, about, email, number, image, inputChanged, isValid} = context.personInfoData
        setName(name)
        setLastName(lastName)
        setAbout(about)
        setEmail(email)
        setNumber(number)
        setImage(image)
        setInputChanged(inputChanged)
        setIsValid(isValid)
    }, [])

    useEffect(() => {
        let array = isValid
        array[0] = reqMin2Geo(name)
        setIsValid([...array])
        addLocalStorage('isValid', [...array])
    }, [name])

    useEffect(() => {
        let array = isValid
        array[1] = reqMin2Geo(lastName)
        setIsValid([...array])
        addLocalStorage('isValid', [...array])
    }, [lastName])

    useEffect(() => {
        let array = isValid
        array[2] = inputChanged[2]
        setIsValid([...array])
        addLocalStorage('isValid', [...array])
    }, [image])

    useEffect(() => {
        let array = isValid
        array[3] = reqMail(email)
        setIsValid([...array])
        addLocalStorage('isValid', [...array])
    }, [email])

    useEffect(() => {
        let array = isValid
        array[4] = geoNumber(number)
        setIsValid([...array])
        addLocalStorage('isValid', [...array])
    }, [number])

    const isAllValid = () => {
        for(let i = 0; i<isValid.length ;i++){
            if(isValid[i] === false){
                return false
            }
        }
        return true
    }
    return (
        <div className='form'>
            <div className='back-sign' onClick={() => {
                    localStorage.clear()
                    props.clearData()
                    props.changePage(1)
            }}>
                <img src={backSign} alt='back sign button'/>
            </div>
            <div className='positioning'>
                <form>
                    <div className='form-header'>
                        <span>ᲞᲘᲠᲐᲓᲘ ᲘᲜᲤᲝ</span>
                        <span className='page-number'>1/3</span>
                    </div>
                    <div className='two-input'>
                        <div className="text-input">
                            <p className="label">სახელი</p>
                            <input className={inputChanged[0]?((isValid[0] ? 'valid' : 'invalid')): ''} type='text' placeholder="ანზორ" value={name} onChange={(event) => {
                                addLocalStorage('name', event.target.value)
                                setName(event.target.value)
                                let array = inputChanged
                                array[0] = true
                                setInputChanged([...array])
                                addLocalStorage('inputChanged', [...array])
                                }}/>
                                {(inputChanged[0] && !isValid[0]) && <span className="invalid-span"></span> }
                            <p className='input-validation'>მინიმუმ 2 ასო, ქართული ასოები</p>
                        </div>
                        
                        <div className='text-input'>
                            <p className="label">გვარი</p>
                            <input className={inputChanged[1]? ((isValid[1] ? 'valid' : 'invalid')): ''} type='text' placeholder="მუმლაძე" value={lastName} onChange={(event) => {
                                addLocalStorage('lastName', event.target.value)
                                setLastName(event.target.value)
                                let array = inputChanged
                                array[1] = true
                                setInputChanged([...array])
                                addLocalStorage('inputChanged', [...array])
                            }}/>
                            {(inputChanged[1] && !isValid[1]) && <span className="invalid-span"></span> }
                            <p className='input-validation'>მინიმუმ 2 ასო, ქართული ასოები</p>
                        </div>
                    </div>
                    <div className='photo-upload'>
                        <p className="label">პირადი ფოტოს ატვირთვა</p>
                        <input type='file' accept='image/*' id='upload-btn' hidden onChange={(event) => {
                            const reader = new FileReader()
                            reader.readAsDataURL(event.target.files[0])
                            reader.addEventListener('load', () => {
                                addLocalStorage('image', reader.result)
                                setImage(reader.result)
                                let array = inputChanged
                                array[2] = true
                                setInputChanged([...array])
                                addLocalStorage('inputChanged', [...array])
                            })
                        }}/>
                        {(inputChanged[2] && !isValid[2]) && <span className="invalid-span"></span> }
                        <label htmlFor='upload-btn'>ატვირთვა</label>
                    </div>
                    <div>
                        <p className='label'>ჩემ შესახებ (არასავალდებულო)</p>
                        <textarea placeholder='ზოგადი ინფო შენ შესახებ' value={about} onChange={(event) => {
                            addLocalStorage('about', event.target.value)
                            setAbout(event.target.value)
                        }}></textarea>
                    </div>
                    <div className="text-input long">
                        <p className="label">ელ.ფოსტა</p>
                        <input className={inputChanged[3]? (isValid[3] ? 'valid' : 'invalid'): ''} type='text' placeholder="anzorr666@redberry.ge" value={email} onChange={(event) => {
                            addLocalStorage('email', event.target.value)
                            setEmail(event.target.value)
                            let array = inputChanged
                            array[3] = true
                            setInputChanged([...array])
                            addLocalStorage('inputChanged', [...array])
                        }}/>
                        {(inputChanged[3] && !isValid[3]) && <span className="invalid-span"></span> }
                        <p className='input-validation'>უნდა მთავრდებოდეს @redberry.ge-ით</p>
                    </div>
                    <div className="text-input long">
                        <p className="label">მობილურის ნომერი</p>
                        <input className={inputChanged[4]? (isValid[4] ? 'valid' : 'invalid'): ''} type='text' placeholder="+995 551 12 34 56" value={number} onChange={(event) => {
                            addLocalStorage('number', event.target.value)
                            setNumber(event.target.value)
                            let array = inputChanged
                            array[4] = true
                            setInputChanged([...array])
                            addLocalStorage('inputChanged', [...array])
                        }} onKeyDown={(event) => {
                            let input = event.target.value
                            event.target.value = addSpacesToInput(input, event)
                        }}/>
                        {(inputChanged[4] && !isValid[4]) && <span className="invalid-span"></span> }
                        <p className='input-validation'>უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს</p>
                    </div> 
                </form>
                <div className="navigation-button">
                    <button type='button' className='form-buttons' onClick={() => {
                        if(isAllValid()){
                            props.changePage(3)
                        }else{
                            let array = inputChanged
                            array[2] = true
                            setInputChanged([...array])
                            addLocalStorage('inputChanged', [...array])
                        }
                    }}>შემდეგი</button>
                </div>  
            </div>
            
        </div>
    )
}