import React, {Component} from 'react'
import {Typography, Toolbar, AppBar} from "@material-ui/core";

class LoginView extends Component {
	constructor() {
		super()
	}

	render() {
		return (
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6">
						Please Login
					</Typography>
				</Toolbar>
			</AppBar>
		)
	}
}

export default LoginView