import { forwardRef, useEffect, useState } from "react"
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

    return (
        <div className={styles.container} ref={ref}>
            {
                projects.map(project => (
                    <div key={project.id} className={styles.project}>
                        <img src="images/test.png" className={styles.img} />
                        <div className={styles.title}>{project.title}</div>
                    </div>
                ))
            }
        </div>
    )
})

export default Project