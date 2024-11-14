import { useState, useEffect } from "react"
import { Candidate } from "../interfaces/Candidate.interface"
import InfoBox from "./InfoBox"

import { CSSProperties } from 'react';

const Profile = ({ id, username, htmlUrl, email, company, location, bio, avatar}: Candidate) => { 
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
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      border: '1px solid #ccc',
      borderRadius: '5px',
      maxWidth: '600px',
      margin: '0 1rem',
      overflow: 'hidden',
    },
    MobileContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: '1px solid #ccc',
      borderRadius: '5px',
      maxWidth: '400px',
      margin: '0 1rem',
      overflow: 'hidden',
    },
    avatarContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '1rem',
      margin: 0,
    },
    profileContainer: {
      margin: "0 1.2rem",
      width: '100%',
      minWidth: '200px',
    },
    mobileProfileContainer: {
      width: '100%',
      minWidth: '200px',
      textAlign: 'center',
    },
    h2: {
      margin: 0,
      fontSize: "2rem",
    },
    mobileImg: {
      margin: '1rem',
      maxHeight: "200px",
    },
    img: {
      maxHeight: "300px",
    }
  }

  return (
    <div id={id} style={ isMobile ? styles.MobileContainer : styles.container}>

      {/* Profile Avatar */}
      <div style={styles.avatarContainer}>
        <img style={ isMobile ? styles.mobileImg : styles.img} src={avatar} alt={username}/>
      </div>

      {/* Profile Information */}
      <div style={ isMobile ? styles.mobileProfileContainer : styles.profileContainer}>
        <a href={htmlUrl} target="_blank"><h2 style={styles.h2}>{username}</h2></a>
        <InfoBox title={'Email'} text={email}/>
        <InfoBox title={'Company'} text={company}/>
        <InfoBox title={'Location'} text={location}/>
        <InfoBox title={'Bio'} text={bio}/>
      </div>
    </div>
  )
}

export default Profile