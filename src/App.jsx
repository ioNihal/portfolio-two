
import './App.css'
import Github from './components/Github'
import Intro from './components/Intro'
import Navbar from './components/Navbar'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import { useRef } from 'react'

function App() {

  const aboutRef = useRef();
  const contactRef = useRef();
  const homeRef = useRef();
  const projectsRef = useRef();

  return (
    <div className="container">
      <Navbar targetRefs={[homeRef, aboutRef, contactRef]} />
      <Intro ref={homeRef} targetRef={projectsRef} />
      <Github />
      <About ref={aboutRef} />
      <Skills />
      <Projects ref={projectsRef} />
      <Contact ref={contactRef} />
    </div>
  )
}

export default App
