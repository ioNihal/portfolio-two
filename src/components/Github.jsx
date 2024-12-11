import styles from "../styles/Github.module.css"
import GitHubCalendar from "react-github-calendar"

const Github = () => {

    return (
        <div className={styles.container}>
           <GitHubCalendar username="ioNihal" />
        </div>
    )
}

export default Github