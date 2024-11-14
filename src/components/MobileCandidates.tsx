import { CSSProperties, ReactNode } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

const MobileCandidates = ({candidates, handleClick}: {candidates: ReactNode[], handleClick: Function}) => {

  const styles: { [key: string]: CSSProperties } = {
    profileSelector: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "100%",
    },
    reject: {
      fontSize: "3rem",
      textAlign: "center",
      width: "fit-content",
      color: "white",
      cursor: "pointer",
      padding: "0.25rem 0.5rem",
      backgroundColor: "red",
      borderRadius: "30px 30px 30px 30px",
    },
    accept: {
      fontSize: "3rem",
      textAlign: "center",
      width: "fit-content",
      color: "white",
      cursor: "pointer",
      padding: "0.25rem 0.5rem",
      backgroundColor: "green",
      borderRadius: "30px 30px 30px 30px",
    },
  }
  
  return (
    <div style={styles.profileSelector}>
      <div>{candidates[0]}</div>
      <div style={{display: "flex", justifyContent: "space-around", margin: "1rem"}}>
        <div style={styles.reject} onClick={() => handleClick("reject")}>
          <FontAwesomeIcon
            style={{ transform: "rotate(45deg)" }}
            icon={faPlus}
          />
        </div>
        <div style={styles.accept} onClick={() => handleClick("accept")}>
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
    </div>
  )
}

export default MobileCandidates