import React, {Component} from 'react'
import {
	Typography,
	Toolbar,
	AppBar,
	Container,
	CssBaseline,
	TextField,
	Button,
	withStyles,
	CircularProgress,
	Backdrop
} from "@material-ui/core"
import FileInput from "../components/file-input";

class UploaderView extends Component {
	state = { backdropOpen: false }

	toggleBackdrop = () => {
		this.setState({backdropOpen: !this.state.backdropOpen})
	}

	render() {
		const {backdropOpen} = this.state
		return (
			<React.Fragment>
				<CssBaseline/>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h6">
							Invoice Uploader
						</Typography>
					</Toolbar>
				</AppBar>
				<Container maxWidth="md">
					<div style={{textAlign: 'center'}}>
						<h2>Instructions</h2>
						<p>Click or Tap on "UPLOAD FILES" and choose the files you want to upload.</p>
					</div>
					<form noValidate style={{textAlign:'center'}} >
						<FileInput toggleBackdrop={this.toggleBackdrop} />
					</form>
				</Container>
				<Backdrop open={backdropOpen}>
					<CircularProgress color="inherit" />
				</Backdrop>
			</React.Fragment>
		)
	}
}


export default UploaderView