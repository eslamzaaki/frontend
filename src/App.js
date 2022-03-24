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
	const [files, setFiles] = useState();
	const [isfilePicked, setisFilePicked] = useState(false);
	const [uploadComplete, setUploadComplete] = useState(false);

	const changeHandler = (event) => {
		setFiles(event.target.files);
		setisFilePicked(true);
	};
	const handleSubmission = () => {
		const formData = new FormData();

		for (let i = 0; i < files.length; i++) {
			console.log(files[i]);
			formData.append("files", files[i]);
		}

		fetch("http://192.168.97.44:5000/uploadFile", {
			method: "POST",
			body: formData,
		})
			.then((response) => response.json())
			.then((result) => {
				console.log("Success:", result);
				setUploadComplete(true);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

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
			<input
				multiple
				type="file"
				className="custom-file-input"
				name="file"
				onChange={changeHandler}
			/>
			<p>
				<span>Number of Files uploaded :</span>
				{files ? " " + files.length : " 0"}
			</p>

			<div>
				<button disabled={!isfilePicked} onClick={handleSubmission}>
					Submit
				</button>
				{uploadComplete ? <p>Upload successfully completed</p> : ""}
			</div>
		</div>
	);
}
export default App;
