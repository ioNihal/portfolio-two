import { MdOutlineWavingHand } from "react-icons/md"
import styles from "../styles/Navbar.module.css"

const Navbar = ({ targetRefs }) => {

    const [homeRef, aboutRef, contactRef] = targetRefs;
    const handleClick = (ref) => {
        ref.current.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <div className={styles.container}>
            <div className={styles.icon} onClick={() => handleClick(homeRef)}>
                <MdOutlineWavingHand />
            </div>
            <div className={styles.navbarContainer}>
                <ul className={styles.navbar}>
                    <li className={styles.navbarItem} onClick={() => handleClick(aboutRef)}>About</li>
                    <li className={styles.navbarItem}>Resume</li>
                    <li className={styles.navbarItem} onClick={() => handleClick(contactRef)}>Contact</li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar