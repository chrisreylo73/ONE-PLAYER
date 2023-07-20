import React from "react";

const Login = ({ setCode }) => {
	const handleClick = () => {
		if (new URLSearchParams(window.location.search).get("code") !== null) {
			setCode(new URLSearchParams(window.location.search).get("code"));
		}
	};

	return (
		<div>
			<button onClick={handleClick}>Login</button>
		</div>
	);
};
export default Login;
