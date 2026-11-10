import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars, Sparkles, OrbitControls, Html } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, Menu, X, Swords, ScrollText, Shield, Sparkles as SparkleIcon, Code2, Compass, ExternalLink } from 'lucide-react'
import * as THREE from 'three'

const projects = [
  { title: 'Questboard', type: 'Full-stack application', level: 'Epic', description: 'A quest-tracking dashboard for turning big goals into small, actionable missions.', tech: ['React', 'Tailwind', 'Node.js'], icon: '📜', color: '#8b7cff', link: 'https://github.com/' },
  { title: 'Pixel Pantry', type: 'Frontend experience', level: 'Rare', description: 'A playful recipe discovery interface with searchable collections and saved favorites.', tech: ['React', 'CSS', 'API'], icon: '🍄', color: '#54d6bd', link: 'https://github.com/' },
  { title: 'Guild Portal', type: 'UI / UX concept', level: 'Legendary', description: 'A responsive portal concept for a fictional adventurers guild and its members.', tech: ['JavaScript', 'Figma', 'Tailwind'], icon: '🏰', color: '#f0b45f', link: 'https://github.com/' },
]

const skills = [
  { name: 'React', rank: 'Adept', progress: 78 },
  { name: 'JavaScript', rank: 'Adept', progress: 72 },
  { name: 'HTML & CSS', rank: 'Skilled', progress: 88 },
  { name: 'Tailwind CSS', rank: 'Skilled', progress: 82 },
  { name: 'Three.js', rank: 'Apprentice', progress: 34 },
]

function FloatingIsland() {
  const group = useRef()
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.055
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.55) * 0.13
    }
  })
  return <group ref={group}>
    <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.2}>
      <mesh position={[0, 0.25, 0]} castShadow>
        <cylinderGeometry args={[2.5, 1.5, 0.8, 7, 1]} />
        <meshStandardMaterial color="#304c50" roughness={0.95} />
      </mesh>
      <mesh position={[0, -0.55, 0]} rotation={[0, 0, 0.04]}>
        <coneGeometry args={[1.45, 1.8, 7]} />
        <meshStandardMaterial color="#263943" roughness={1} />
      </mesh>
      <mesh position={[0, 0.72, 0]}>
        <cylinderGeometry args={[2.25, 2.25, 0.16, 7]} />
        <meshStandardMaterial color="#577a59" roughness={1} />
      </mesh>
      {Array.from({ length: 9 }).map((_, i) => {
        const a = (i / 9) * Math.PI * 2
        const x = Math.cos(a) * (1.25 + (i % 3) * 0.18)
        const z = Math.sin(a) * (1.25 + (i % 2) * 0.2)
        return <group key={i} position={[x, 0.9, z]}>
          <mesh position={[0, 0.42, 0]} castShadow>
            <cylinderGeometry args={[0.045, 0.08, 0.85, 5]} />
            <meshStandardMaterial color="#5b4738" />
          </mesh>
          <mesh position={[0, 1.0, 0]} castShadow>
            <coneGeometry args={[0.36 + (i % 2) * 0.12, 0.95, 6]} />
            <meshStandardMaterial color={i % 2 ? '#376d5b' : '#477e68'} />
          </mesh>
        </group>
      })}
      <group position={[0, 0.82, -0.15]}>
        <mesh position={[0, 0.52, 0]} castShadow>
          <boxGeometry args={[0.95, 1.05, 0.8]} />
          <meshStandardMaterial color="#8b7765" />
        </mesh>
        <mesh position={[0, 1.12, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[0.78, 0.72, 4]} />
          <meshStandardMaterial color="#4e384f" />
        </mesh>
        <mesh position={[0, 0.42, 0.41]}>
          <planeGeometry args={[0.23, 0.42]} />
          <meshBasicMaterial color="#f7c978" />
        </mesh>
      </group>
      <mesh position={[0, -1.52, 0]}>
        <torusGeometry args={[1.65, 0.035, 8, 48]} />
        <meshBasicMaterial color="#7ee8dc" transparent opacity={0.65} />
      </mesh>
    </Float>
  </group>
}

function Scene() {
  return <Canvas camera={{ position: [0, 2.4, 8.8], fov: 42 }} dpr={[1, 1.6]} shadows>
    <color attach="background" args={['#090d19']} />
    <fog attach="fog" args={['#090d19', 9, 21]} />
    <ambientLight intensity={0.8} />
    <directionalLight position={[5, 8, 5]} intensity={2.1} castShadow />
    <pointLight position={[-4, 1, -3]} color="#8b7cff" intensity={25} distance={12} />
    <pointLight position={[4, -1, 2]} color="#59d7c4" intensity={12} distance={10} />
    <Stars radius={80} depth={45} count={1800} factor={3} saturation={0.25} fade speed={0.5} />
    <Sparkles count={95} scale={[12, 7, 12]} size={2.2} speed={0.25} color="#b9a8ff" opacity={0.7} />
    <FloatingIsland />
    <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={1.05} maxPolarAngle={1.9} autoRotate autoRotateSpeed={0.35} />
  </Canvas>
}

function SectionTitle({ eyebrow, title, text }) {
  return <div className="section-heading">
    <div className="eyebrow"><span />{eyebrow}</div>
    <h2>{title}</h2>
    {text && <p>{text}</p>}
  </div>
}

function App() {
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const nav = ['home', 'about', 'skills', 'quests', 'contact']
  const goTo = (id) => {
    setActive(id)
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return <main>
    <header className="topbar">
      <a className="brand" href="#home" onClick={(e) => { e.preventDefault(); goTo('home') }}>
        <span className="brand-mark"><Swords size={19} /></span>
        <span>THE DEVELOPER'S <b>GUILD</b></span>
      </a>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
        {nav.map((item) => <button key={item} className={active === item ? 'nav-active' : ''} onClick={() => goTo(item)}>{item}</button>)}
      </nav>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
      <button className="header-cta" onClick={() => goTo('contact')}>Summon me <ArrowUpRight size={15} /></button>
    </header>

    <section id="home" className="hero">
      <div className="hero-copy">
        <div className="status"><span className="status-dot" /> AVAILABLE FOR NEW QUESTS</div>
        <p className="hero-kicker">PLAYER ONE <span>·</span> FRONTEND DEVELOPER</p>
        <h1>Building digital<br /><em>worlds</em>, one line<br />at a time.</h1>
        <p className="hero-description">Hey, adventurer. I'm <strong>[Your Name]</strong> — a developer who turns ideas into engaging, thoughtful web experiences. This is my little corner of the realm.</p>
        <div className="hero-actions">
          <button className="primary-btn" onClick={() => goTo('quests')}>Explore my quests <Compass size={17} /></button>
          <button className="text-btn" onClick={() => goTo('about')}>Meet the developer <ArrowDown size={16} /></button>
        </div>
        <div className="hero-meta"><span><b>03</b> FEATURED QUESTS</span><i /> <span><b>05</b> CORE SKILLS</span><i /> <span><b>LV. 01</b> CURRENT RANK</span></div>
      </div>
      <div className="scene-wrap">
        <div className="scene-label"><span className="scene-label-icon">✦</span><div><b>THE WHISPERING ISLES</b><small>Explore the realm · Drag to rotate</small></div></div>
        <Scene />
        <div className="scene-coordinates">WORLD 01 <span>·</span> THE FRONTIER</div>
      </div>
      <div className="scroll-cue" onClick={() => goTo('about')}><span /> SCROLL TO EXPLORE</div>
    </section>

    <section id="about" className="content-section about-section">
      <SectionTitle eyebrow="THE ADVENTURER'S LOG" title="A little about me" text="Every great adventure starts with curiosity. Here's the story behind the screen." />
      <div className="about-grid">
        <div className="profile-card">
          <div className="profile-top"><span className="profile-icon">✧</span><span>CHARACTER PROFILE</span><span className="profile-level">LV. 01</span></div>
          <div className="avatar-placeholder"><div className="avatar-orbit orbit-one" /><div className="avatar-orbit orbit-two" /><span>⚔</span></div>
          <h3>[Your Name]</h3><p className="role">FRONTEND DEVELOPER · THE WEB REALM</p>
          <div className="profile-stats"><div><b>03</b><small>PROJECTS</small></div><div><b>05</b><small>SKILLS</small></div><div><b>∞</b><small>CURIOSITY</small></div></div>
        </div>
        <div className="about-copy">
          <div className="quote-mark">“</div>
          <p className="about-lead">I believe the best digital experiences feel a little like magic.</p>
          <p>I'm a curious builder who enjoys solving problems, learning new tools, and bringing ideas to life on the web. I care about the details: clean interfaces, accessible experiences, and interactions that feel good to use.</p>
          <p>I'm currently growing my skills in modern frontend development and exploring the creative possibilities of 3D on the web. Every project is another chance to level up.</p>
          <div className="about-tags"><span>Curious by nature</span><span>Always learning</span><span>Team-minded</span></div>
        </div>
      </div>
    </section>

    <section id="skills" className="content-section skills-section">
      <SectionTitle eyebrow="THE SKILL TREE" title="Abilities & tools" text="The abilities I've collected on my journey so far — and the ones I'm still leveling up." />
      <div className="skills-layout">
        <div className="skill-list">{skills.map((skill, i) => <div className="skill-row" key={skill.name}>
          <div className="skill-topline"><span><i>{['✦','⌘','◇','▧','◈'][i]}</i>{skill.name}</span><small>{skill.rank}</small></div>
          <div className="skill-track"><motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.progress}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * .12 }} /></div>
        </div>)}</div>
        <div className="skill-note"><SparkleIcon size={23} /><h3>Always gaining XP</h3><p>My skill tree is a work in progress. I'm currently focused on strengthening my JavaScript foundations and learning to create immersive 3D experiences with Three.js.</p><div className="xp-bar"><span /></div><small>NEXT LEVEL: IN PROGRESS</small></div>
      </div>
    </section>

    <section id="quests" className="content-section quests-section">
      <SectionTitle eyebrow="THE QUEST BOARD" title="Selected adventures" text="A few things I've built, experimented with, and learned from along the way." />
      <div className="quest-grid">{projects.map((project, i) => <motion.article className="quest-card" key={project.title} whileHover={{ y: -7 }} transition={{ duration: .2 }}>
        <div className="quest-card-top"><span className="quest-number">QUEST 0{i + 1}</span><span className="rarity" style={{ color: project.color, borderColor: `${project.color}66` }}>{project.level}</span></div>
        <div className="quest-art" style={{ '--accent': project.color }}><div className="art-glow" /><span>{project.icon}</span><div className="art-rune">✧</div></div>
        <div className="quest-info"><small>{project.type}</small><h3>{project.title}</h3><p>{project.description}</p><div className="tech-list">{project.tech.map(t => <span key={t}>{t}</span>)}</div>
        <button className="quest-link" onClick={() => setSelectedProject(project)}>View quest details <ArrowUpRight size={16} /></button></div>
      </motion.article>)}</div>
      <p className="quest-footnote"><ScrollText size={15} /> More quests are being prepared for the board.</p>
    </section>

    <section id="contact" className="content-section contact-section">
      <div className="contact-panel">
        <div className="contact-sigil">✧</div>
        <SectionTitle eyebrow="YOUR NEXT PARTY MEMBER?" title="Let's build something" text="Have a project, an opportunity, or just want to talk about making cool things? My inbox is open." />
        <a className="primary-btn contact-btn" href="mailto:hello@example.com">Send a message <Mail size={17} /></a>
        <div className="social-links"><a href="https://github.com/" target="_blank" rel="noreferrer"><Github size={17} /> GitHub <ExternalLink size={12} /></a><a href="https://linkedin.com/" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn <ExternalLink size={12} /></a></div>
      </div>
    </section>

    <footer><a className="brand footer-brand" href="#home"><span className="brand-mark"><Swords size={17} /></span><span>THE DEVELOPER'S <b>GUILD</b></span></a><span>FORGED WITH CURIOSITY <i>✦</i> © 2026</span><button onClick={() => goTo('home')}>BACK TO TOP ↑</button></footer>

    <AnimatePresence>{selectedProject && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)}>
      <motion.div className="quest-modal" initial={{ y: 25, opacity: 0, scale: .97 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 15, opacity: 0 }} onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close"><X /></button>
        <span className="eyebrow"><span /> QUEST DETAILS</span><div className="modal-icon">{selectedProject.icon}</div><small>{selectedProject.level} QUEST</small><h2>{selectedProject.title}</h2><p>{selectedProject.description}</p><div className="tech-list">{selectedProject.tech.map(t => <span key={t}>{t}</span>)}</div><a className="primary-btn" href={selectedProject.link} target="_blank" rel="noreferrer">Open project <ArrowUpRight size={16} /></a>
        <p className="modal-hint">Replace this placeholder GitHub link with your actual project URL.</p>
      </motion.div>
    </motion.div>}</AnimatePresence>
  </main>
}

export default App
