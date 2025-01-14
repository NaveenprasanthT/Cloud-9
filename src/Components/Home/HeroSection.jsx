import React, { useContext, useState } from 'react'
import styles from '@/styles/Home/Hero.module.css'
import { PopupContext } from '@/Context';
import emailjs from 'emailjs-com';
import axios from 'axios';
import { useRouter } from 'next/router';

const HeroSection = () => {

    // const [ sending, setSending ] = useState(true);
    const router = useRouter();
    const { setPopupOpen } = useContext(PopupContext);

    const [open, setOpen] = useState(false);
    const [sending, setSending] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSending(true);
        const leadData = formData
        axios.post('/api/zohonew', leadData)
            .then((response) => {
                console.log(response);
                setOpen(true);
                setSending(false);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: '',
                })
                router.push('/thankyou')
            })
            .catch((error) => {
                console.error('Error sending data:', error);
            });

        emailjs.send("service_pker1vg", "template_b0e6cwb", leadData, "5rfKZaLJ19e--qaGr")
            .then(() => {
                console.log('Email sent successfully.');
                // Clear the form after successful submission
            })
            .catch((error) => {
                console.error('Email failed to send : ', error);
            });
    }

    return (
        <div className={styles.heroWrap} id="home">
            <div className={styles.HeroSection}>
                <form onSubmit={handleSubmit} id="HeroSectionForm">
                    <div className={styles.titleMobile}>
                        <span>Cloud 9 Villa <br /> Nature Unbound<br /></span>
                        5BHK Villas<br /> Near Electronic City Bengaluru<br /> From 2.69 Cr* Onwards
                    </div>
                    <div className={styles.title}>
                        <span>Cloud 9 Villa Nature Unbound</span><br />
                        5BHK Villas Near Electronic City Bengaluru From 2.69 Cr* Onwards
                    </div>
                    <div className={styles.inputWrap}>
                        <input type="text" placeholder='Name' value={formData.name} name='name' onChange={handleInputChange} required />
                        <input type="email" placeholder='Email' value={formData.email} name='email' onChange={handleInputChange} required />
                        <input type="tel" placeholder='Phone Number' value={formData.phone} name='phone' onChange={handleInputChange} required />
                    </div>
                    <button className={styles.heroBtn} type='submit' style={{ cursor: sending === true ? 'not-allowed' : 'pointer' }}>{ sending === true ? 'Sending...' : 'SUBMIT'}</button>
                   {/*open && <p>Thank you for submitting. Our team will get back to you soon.</p>*/}
                </form>
                <div className={styles.enquire} onClick={() => setPopupOpen(true)}>Enquire Now</div>
            </div>
            <h2 className={styles.headerBottom}><span>Live Community Of  120+ Vibrant Families</span></h2>
        </div>
    )
}

export default HeroSection