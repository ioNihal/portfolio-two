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
            
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });



            if (response.ok) {
                const result = await response.json();

                setStatus(result.message);
                setFormData({ name: '', email: '', message: '' });
            } else {
                const error = await response.json();
                setStatus(error.error || 'Something went wrong.');
            }
        } catch (error) {
            setStatus('Error connecting to the server.');
        }
    }

    return (
        <div className={styles.container} ref={ref}>
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
                        required
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
                        required
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
                        required
                    />
                    <label htmlFor="message">Tell me something...</label>
                </div>
                <button className={styles.button} type="submit">Submit</button>
            </form>
            {status && <div className={styles.error}>{status}</div>}
        </div>
    );
});

export default Contact;
