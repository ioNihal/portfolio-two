import { FaDev, FaDiscord, FaGithubSquare, FaInstagram, FaInstagramSquare, FaLinkedin } from 'react-icons/fa'
import styles from '../styles/Footer.module.css'
import { FaSquareXTwitter } from 'react-icons/fa6'
import { SiMedium } from 'react-icons/si'

const links = [
    {
        icon: <FaGithubSquare />,
        title: 'Github',
        url: 'https://github.com/ionihal'
    },
    {
        icon: <FaLinkedin />,
        title: 'Linkedin',
        url: 'https://linkedin.com/in/n1hal'
    },
    {
        icon: <FaSquareXTwitter />,
        title: 'X',
        url: 'https://x.com/n1haaaal'
    },
    {
        icon: <FaInstagram />,
        title: 'Instagram',
        url: 'https://instagram.com/io.nihal'
    },
]


const Footer = () => {
    return (
        <footer className={styles.container}>
            <ul className={styles.wrapper}>
                {
                    links.map((item, index) => (
                        <li key={index} className={styles.linkWrapper}>
                            <a href={item.url} target="_blank" rel="noopener noreferrer">
                                {item.icon}
                            </a>
                        </li>
                    ))
                }
            </ul>
            <p className={styles.footerText}>© {new Date().getFullYear()} ioNihal</p>
            <hr className={styles.hr} />
        </footer>
    )
}

export default Footer