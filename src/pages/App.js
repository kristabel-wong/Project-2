import { BrowserRouter } from "react-router-dom";
import NavBar from "../components/NavBar";
import Pages from "./Pages";

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Pages />
		</BrowserRouter>
	);
}

export default App;
