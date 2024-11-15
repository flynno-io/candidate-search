import { CSSProperties } from "react"
import { Candidate } from "../interfaces/Candidate.interface"

const MobileCandidateTable = ({ candidates, handleRemove }: { candidates: Candidate[], handleRemove: Function }) => {

  // CSS Styles
  const styles: { [key: string]: CSSProperties }= {
    table: {
      width: "100%",
    },
    img: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
    },
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
            <td>
              <img src={candidate.avatar} alt={candidate.username} />
            </td>
            <td>{candidate.username}</td>
            <td>{candidate.email}</td>
            <td>{candidate.company}</td>
            <td>{candidate.location}</td>
            <td>{candidate.bio}</td>
            <td>
              <button onClick={() => handleRemove(candidate.id)}>Remove</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default MobileCandidateTable