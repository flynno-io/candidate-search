import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';

function App() {

  const styles = {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    }
  }
  return (
    <div style={styles.root}>
      <Nav />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
