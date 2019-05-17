import React from 'react';

const EditMural = (props) => {
	return(
		<div>
			<h4>Edit Movie</h4>
			<form className="form" onSubmit={props.editMural}>
				<label>
					Title:
					<input 
						type="text" 
						name="title"
						onChange={props.updateMural}
						value={props.mural.title}
					/>
				</label>
				<br/>
				<label>
					Artist:
					<input
						type="text"
						name="artist"
						onChange={props.updateMural}
						value={props.mural.artist}
					/>
				</label>
				<br/>
				<label>
					Image:
					<input
						type="text"
						name="image"
						onChange={props.updateMural}
						value={props.mural.image}
					/>
				</label>
				<br/>
				<label>
					Description:
					<input
						type="text"
						name="description"
						onChange={props.updateMural}
						value={props.mural.description}
					/>
				</label>
				<br/>
				<label>
					Location Description:
					<input
						type="text"
						name="locationDescription"
						onChange={props.updateMural}
						value={props.mural.locationDescription}
					/>
				</label>
				<br/>
				<label>
					Year Installed:
					<input
						type="number"
						name="year"
						onChange={props.updateMural}
						value={props.mural.year}
					/>
				</label>
				<br/>
				<label>
					Affiliation/Commisioner:
					<input
						type="text"
						name="affiliation"
						onChange={props.updateMural}
						value={props.mural.affiliation}
					/>
				</label>
				<br/>
				<label>
					Address:
					<input
						type="text"
						name="address"
						onChange={props.updateMural}
						value={props.mural.address}
					/>
				</label>
				<br/>
				<label>
					Zipcode:
					<input
						type="number"
						name="zipcode"
						onChange={props.updateMural}
						value={props.mural.zipcode}
					/>
				</label>
				<br/>
				<label>
					Latitude:
					<input
						type="number"
						name="lat"
						onChange={props.updateMural}
						value={props.mural.lat}
					/>
				</label>
				<br/>
				<label>
					Longitude:
					<input
						type="number"
						name="lng"
						onChange={props.updateMural}
						value={props.mural.lng}
					/>
				</label>
				<br/>
				<button>Update Mural</button>
			</form>
		</div>
	)
}

export default EditMural