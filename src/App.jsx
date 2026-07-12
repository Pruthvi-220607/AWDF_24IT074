import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Footer from './components/Footer';

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

function App() {
  return (
    <div className="app-wrapper">
      <Header name="Pruthviraj" themeColor="#16213e" />
      <main className="main-content">
        <About />
        <Skills skillList={mySkills} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
