import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Certifications from '../components/Certifications';
import Achievements from '../components/Achievements';
import Testimonials from '../components/Testimonials';
import Blog from '../components/Blog';
import Contact from '../components/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About preview={true} />
      <Skills preview={true} />
      <Services />
      <Projects preview={true} />
      <Experience preview={true} />
      <Education />
      <Certifications preview={true} />
      <Achievements preview={true} />
      <Testimonials />
      <Blog preview={true} />
      <Contact />
    </>
  );
}
