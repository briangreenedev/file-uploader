import React, { Component } from 'react'
import {Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Snackbar} from "@material-ui/core"
import axios from 'axios'
import PrivateUrls from '../private/private-urls'
import AuthUser from "../private/auth-user";
import LocalStorage from "../utils/local-storage";
import PrivateKeys from "../private/private-keys";
import Alert from '@material-ui/lab/Alert';
import moment from 'moment'

const local = new LocalStorage()

const toBase64 = file => new Promise((resolve, reject) => {
	const reader = new FileReader()
	reader.readAsDataURL(file)
	reader.onload = () => resolve(reader.result)
	reader.onerror = err => reject(err)
})

class FileInput extends Component {
	constructor(props) {
		super(props)

		this.state = {
			alreadyUploadedDialogOpen: false
		}
	}

	onProceedUpload = (files, toggleBackdrop) => {
		toggleBackdrop()

		let accessibleFileObjects
		Promise.all(files.map(async file => {
			return {
				base64: await toBase64(file),
				fileName: file.name,
				fileType: file.type
			}
		}))
			.then(fileObjects => {
				accessibleFileObjects = fileObjects
				Promise.all(fileObjects.map(fileObject => {
					let formData = new FormData()
					formData.set('apikey', AuthUser.apikey)
					formData.set('jsonpayload', JSON.stringify(fileObject))
					return axios({
						method: 'POST',
						url: PrivateUrls.apiUrl,
						data: formData
					})
				}))
					.then(fileUploadResults => {
						debugger
						for(let i = 0; i < accessibleFileObjects.length; i++) {
							for(let j = 0; j < fileUploadResults.length; j++) {
								if(i === j) {
									if(fileUploadResults[j].data && fileUploadResults[j].data.Status === 'Good') {
										local.addFileNameUploaded(accessibleFileObjects[i].fileName)
										local.addHistoryItem({
											fileName: accessibleFileObjects[i].fileName,
											status: 'success',
											date: Date(),
											dateString: moment(Date()).format('l')
										})
									} else {
										local.addHistoryItem({
											fileName: accessibleFileObjects[i].fileName,
											status: 'error',
											date: Date(),
											dateString: moment(Date()).format('l')
										})
									}
								}
							}
						}
						local.cleanupHistory()
					})
					.catch(err => {
						debugger
					})
					.finally(() => {
						toggleBackdrop()
					})
			})
	}

	render () {
		const {toggleBackdrop, ...rest} = this.props
		const { alreadyUploadedDialogOpen, snackBarOpen, alertSeverity } = this.state
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
							this.onProceedUpload([...e.target.files], toggleBackdrop)
						}} />
				</Button>
			</React.Fragment>
		)
	}
}

export default FileInput