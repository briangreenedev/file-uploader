import React from 'react'
import {Button} from "@material-ui/core"
import axios from 'axios'
import PrivateUrls from '../private/private-urls'
import AuthUser from "../private/auth-user";

const toBase64 = file => new Promise((resolve, reject) => {
	const reader = new FileReader()
	reader.readAsDataURL(file)
	reader.onload = () => resolve(reader.result)
	reader.onerror = err => reject(err)
})

const onFiles = (files, toggleBackdrop) => {
	toggleBackdrop()
	Promise.all(files.map(async file => {
		debugger
		return {
			base64: await toBase64(file),
			fileName: file.name,
			fileType: file.type
		}
	}))
		.then(fileObjects => {
			Promise.all(fileObjects.map(fileObject => {
				let formData = new FormData()
				formData.set('apikey', AuthUser.apikey)
				formData.set('jsonpayload', JSON.stringify(fileObject))
				debugger
				return axios({
					method: 'POST',
					url: PrivateUrls.apiUrl,
					data: formData
				})
			}))
				.then(fileUploadResults => {
					debugger
				})
				.catch(err => {
					debugger
				})
				.finally(() => {
					toggleBackdrop()
				})
		})
}
const FileInput = ({ toggleBackdrop, ...rest }) => {
	debugger
	return (
	<React.Fragment>
		<Button
			variant="contained"
			component="label"
			size="large"
			style={{height:'75px', fontSize:'18px'}}
			fullWidth
		>
			Upload Files
			<input
				{...rest}
				type="file"
				style={{display: 'none'}}
				multiple
				onChange={e => {
					onFiles([...e.target.files], toggleBackdrop)
				}} />
		</Button>
	</React.Fragment>
)}

export default FileInput