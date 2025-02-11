import { FaDev, FaDiscord, FaGithubSquare, FaInstagramSquare, FaLinkedin } from 'react-icons/fa'
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
        url: 'https://github.com/ionihal'
    },
    {
        icon: <FaSquareXTwitter />,
        title: 'X',
        url: 'https://github.com/ionihal'
    },
    {
        icon: <FaInstagramSquare />,
        title: 'Instagram',
        url: 'https://github.com/ionihal'
    },
    {
        icon: <FaDev />,
        title: 'Dev',
        url: 'https://github.com/ionihal'
    },
    {
        icon: <SiMedium />,
        title: 'Medium',
        url: 'https://github.com/ionihal'
    },
    {
        icon: <FaDiscord />,
        title: 'Discord',
        url: 'https://github.com/ionihal'
    },


]


const Footer = () => {
    return (
        <div className={styles.container}>
            <ul className={styles.wrapper}>
                {
                    links.map((item, index) => (
                        <li key={index} className={styles.linkWrapper}>
                            <a href={item.url}>{item.icon}</a>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Footer