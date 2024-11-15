import { useState, CSSProperties, useEffect } from "react";
import { Link } from "react-router-dom";
import { Candidate } from "../interfaces/Candidate.interface";
import DesktopCandidateTable from "../components/DesktopCandidateTable";
import MobileCandidateTable from "../components/MobileCandidateTable";

const SavedCandidates = () => {
  // Get users from local storage
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700)

	// Check if the window is resized to mobile, if so set isMobile to true
	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 767px)")
		const handleResize = () => setIsMobile(mediaQuery.matches)

		mediaQuery.addEventListener("change", handleResize)
		return () => mediaQuery.removeEventListener("change", handleResize)
	}, [])

  // Get profiles list
  useEffect(() => {
    const candidates = JSON.parse(localStorage.getItem("potentialCandidates") || "[]");
    setCandidates(candidates);
  }, []);

  // Remove a candidate from the list
  const handleRemove = (id: string) => {
    const updatedCandidates = candidates.filter((candidate) => candidate.id !== id);
    setCandidates(updatedCandidates);
    localStorage.setItem("potentialCandidates", JSON.stringify(updatedCandidates));
  };

  // CSS styles
	const styles: { [key: string]: CSSProperties } = {
		h1: {
			textAlign: "center",
		},
		Loading: {
			textAlign: "center",
			width: "100%",
			fontSize: "2rem",
			color: "blue",
		},
	}

  return (
		<>
			<h1 style={styles.h1}>Potential Candidates</h1>
			{candidates.length === 0 ? (
        <div style={{ margin: '1rem', padding: '.25rem', textAlign: 'center'}}>
          <p style={styles.Loading}>No Candidates have been selected</p>
          <p>Go to <Link to="/">Home</Link> to select candidates.</p>
        </div>
			) : isMobile ? (
				<MobileCandidateTable candidates={candidates} handleRemove={handleRemove} />
			) : (
				<DesktopCandidateTable candidates={candidates} handleRemove={handleRemove} />
			)}
		</>
  );
};

export default SavedCandidates;
