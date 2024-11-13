import { Candidate } from "../interfaces/Candidate.interface"
import InfoBox from "./InfoBox"

import { CSSProperties } from 'react';

const Profile = ({ id, username, htmlUrl, email, company, location, bio, avatar}: Candidate) => { 

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
    avatarContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '1rem',
      margin: 0,
    },
    profileContainer: {
      margin: "0 1.2rem",
      width: '100%',
    },
    h2: {
      margin: 0,
      fontSize: "2rem",
    },
    img: {
      maxHeight: "250px",
    }
  }

  return (
    <div id={id} style={styles.container}>

      {/* Profile Avatar */}
      <div style={styles.avatarContainer}>
        <img style={styles.img} src={avatar} alt={username}/>
      </div>

      {/* Profile Information */}
      <div style={styles.profileContainer}>
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