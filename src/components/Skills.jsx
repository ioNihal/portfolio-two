import styles from "../styles/Skills.module.css";
import { useEffect, useState, useRef } from "react";
import { BiLogoMongodb } from "react-icons/bi";
import {
    FaBootstrap,
    FaCss3Alt,
    FaGitAlt,
    FaHtml5,
    FaJava,
    FaJsSquare,
    FaNodeJs,
    FaPhp,
    FaPython,
    FaReact,
} from "react-icons/fa";
import { SiExpress } from "react-icons/si";
import { TbBrandCpp } from "react-icons/tb";

const Skills = () => {
    const icons = [
        <FaJsSquare color="yellow" size={"3rem"} />,
        <FaReact color="skyblue" size={"3rem"} />,
        <FaPhp color="#474A8A" size={"3rem"} />,
        <BiLogoMongodb color="4DB33D" size={"3rem"} />,
        <SiExpress color="grey" size={"3rem"} />,
        <FaNodeJs color="green" size={"3rem"} />,
        <TbBrandCpp color="#5E97D0" size={"3rem"} />,
        <FaJava color="#0474BB" size={"3rem"} />,
        <FaHtml5 color="#E34E26" size={"3rem"} />,
        <FaCss3Alt color="#2162AF" size={"3rem"} />,
        <FaBootstrap color="#7952B3" size={"3rem"} />,
        <FaGitAlt color="#F05032" size={"3rem"} />,
        <FaPython color="#3776AB" size={"3rem"} />,
    ];

    const [expanded, setExpanded] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
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
        <div
            className={styles.container}
            ref={containerRef}
            style={{
                
            }}
        >
            {icons.map((Icon, index) => (
                <div
                    key={index}
                    className={styles.icon}
                    style={{
                        transition: "all 1s ease", 
                        transform: expanded
                            ? "translateY(0px) scale(1.1)" 
                            : "translateY(100px) scale(0.1)", 
                        
                        opacity: expanded
                            ? "1" 
                            : "0.1", 
                        
                    }}
                >
                    {Icon}
                </div>
            ))}
        </div>
    );
};

export default Skills;
