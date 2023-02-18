import './App.css';
import React from 'react'
import UploadManager from './services/UploadManager';
function App() {
	const [selectedFile, setSelectedFile] = React.useState("")

	function handleFileChange(event) {
		const fileObj = event.target.files && event.target.files[0];
		if (!fileObj) {
			return;
		}
		console.log(fileObj)
		setSelectedFile(URL.createObjectURL(fileObj))
	}
	return (
		<div className="App">
			<form onSubmit={e => {
				e.preventDefault()
				UploadManager.uploadFile(selectedFile, {
					postedby: 'pp',
					uploadpath: '',
					problemid: '11',
					ext: 'py'
				}, '/submission/upload')
			}}>
				<input

					type="file"
					onChange={(handleFileChange)}
				/>
				<button type='submit'>post</button>
			</form>
		</div>
	);
}

export default App;
