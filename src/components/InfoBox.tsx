import { useState, useEffect } from 'react'
import { CSSProperties } from 'react'

const InfoBox = ({title, text}: {title: string, text: string}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700)

  // Check if the window is resized to mobile, if so set isMobile to true
	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 767px)")
		const handleResize = () => setIsMobile(mediaQuery.matches)

		mediaQuery.addEventListener("change", handleResize)
		return () => mediaQuery.removeEventListener("change", handleResize)
	}, [])

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
    MobileContainer: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: '5px',
      maxWidth: '400px',
      margin: '1rem 2rem',
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
      padding: 0,
      margin: '.25rem 0',
      textAlign: 'left',
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
    <div style={ isMobile ? styles.MobileContainer : styles.container}>
      <span style={styles.title}>{title}</span>
      <p style={styles.text}>{text ? text : <span style={styles.noInfo}>Private</span>}</p>
    </div>
  )
}

export default InfoBox