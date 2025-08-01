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
                Hi, I’m <span>Nihal</span>, a <span>web developer</span> based in <span>Kasaragod</span>, <span>Kerala</span>.
                My passion for <span>technology</span> began over seven years ago when I first started learning <span>HTML</span> and <span>CSS</span>.
                Since then I’ve explored animation, ethical hacking, and app development, but web development became my true focus.
                I recently graduated (2025 MAY) with a <span>BCA</span> in <span>Software Development</span> and <span>Web Design</span>,
                and I’ve built projects using <span>React</span>, <span>Next.js</span>, and <span>Node.js</span>.
                I love creating <span>user-friendly</span> experiences that blend <span>creativity</span> with <span>functionality</span>.
                Let’s connect and build something amazing together!
            </p>
        </div>
    );
});

export default About;
