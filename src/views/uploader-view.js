import React, {Component} from 'react'
import {
	Typography,
	Toolbar,
	AppBar,
	Container,
	CssBaseline,
	Button,
	CircularProgress,
	Backdrop
} from "@material-ui/core"
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline'
import CancelOutlined from '@material-ui/icons/CancelOutlined'
import FileInput from "../components/file-input";
import PrivateKeys from "../private/private-keys";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import LocalStorage from "../utils/local-storage";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

class UploaderView extends Component {
	state = { backdropOpen: false }

	toggleBackdrop = () => {
		this.setState({backdropOpen: !this.state.backdropOpen})
	}

	render() {
		let storage = new LocalStorage()
		debugger
		const {backdropOpen, alreadyUploadedDialogOpen} = this.state
		return (
			<React.Fragment>
				<CssBaseline/>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h6">
							{ PrivateKeys.customerName } - Invoice Uploader
						</Typography>
					</Toolbar>
				</AppBar>
				<Container maxWidth="md" style={{paddingTop:'50px'}}>
					<form noValidate style={{textAlign:'center'}}>
						<FileInput toggleBackdrop={this.toggleBackdrop} />
					</form>
					<Grid container spacing={2} style={{marginTop:'50px'}}>
						<Grid item xs={12}>
							<h2 style={{textAlign:'center'}}>File Upload History</h2>
						</Grid>

						{storage && storage.data ? storage.data.historyItems.reverse().slice(0, storage.maxVisible).map(item => {

							return (
								<Grid item xs={12} md={6}>
									<div>
										<List>
											<ListItem className={`file-history-item-${item.status}`}>
												<ListItemAvatar>
													{
														item.status === 'success'
														? <CheckCircleOutline />
														: <CancelOutlined />
													}
												</ListItemAvatar>
												<ListItemText
													primary={<strong>{item.fileName}</strong>}
													secondary={`${item.status === 'success' ? 'Successful' : 'Failed'} on ${item.dateString}`}
												/>
											</ListItem>
										</List>
									</div>
								</Grid>
							)
						}) : <Grid item xs={12}>
									<div style={{textAlign:'center', color:'#cccccc'}}>After uploading your first batch of files, your upload history will be listed here.</div>
								</Grid>}
					</Grid>
				</Container>
				<Backdrop open={backdropOpen}>
					<CircularProgress color="inherit" />
				</Backdrop>
			</React.Fragment>
		)
	}
}


export default UploaderView