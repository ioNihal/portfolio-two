
import './App.css'
import Github from './components/Github'
import Intro from './components/Intro'
import Navbar from './components/Navbar'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import { useRef } from 'react'
import Footer from './components/Footer'
import { Analytics } from "@vercel/analytics/react"

function App() {

  const aboutRef = useRef();
  const contactRef = useRef();
  const homeRef = useRef();
  const projectsRef = useRef();

  return (
    <div className="container">
      <Analytics />
      <Navbar targetRefs={[homeRef, aboutRef, contactRef]} />
      <Intro ref={homeRef} targetRef={projectsRef} />
      <Github />
      <About ref={aboutRef} />
      <Skills />
      <Projects ref={projectsRef} />
      <Contact ref={contactRef} />
      <Footer />
    </div>
  )
}

export default App
