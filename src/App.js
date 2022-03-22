import "./App.css";
import React, { useState } from "react";
import axios from "axios";
function App() {
	const base_url =
		"https://testscript-boisterous-possum-kx.cfapps.ap21.hana.ondemand.com/testscript";
	const base_url2 =
		"https://testscript-boisterous-possum-kx.cfapps.ap21.hana.ondemand.com/testscript2";
	const [testUrl, setTestUrl] = useState("");
	const [output, setOutput] = useState(null);
	const [output2, setOutput2] = useState(null);
	const [pass, setPass] = useState("");

	const handleClick = (e) => {
		axios
			.post(base_url, {
				testurl: testUrl,
			})
			.then(function (response) {
				console.log(response);
				setOutput(response);
			})
			.catch((e) => console.log(e.message));
	};
	const handleClick2 = (e) => {
		axios
			.post(base_url2, {
				password: pass,
			})
			.then(function (response) {
				console.log(response);
				setOutput2(response);
			})
			.catch((e) => console.log(e.message));
	};
	return (
		<div className="App">
			<h1>Enter Api url you want to request </h1>
			<input
				type="text"
				value={testUrl}
				onChange={(e) => setTestUrl(e.target.value)}
			></input>
			<button onClick={handleClick}>submit </button>
			{output && <h2>OutPut</h2>}
			{output ? (
				<div>
					<h3>id </h3>
					<span>{output?.data.userId}</span>
					<h3>title </h3>
					<span>{output?.data.title}</span>
				</div>
			) : (
				""
			)}
			<h1>Enter password to run script 2 </h1>
			<input
				type="password"
				value={pass}
				onChange={(e) => setPass(e.target.value)}
			/>
			<button onClick={handleClick2}>Submit</button>
			{output2 && <h2>OutPut2</h2>}
			{output2 ? (
				<div>
					<span>{output2?.data.message}</span>
				</div>
			) : (
				""
			)}
		</div>
	);
}

export default App;
