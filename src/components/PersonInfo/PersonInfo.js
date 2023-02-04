import React, { useEffect, useState } from "react"
import './index.css'
import backSign from '../../images/back-sign.png'
import { addLocalStorage } from "../../functions/addLocalStorage"

export const PersonInfo = () => {
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [about, setAbout] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [image, setImage] = useState(null)

    useEffect(() => {
        const name = JSON.parse(localStorage.getItem('name'))
        if(name){
            setName(name)
        }
    }, [])
    useEffect(() => {
        const lastName = JSON.parse(localStorage.getItem('lastName'))
        if(lastName){
            setLastName(lastName)
        }
    }, [])
    useEffect(() => {
        const about = JSON.parse(localStorage.getItem('about'))
        if(about){
            setAbout(about)
        }
    }, [])
    useEffect(() => {
        const email = JSON.parse(localStorage.getItem('email'))
        if(email){
            setEmail(email)
        }
    }, [])
    useEffect(() => {
        const number = JSON.parse(localStorage.getItem('number'))
        if(number){
            setNumber(number)
        }
    }, [])
    useEffect(() => {
        const image = JSON.parse(localStorage.getItem('image'))
        if(image){
            setImage(image)
        }
    }, [])
    return (
        <div className='form'>
            <div className='back-sign'>
                {image && <img src={image} />}
                <img src={backSign} alt='back sign button'/>
            </div>
            <form>
                <div className='form-header'>
                    <span>ᲞᲘᲠᲐᲓᲘ ᲘᲜᲤᲝ</span>
                    <span className='page-number'>1/3</span>
                </div>
                <div className='two-input'>
                    <div className="text-input">
                        <p className="label">სახელი</p>
                        <input type='text' placeholder="ანზორ" value={name} onChange={(event) => {
                            addLocalStorage('name', event.target.value)
                            setName(event.target.value)
                            }}/>
                        <p className='input-validation'>მინიმუმ 2 ასო, ქართული ასოები</p>
                    </div>
                    <div className='text-input'>
                        <p className="label">გვარი</p>
                        <input type='text' placeholder="მუმლაძე" value={lastName} onChange={(event) => {
                            addLocalStorage('lastName', event.target.value)
                            setLastName(event.target.value)
                        }}/>
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
                        })
                        setImage(event.target.files[0])
                    }}/>
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
                    <input type='text' placeholder="anzorr666@redberry.ge" value={email} onChange={(event) => {
                        addLocalStorage('email', event.target.value)
                        setEmail(event.target.value)
                    }}/>
                    <p className='input-validation'>უნდა მთავრდებოდეს @redberry.ge-ით</p>
                </div>
                <div className="text-input long">
                    <p className="label">მობილურის ნომერი</p>
                    <input type='text' placeholder="+995 551 12 34 56" value={number} onChange={(event) => {
                        addLocalStorage('number', event.target.value)
                        setNumber(event.target.value)
                    }}/>
                    <p className='input-validation'>უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს</p>
                </div>
                <button className='form-buttons'>შემდეგი</button>
            </form>
        </div>
    )
}