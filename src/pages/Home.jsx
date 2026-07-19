import About from '../components/About';
import Skills from '../components/Skills';

const mySkills = [
  'HTML & CSS',
  'JavaScript (ES6+)',
  'React.js',
  'Vite',
  'Node.js',
  'Git & GitHub',
  'REST APIs',
  'Responsive Design',
];

function Home() {
  return (
    <>
      <About />
      <Skills skillList={mySkills} />
    </>
  );
}

export default Home;
