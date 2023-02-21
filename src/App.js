import './App.css';
import React from 'react'
import UploadManager from './services/UploadManager';
import { Route, Routes } from 'react-router-dom';
import CreateProblem from './CreateProblem/CreateProblem';
function App() {
	const [selectedFile, setSelectedFile] = React.useState("")
	const [testcaseFile, setSelectedTestcaseFile] = React.useState('')
	function handleFileChange(event) {
		const fileObj = event.target.files && event.target.files[0];
		if (!fileObj) {
			return;
		}
		console.log(fileObj)
		setSelectedFile(URL.createObjectURL(fileObj))
	}
	function onTestcaseFileChange(event) {
		const fileObj = event.target.files && event.target.files[0];
		if (!fileObj) {
			return;
		}

		setSelectedTestcaseFile(URL.createObjectURL(fileObj))
	}
	return (
		<div className="App">
			<Routes>
				<Route path='/' element={<div>
					<h3>submission</h3>
					<form onSubmit={e => {
						e.preventDefault()
						UploadManager.uploadFile(selectedFile, {
							postedby: 'pp',
							filetype: 'submission',
							problemid: '11',
							ext: 'py',
							submissionid: 'abcd'
						}, '/uploadFile/upload').then(data => {
							console.log(data)
						})
					}}>
						<input

							type="file"
							onChange={(handleFileChange)}
						/>
						<button type='submit'>post</button>
					</form>

					<h3>testcase</h3>
					<form onSubmit={e => {
						e.preventDefault()
						UploadManager.uploadFile(testcaseFile, {
							filetype: 'testcaseinput',
							problemid: '11',
							ext: 'txt',
						}, '/uploadFile/upload').then(data => {
							console.log(data)
						})
					}}>
						<input

							type="file"
							onChange={(onTestcaseFileChange)}
						/>
						<button type='submit'>post</button>
					</form>

					<h3>Output</h3>
					<form onSubmit={e => {
						e.preventDefault()
						UploadManager.uploadFile(testcaseFile, {
							filetype: 'testcaseoutput',
							problemid: '11',
							ext: 'txt',
						}, '/uploadFile/upload').then(data => {
							console.log(data)
						})
					}}>
						<input

							type="file"
							onChange={(onTestcaseFileChange)}
						/>
						<button type='submit'>post</button>
					</form>
				</div>} />
				<Route path='/createProblem' element={<CreateProblem />} />
			</Routes>
		</div>
	);
}

export default App;
