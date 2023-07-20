import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Dashboard";
import "./App.css";
import Login from "./Login";

// const code = new URLSearchParams(window.location.search).get("code");
const code = null;

function App() {
	return <Dashboard code={code} />;
}

export default App;
