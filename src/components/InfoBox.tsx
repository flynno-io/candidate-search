import { CSSProperties } from 'react'

const InfoBox = ({title, text}: {title: string, text: string}) => {

  // CSS styles
  const styles: { [key: string]: CSSProperties } = {
    container: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
      borderRadius: '5px',
      maxWidth: '600px',
      margin: '1.2rem 0',
    },
    title: {
      position: 'absolute',
      top: '-15px',
      left: '0',
      margin: 0,
      fontSize: "12px",
      fontWeight: 'bold',
    },
    text: {
      margin: 0,
      width: '100%',
      color: 'white',
    },
    noInfo: {
      fontStyle: 'italic',
      fontSize: '0.8rem',
      color: '#CBCBCB',
    }
  }
  
  return (
    <div style={styles.container}>
      <span style={styles.title}>{title}</span>
      <p style={styles.text}>{text ? text : <span style={styles.noInfo}>Private</span>}</p>
    </div>
  )
}

export default InfoBox