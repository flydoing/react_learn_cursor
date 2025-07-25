import { Link } from 'react-router-dom';
import './index.scss';

const About = () => {
  return (
    <div className='about'>
      <h1>About Page</h1>
      <p>This is the about page.</p>
      <nav>
        <Link to='/'>Go to Home</Link>
      </nav>
    </div>
  );
};

export default About; 