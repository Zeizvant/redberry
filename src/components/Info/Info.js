import React from "react"
import './index.css'
import img from '../../images/valid.png'
import at from '../../images/at.png'
import phone from '../../images/phone.png'

export const Info = () => {
    return (
        <div className="info-component">
            <div className="person-info">
                <div className="person-description">
                    <h2>ანზორ მუმლაძე</h2>
                    <div className="info-row">
                        <img src={at} alt='at symbol'/>
                        <p>anzorr666@redberry.ge</p>
                    </div>
                    <div className="info-row">
                        <img src={phone} alt='phone image'/>
                        <p>+995 597 63 45 16</p>
                    </div>
                    <div className="about-me">
                        <h3>ᲩᲔᲛ ᲨᲔᲡᲐᲮᲔᲑ</h3>
                        <p>ძალიან მიყვარს დიზაინის კეთება. დილით ადრე რომ 
                        ავდგები გამამხნევებელი ვარჯიშების მაგიერ დიზაინს ვაკეთებ. </p>
                    </div>
                </div>
                <img src={img}/>
            </div>
            <div className="person-experience-info">
                <h3>ᲒᲐᲛᲝᲪᲓᲘᲚᲔᲑᲐ</h3>
                <p className="place">React Native Developer, Microsoft</p>
                <p className="date">2020-09-23 - 2020-09-23</p>
                <p>Experienced Javascript Native Developer with 5 years in the industry. 
                    proficient withreact. Used problem-solving aptitude to 
                    encahge application performance by 14%.created data visualisation tools and integrated designs. </p>
            </div>
            <div className="education">
                <h3>ᲒᲐᲜᲐᲗᲚᲔᲑᲐ</h3>
                <p className="place">წმ. ანდრიას საპატრიარქოს სასწავლებელი, სტუდენტი</p>
                <p className="date">2020-09-09</p>
                <p>ვსწავლობდი გულმოდგინეთ. მყავდა ფრიადები. რაც შემეძლო — ვქენი. 
                    კომპიუტერები მიყვარდა. ვიჯექი ჩემთვის, ვაკაკუნებდი ამ კლავიშებზე. მეუნებოდნენ — დაჯექი, 
                    წაიკითხე რამე, რას აკაკუნებ, დრო მოვა და ჩაგიკაკუნებსო. აჰა, მოვიდა დრო და ვერა ვარ დეველოპერი?</p>
            </div>
        </div>
    )
}