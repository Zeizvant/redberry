import React, { useEffect, useState } from "react"
import './index.css'
import img from '../../images/valid.png'
import at from '../../images/at.png'
import phone from '../../images/phone.png'
import logo from '../../images/logo.png'

export const Info = (props) => {

    const data = props.personInfoData
    const experienceData = props.experienceData
    console.log(experienceData)
    return (
        <div className="info-component">
            <div className="person-info">
                <div className="person-description">
                    {data.name && data.lastName && <h2>{`${data.name} ${data.lastName}`}</h2>}
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
                            <p>ძალიან მიყვარს დიზაინის კეთება. დილით ადრე რომ 
                            ავდგები გამამხნევებელი ვარჯიშების მაგიერ დიზაინს ვაკეთებ. </p>
                        </div>
                    }
                    
                </div>
                {data.image && <img src={data.image}/>}
            </div>
            {
                experienceData.formNum != undefined && experienceData.formNum.map((data, i) => {
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
            
            <div className="education">
                <h3>ᲒᲐᲜᲐᲗᲚᲔᲑᲐ</h3>
                <p className="place">წმ. ანდრიას საპატრიარქოს სასწავლებელი, სტუდენტი</p>
                <p className="date">2020-09-09</p>
                <p>ვსწავლობდი გულმოდგინეთ. მყავდა ფრიადები. რაც შემეძლო — ვქენი. 
                    კომპიუტერები მიყვარდა. ვიჯექი ჩემთვის, ვაკაკუნებდი ამ კლავიშებზე. მეუნებოდნენ — დაჯექი, 
                    წაიკითხე რამე, რას აკაკუნებ, დრო მოვა და ჩაგიკაკუნებსო. აჰა, მოვიდა დრო და ვერა ვარ დეველოპერი?</p>
            </div>
            <img className='logo' src={logo} alt='logo'/>
        </div>
    )
}