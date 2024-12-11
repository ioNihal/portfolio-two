import { forwardRef } from "react";
import styles from "../styles/Intro.module.css";

const Intro = forwardRef((props, ref) => {
    const { targetRef } = props;

    const handleClick = () => {
        if (targetRef && targetRef.current) {
            targetRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }

    return (
        <div className={styles.container} ref={ref}>
            <h1 className={styles.name}>Nihal K</h1>
            <h3 className={styles.title}>
                Passionate Web <span>Developer</span> & <span>Designer</span>
            </h3>
            <button className={styles.button} onClick={() => handleClick()}>Projects</button>
        </div>
    );
});

export default Intro;
