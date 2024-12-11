import { forwardRef } from "react";
import styles from "../styles/About.module.css";

const About = forwardRef((props, ref) => {
    return (
        <div className={styles.container} ref={ref}>
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
