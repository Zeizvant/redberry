import React, { useContext, useEffect, useState } from "react"
import './index.css'
import img from '../../images/valid.png'
import at from '../../images/at.png'
import phone from '../../images/phone.png'
import logo from '../../images/logo.png'
import { UserContext } from "../../App"

export const Info = (props) => {

    const context = useContext(UserContext)
    const data = context.personInfoData
    const experienceData = context.experienceData
    const educationData = context.educationData


    const isChanged = (array) => {
        for(let i = 0; i<array.length; i++){
            if(array[i] === true){
                return true
            }
        }
        return false
    }
    return (
        <div className="positioning-info">
            <img className='logo' src={logo} alt='logo'/>
            <div className="info-component">
                <div className="person-info">
                    <div className="person-description">
                        {(data.name || data.lastName) && <h2>{`${data.name} ${data.lastName}`}</h2>}
                        {
                            data.email && 
                                <div className="info-row">
                                    <img src={at} alt='at symbol'/>
                                    <p>{data.email}</p>
                                </div>
                        }
                        
                        {
                            data.number &&
                            <div className="info-row">
                                    <img src={phone} alt='phone image'/>
                                    <p>{data.number}</p>
                                </div>
                        }
                        
                        {
                            data.about &&
                            <div className="about-me">
                                <h3>ᲩᲔᲛ ᲨᲔᲡᲐᲮᲔᲑ</h3>
                                <p>{data.about}</p>
                            </div>
                        }
                        
                    </div>
                    {data.image && <img src={data.image}/>}
                </div>
                {
                    isChanged(experienceData.changed) && experienceData.formNum.map((data, i) => {
                        const startDate = experienceData.startDate[i] === undefined ? '' : experienceData.startDate[i]
                        const dueDate = experienceData.dueDate[i] === undefined ? '' : experienceData.dueDate[i]
                        const position = experienceData.position[i] === undefined ? '' : experienceData.position[i] + ','
                        const employer = experienceData.employer[i] === undefined ? '' : experienceData.employer[i]
                        return (
                            <div key={data} className="person-experience-info">
                                <h3>ᲒᲐᲛᲝᲪᲓᲘᲚᲔᲑᲐ</h3>
                                {(position || employer) && <p className="place">{`${position} ${employer}`}</p>}
                                {(startDate || dueDate)  &&
                                    <p className="date">{`${startDate} - ${dueDate}`}</p>}
                                {
                                    experienceData.experienceDescription[i] && 
                                    <p>{experienceData.experienceDescription}</p>
                                }
                            </div>
                        )
                    })
                }
                {
                    isChanged(educationData.eduChanged) && educationData.eduFormNum.map((data, i) => {
                        const endDate = educationData.endDate[i] === undefined ? '' : educationData.endDate[i] 
                        const institute = educationData.institute[i] === undefined ? '' : educationData.institute[i] + ','
                        const degree = educationData.degree[i] === undefined ? '' : educationData.degree[i]
                        const description = educationData.educationDescription[i] === undefined ? '' : educationData.educationDescription[i]
                        return(
                            <div key={i} className="education">
                                <h3>ᲒᲐᲜᲐᲗᲚᲔᲑᲐ</h3>
                                {(institute || degree) && <p className="place">{institute + ' ' + degree}</p>}
                                {endDate && <p className="date">{endDate}</p>}
                                {description && <p>{description}</p>}
                            </div>
                        )
                    })
                }
                
            </div>
        </div>
    )
}