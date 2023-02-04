import React from "react"
import './index.css'
import backSign from '../../images/back-sign.png'

export const Experience = () => {
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
                <div className="text-input long">
                    <p className="label">თანამდებობა</p>
                    <input type='text' placeholder="დეველოპერი, დიზაინერი, ა.შ." />
                    <p className='input-validation'>მინიმუმ 2 სიმბოლო</p>
                </div>
                <div className="text-input long">
                    <p className="label">დამსაქმებელი</p>
                    <input type='text' placeholder="დამსაქმებელი" />
                    <p className='input-validation'>მინიმუმ 2 სიმბოლო</p>
                </div>
                <div className='two-input'>
                    <div className="text-input">
                        <p className="label">დაწყების რიცხვი</p>
                        <input type='date'/>
                    </div>
                    <div className='text-input'>
                        <p className="label">დამთავრების რიცხვი</p>
                        <input type='date' />
                    </div>
                </div>
                <div className="textarea-div">
                    <p className='label'>აღწერა</p>
                    <textarea placeholder='როლი თანამდებობაზე და ზოგადი აღწერა'></textarea>
                </div>
                <div>
                    <button className="add-button">მეტი გამოცდილების დამატება</button>
                </div>
                <div className="navigation-buttons">
                    <button className='form-buttons'>უკან</button>
                    <button className='form-buttons'>შემდეგი</button>
                </div>
            </form>
        </div>
    )
}