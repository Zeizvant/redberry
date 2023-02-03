import React from "react"
import './index.css'
import redberry from '../../images/redberry-name-logo.png'
import logo from '../../images/transparent-logo.png'

export const Landing = () => {
    return (
        <div className='landing-page'>
            <div className="redberry-logo">
                <img src={redberry} alt='redberry logo'/>
            </div>
            <div className="landing-main">
                <button className='landing-button'>ᲠᲔᲖᲘᲣᲛᲔᲡ ᲓᲐᲛᲐᲢᲔᲑᲐ</button>
            </div>
        </div>
    )
}