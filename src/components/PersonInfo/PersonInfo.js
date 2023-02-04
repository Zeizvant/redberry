import React, { useState } from "react"
import './index.css'
import backSign from '../../images/back-sign.png'

export const PersonInfo = () => {
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [about, setAbout] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [image, setImage] = useState(null)

    return (
        
        <div className='form'>
            <div className='back-sign'>
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
                            setName(event.target.value)
                            }}/>
                        <p className='input-validation'>მინიმუმ 2 ასო, ქართული ასოები</p>
                    </div>
                    <div className='text-input'>
                        <p className="label">გვარი</p>
                        <input type='text' placeholder="მუმლაძე" value={lastName} onChange={(event) => {
                            setLastName(event.target.value)
                        }}/>
                        <p className='input-validation'>მინიმუმ 2 ასო, ქართული ასოები</p>
                    </div>
                </div>
                <div className='photo-upload'>
                    <p className="label">პირადი ფოტოს ატვირთვა</p>
                    <input type='file' accept='image/*' id='upload-btn' hidden onChange={(event) => {
                        setImage(event.target.files[0])
                        console.log(event.target.files[0])
                    }}/>
                    <label for='upload-btn'>ატვირთვა</label>
                </div>
                <div>
                    <p className='label'>ჩემ შესახებ (არასავალდებულო)</p>
                    <textarea placeholder='ზოგადი ინფო შენ შესახებ' value={about} onChange={(event) => {
                        setAbout(event.target.value)
                    }}></textarea>
                </div>
                <div className="text-input long">
                    <p className="label">ელ.ფოსტა</p>
                    <input type='text' placeholder="anzorr666@redberry.ge" value={email} onChange={(event) => {
                        setEmail(event.target.value)
                    }}/>
                    <p className='input-validation'>უნდა მთავრდებოდეს @redberry.ge-ით</p>
                </div>
                <div className="text-input long">
                    <p className="label">მობილურის ნომერი</p>
                    <input type='text' placeholder="+995 551 12 34 56" value={number} onChange={(event) => {
                        setNumber(event.target.value)
                    }}/>
                    <p className='input-validation'>უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს</p>
                </div>
                <button className='form-buttons'>შემდეგი</button>
            </form>
        </div>
    )
}