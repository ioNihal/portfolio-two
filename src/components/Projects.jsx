import { forwardRef, useEffect, useState, useRef } from "react"
import styles from "../styles/Projects.module.css"

const Project = forwardRef((props, ref) => {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch('data/projects.json');
            const data = await response.json();
            setProjects(data);
        }

        fetchProjects();

    }, [])

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
            { threshold: 0.1 }
        );

        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    const handleProjectClick = (project) => {
        window.open(project.url, '_blank');
    }

    return (
        <div className={styles.container} ref={ref}>
            {
                projects.map(project => (
                    <div key={project.id} className={styles.project} onClick={() => handleProjectClick(project)}
                        style={{
                            transition: "all 1s ease",
                            transform: expanded
                                ? "translateY(0px) scale(1)"
                                : "translateY(50px) scale(0.9)",

                            opacity: expanded
                                ? "1"
                                : "0.5",

                        }}>
                        <img src={project.img} className={styles.img} alt={project.title} loading="lazy" />
                        <div className={styles.title}>{project.title}</div>
                    </div>
                ))
            }
        </div>
    )
})

export default Project