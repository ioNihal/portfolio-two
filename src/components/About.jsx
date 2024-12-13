import { forwardRef, useEffect, useState } from "react";
import styles from "../styles/About.module.css";

const About = forwardRef((props, ref) => {

    const [expanded, setExpanded] = useState(false);
    useEffect(() => {
        const container = ref.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setExpanded(true);
                } else {
                    setExpanded(false);
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    return (
        <div className={styles.container} ref={ref}
        style={{
            transition: "all 1s ease", 
            transform: expanded
                ? "translateY(0px) scale(1)" 
                : "translateY(-50px) scale(0.9)", 
            
            opacity: expanded
                ? "1" 
                : "0.5", 
            
        }}>
            <div className={styles.title}>About Me!</div>
            <p className={styles.about}>
                Hi, I’m <span>Nihal</span>, a <span>web developer</span> from <span>Kasaragod</span>, <span>Kerala</span>.
                My passion for technology began over seven years ago when I first started learning <span>HTML</span> and <span>CSS</span>.
                Since then, I’ve explored various fields like animation, ethical hacking, and app development, but web development became my true focus.
                I’m currently pursuing a <span>BCA</span> in <span>Software Development</span> and <span>Web Design</span> and have experience working with tools like <span>React</span>, <span>Next.js</span>, and <span>NodeJS</span>.
                I enjoy building user-friendly <span>projects</span>, combining creativity with functionality to deliver seamless digital experiences.
                Let’s <span>connect</span> and create something amazing together!
            </p>
        </div>
    );
});

export default About;
