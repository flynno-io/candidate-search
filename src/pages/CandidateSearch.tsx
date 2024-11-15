import { useState, useEffect, CSSProperties } from "react"
import { searchGithub, searchGithubUser } from "../api/API"
import Profile from "../components/Profile"
import { Candidate } from "../interfaces/Candidate.interface"
import DesktopCandidates from "../components/DesktopCandidates"
import MobileCandidates from "../components/MobileCandidates"

const CandidateSearch = () => {
	const [candidates, setCandidates] = useState<Candidate[]>([])
	const [isMobile, setIsMobile] = useState(window.innerWidth < 700)

	// Check if the window is resized to mobile, if so set isMobile to true
	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 767px)")
		const handleResize = () => setIsMobile(mediaQuery.matches)

		mediaQuery.addEventListener("change", handleResize)
		return () => mediaQuery.removeEventListener("change", handleResize)
	}, [])

	// Get candidates from Github API
	useEffect(() => {
		const fetchCandidates = async () => {
			// Get random set of candidates from Github API
			const candidates = await searchGithub()

			console.log(candidates)

			// Get user details from Github API and format into a Candidate object
			const candidatesWithDetails: Candidate[] = await Promise.all(
				candidates.map(async (user: any) => {
					const profile = await searchGithubUser(user.login)
					console.log(profile)
					return {
						id: profile.id,
						username: profile.login,
						htmlUrl: profile.html_url,
						email: profile.email,
						company: profile.company,
						location: profile.location,
						bio: profile.bio,
						avatar: profile.avatar_url,
					}
				})
			)
			const filterCandidates = candidatesWithDetails.filter(
				(user: Candidate) => user.id && user.username
			)
			// Set candidates state to the formatted Candidate objects
			setCandidates(filterCandidates)
		}
		fetchCandidates()
	}, [])

	// Create a Profile component for each user
	const profilesList = candidates.map((candidate: Candidate, index: number) => {
		console.log(candidate)
		return (
			<Profile
				key={index}
				id={candidate.id}
				username={candidate.username}
				htmlUrl={candidate.htmlUrl}
				company={candidate.company}
				email={candidate.email}
				location={candidate.location}
				bio={candidate.bio}
				avatar={candidate.avatar}
			/>
		)
	})

	// Handle user interaction
	const handleClick = (action: string) => {
		// If the user clicked 'accept', add the user to LocalStorage
		if (action === "accept") {
			const potentialCandidate = candidates[0]
			const potentialCandidates = JSON.parse(
				localStorage.getItem("potentialCandidates") || "[]"
			)
			localStorage.setItem(
				"potentialCandidates",
				JSON.stringify([...potentialCandidates, potentialCandidate])
			)
		}
		// Remove the first user from the list
		const updatedCandidates = candidates.slice(1)
		setCandidates(updatedCandidates)
	}

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
		<div>
			<h1 style={styles.h1}>Candidate Search</h1>
			{candidates.length === 0 ? (
				<p style={styles.Loading}>Loading...</p>
			) : isMobile ? (
				<MobileCandidates candidates={profilesList} handleClick={handleClick} />
			) : (
				<DesktopCandidates candidates={profilesList} handleClick={handleClick} />
			)}
		</div>
	)
}

export default CandidateSearch
