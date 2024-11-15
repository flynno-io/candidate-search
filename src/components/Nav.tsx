import { CSSProperties, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  const styles: { [key: string]: CSSProperties } = {
    nav: {
      display: 'flex',
      width: '100%',
      justifyContent: 'left',
      gap: '1rem',
      color: 'white',
    },
    ul: {
      display: 'flex',
      listStyle: 'none',
      gap: '1rem',
    },
    li: {
      display: 'flex',
      alignItems: 'center',
      color: 'lightblue',
    },
    active: {
      display: 'flex',
      alignItems: 'center',
      color: 'white',
      fontWeight: 'bold',
    },
    a: {
      textDecoration: 'none',
    },
  }

  return (
    <nav style={styles.nav}>
      <ul style={styles.ul}>
        <li >
          <Link style={currentPath === '/' ? styles.active : styles.li} to="/">Home</Link>
        </li>
        <li >
          <Link style={currentPath === '/SavedCandidates' ? styles.active : styles.li} to="/SavedCandidates">Potential Candidates</Link>
        </li>
      </ul>
    </nav>
  )
};

export default Nav;
