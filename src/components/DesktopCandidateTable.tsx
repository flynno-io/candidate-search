import { Candidate } from '../interfaces/Candidate.interface'
import { CSSProperties } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

const DesktopCandidateTable = ({ candidates, handleRemove }: { candidates: Candidate[], handleRemove: Function}) => {

  // CSS Styles
  const styles: { [key: string]: CSSProperties }= {
    table: {
      width: "90%",
    },
    tdImage: {
      padding: ".25rem",
      width: "50px",
    },
    td: {
      textAlign: "left",
      padding: ".5rem",
    },
    tdNone: {
      paddingLeft: "1rem",
      color: "gray",
      fontSize: "0.8rem",
      fontStyle: "italic",
    },
    easterEgg: {
      display: "none",
    },
    img: {
      width: "50px",
      height: "50px",
      borderRadius: "10%",
    },
    iconContainer: {
      display: "flex",
      justifyContent: "center",
      cursor: "pointer",
      margin: "0 auto",
      backgroundColor: "red",
      borderRadius: "50%",
      width: "2.5rem",
    },
    icon: {
      color: "white",
      fontSize: "1.5rem",
      borderRadius: "50%",
      padding: "0.5rem",
      transform: "rotate(45deg)",
    }
  }

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th>Avatar</th>
          <th>Username</th>
          <th>Email</th>
          <th>Company</th>
          <th>Location</th>
          <th>Bio</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {candidates.map((candidate, index) => (
          <tr key={index}>
            <td style={styles.tdImage}>
              <img style={styles.img} src={candidate.avatar} alt={candidate.username} />
            </td>
            <td style={candidate.username ? styles.td : styles.tdNone}>{candidate.username || 'Private'}</td>
            <td style={candidate.email ? styles.td : styles.tdNone}>{candidate.email || 'Private'}</td>
            <td style={candidate.company ? styles.td : styles.tdNone}>{candidate.company || 'Private'}</td>
            <td style={candidate.location ? styles.td : styles.tdNone}>{candidate.location || 'Private'}</td>
            <td style={candidate.bio ? styles.td : styles.tdNone}>{candidate.bio || 'Private'}</td>
            <td style={candidate.username === 'flynno-io' ? styles.easterEgg : {}}>
              <div style={styles.iconContainer} onClick={() => handleRemove(candidate.id)}>
                <FontAwesomeIcon style={styles.icon} icon={faPlus} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DesktopCandidateTable