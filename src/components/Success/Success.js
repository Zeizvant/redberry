import React, { useState } from "react"
import './index.css'
import backSign from '../../images/back-sign.png'
import { Info } from "../Info/Info"
import X from '../../images/X.png'

export const Success = (props) => {

    const [popUp, setPopUp] = useState(true)

    return (
        <div className='success'>
            <div className='back-sign' onClick={() => {
                    localStorage.clear()
                    props.changePage(1)
            }}>
                <img src={backSign} alt='back sign button'/>
            </div>
            <div className='success-info'>
                <Info />
            </div>
            {   
                popUp &&
                <div className="success-pop-up">
                    რეზიუმე წარმატებით გაიგზავნა  🎉
                    <img className="x" src={X} onClick={() => {
                        setPopUp(false)
                    }}/>
                </div>
            }
        </div>
    )
}