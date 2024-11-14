import { useState, useEffect, CSSProperties } from "react"
import { searchGithub, searchGithubUser } from "../api/API"
import Profile from "../components/Profile"
import { Candidate } from "../interfaces/Candidate.interface"
import DesktopCandidates from "../components/DesktopCandidates"
import MobileCandidates from "../components/MobileCandidates"

const CandidateSearch = () => {
	const [users, setUsers] = useState<Candidate[]>([])
	const [isMobile, setIsMobile] = useState(window.innerWidth < 700)

	// Check if the window is resized to mobile, if so set isMobile to true
	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 767px)")
		const handleResize = () => setIsMobile(mediaQuery.matches)

		mediaQuery.addEventListener("change", handleResize)
		return () => mediaQuery.removeEventListener("change", handleResize)
	}, [])

	// Get users from Github API
	useEffect(() => {
		const fetchUsers = async () => {
			// Get random set of users from Github API
			const users = await searchGithub()

			console.log(users)

			// Get user details from Github API and format into a Candidate object
			const usersWithDetails: Candidate[] = await Promise.all(
				users.map(async (user: any) => {
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
			const filteredUsers = usersWithDetails.filter(
				(user: Candidate) => user.id && user.username
			)
			// Set users state to the formatted Candidate objects
			setUsers(filteredUsers)
		}
		fetchUsers()
	}, [])

	// Create a Profile component for each user
	const profilesList = users.map((user: Candidate, index: number) => {
		console.log(user)
		return (
			<Profile
				key={index}
				id={user.id}
				username={user.username}
				htmlUrl={user.htmlUrl}
				company={user.company}
				email={user.email}
				location={user.location}
				bio={user.bio}
				avatar={user.avatar}
			/>
		)
	})

	// Handle user interaction
	const handleClick = (action: string) => {
		// If the user clicked 'accept', add the user to LocalStorage
		if (action === "accept") {
			const potentialUser = users[0]
			const potentialUsers = JSON.parse(
				localStorage.getItem("potentialUsers") || "[]"
			)
			localStorage.setItem(
				"potentialUsers",
				JSON.stringify([...potentialUsers, potentialUser])
			)
		}
		// Remove the first user from the list
		const updatedUsers = users.slice(1)
		setUsers(updatedUsers)
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
			{users.length === 0 ? (
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
