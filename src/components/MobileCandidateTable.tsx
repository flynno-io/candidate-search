import { useState, CSSProperties } from "react"
import { Candidate } from "../interfaces/Candidate.interface"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import Profile from "./Profile"

const MobileCandidateTable = ({ candidates, handleRemove }: { candidates: Candidate[], handleRemove: Function }) => {
  const [selectedCandidate, setSelectedCandidate] = useState(candidates[0])

  const handleClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate)
  }

// CSS Styles
const styles: { [key: string]: CSSProperties }= {
  table: {
    width: "90%",
    margin: "2rem auto",
  },
  tdImage: {
    padding: ".25rem",
    width: "50px",
  },
  td: {
    paddingLeft: "1rem",
  },
  tdNone: {
    paddingLeft: "1rem",
    color: "gray",
    fontSize: "0.8rem",
    fontStyle: "italic",
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
  <>
			<Profile
				id={selectedCandidate.id}
				username={selectedCandidate.username}
				htmlUrl={selectedCandidate.htmlUrl}
				company={selectedCandidate.company}
				email={selectedCandidate.email}
				location={selectedCandidate.location}
				bio={selectedCandidate.bio}
				avatar={selectedCandidate.avatar}
			/>
    <table style={styles.table}>
      <thead>
        <tr>
          <th>Avatar</th>
          <th>Username</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {candidates.map((candidate, index) => (
          <tr key={index}>
            <td style={styles.tdImage}>
              <img style={styles.img} src={candidate.avatar} alt={candidate.username} />
            </td>
            <td onClick={() => handleClick(candidate)} style={candidate.username ? styles.td : styles.tdNone}>{candidate.username || 'Private'}</td>
            <td style={styles.td}>
              <div style={styles.iconContainer} onClick={() => handleRemove(candidate.id)}>
                <FontAwesomeIcon style={styles.icon} icon={faPlus} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
)
}

export default MobileCandidateTable