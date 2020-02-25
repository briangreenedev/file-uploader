import React from 'react'

const n = () => {}
const FileInput = ({ value, onChange = n, ...rest }) => (
	<React.Fragment>
		{Boolean(value.length) && (
			<div>Selected files: {value.map(f => f.name).join(", ")}</div>
		)}
		<label>
			Click to select some files...
			<input
				{...rest}
				style={{ display: "none" }}
				type="file"
				onChange={e => {
					onChange([...e.target.files]);
				}}
			/>
		</label>
	</React.Fragment>
)