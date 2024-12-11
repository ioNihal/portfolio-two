import { forwardRef, useState } from "react";
import styles from "../styles/Contact.module.css";

const Contact = forwardRef((props, ref) => {

    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        if (e.target.name === "message") {
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
        }
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(formData)
            const response = await fetch('https://9000-idx-portfolio-two-1733750856348.cluster-fu5knmr55rd44vy7k7pxk74ams.cloudworkstations.dev/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            console.log(response)

            if (response.ok) {
                const result = await response.json();
                console.log(result)
                setStatus(result.message);
                setFormData({ name: '', email: '', message: '' });
            } else {
                const error = await response.json();
                setStatus(error.error || 'Something went wrong.');
            }
        } catch (error) {
            setStatus('Error connecting to the server.');
            console.log(error);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>Contact Me!</div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder=" "
                        id="name"
                        className={styles.input}
                    />
                    <label htmlFor="name">Name</label>
                </div>
                <div className={styles.field}>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder=" "
                        id="email"
                        className={styles.input}
                    />
                    <label htmlFor="email">Email</label>
                </div>
                <div className={styles.field}>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder=" "
                        id="message"
                        className={styles.textarea}
                    />
                    <label htmlFor="message">Tell me something...</label>
                </div>
                <button className={styles.button} type="submit">Submit</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
});

export default Contact;
