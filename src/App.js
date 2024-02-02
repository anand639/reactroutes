import React from "react";
import {
	BrowserRouter as Router,
	Routes, // Replaces Switch
	Route,
	NavLink,
	Navigate, // Used for redirects in v6
	useNavigate,
	useLocation,
} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
import "./App.css";

// A wrapper component for handling the navigation prompt
const PromptWrapper = ({ message }) => {
	const navigate = useNavigate();
	const location = useLocation();

	React.useEffect(() => {
		const unblock = navigate.block((tx) => {
			if (window.confirm(message)) {
				// Unblock the navigation
				unblock();
				// Retry the navigation
				tx.retry();
			} else {
				// Keep the user on the same page
				navigate(location.pathname, { replace: true });
			}
		});
		return () => unblock();
	}, [navigate, message, location.pathname]);
	return <h2>Prompt Demo</h2>;
};

function App() {
	return (
		<Router>
			<div>
				{/* Navigation Setup  */}
				<nav>
					<NavLink
						end
						to="/"
						className={({ isActive }) => (isActive ? "active" : "")}
					>
						Home
					</NavLink>
					<NavLink
						to="/about"
						className={({ isActive }) => (isActive ? "active" : "")}
					>
						About
					</NavLink>
					<NavLink
						to="/contact"
						className={({ isActive }) => (isActive ? "active" : "")}
					>
						Contact
					</NavLink>
				</nav>
				{/* Route configuration  */}
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="old-home" element={<Navigate replace to="/" />} />
					<Route
						path="/prompt"
						element={
							<PromptWrapper message="Are you sure you want to leave?" />
						}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</Router>
	);
}

export default  App;
