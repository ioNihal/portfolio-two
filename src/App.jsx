
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
  return (
    <div className="container">
      <Navbar targetRefs={[homeRef, aboutRef, contactRef]}/>
      <Intro ref={homeRef} />
      <Github />
      <About ref={aboutRef} />
      <Skills />
      <Projects />
      <Contact ref={contactRef} />
    </div>
  )
}

export default App
