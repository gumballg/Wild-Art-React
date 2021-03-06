import React from 'react'
import EditMural from './EditMural'
import Logo from '../Logo/artInTheWild.jpg'

class ShowMural extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			showEdit: false,
			muralId: '',
			mural: {
		    title: '',
		    artist: '',
		    image: '',
		    description: '',
		    locationDescription: '',
		    year: '',
		    affiliation: '',
		    address: '',
		    zipcode: '',
		    lat: '',
		    lng: ''
		  }
		}
	}

  deleteMural = async (id, event) => {
    event.preventDefault()
    try{
      const deleteMural = await 
      fetch(process.env.REACT_APP_BACKEND_URL + '/murals/mural/' + id, {
        credentials: 'include',
        method: 'DELETE'
      })
      if(deleteMural.status !== 200){
        throw Error(deleteMural.statusText)
      }
      const parsedResponse = await deleteMural.json()
    }
    catch(error){
      console.log(error);
      return error
    }
  }

  showUserModal = async (id, event) => {
  	event.preventDefault()
  	try{
  	  const showResponse = await
  	  fetch(process.env.REACT_APP_BACKEND_URL + '/users/user/' + id, {
  	    credentials: 'include',
  	    method: 'GET'
  	  })
  	  if(showResponse.status !==200){
  	    throw Error(showResponse.statusText)
  	  }
  	  const userParsed = await showResponse.json()
  	  this.setState({
  	    showUser: true,
  	    userObj: userParsed
  	  })
  	}
  	catch(error){
  	  console.log(error);
  	  return error
  	}
  }

  showEditModal = (id, event) => {
  	this.setState({
  		showEdit: true,
  		muralId: id,
  		mural: this.props.muralObj
  	})
  }

  updateMural = (event) => {
  	this.setState({
  	  mural: {
  	    ...this.state.mural,
  	    [event.target.name]: event.target.value
  	  }
  	})
  }

  editMural = async (event) => {
    event.preventDefault()
    try{
      const editResponse = await 
      fetch(process.env.REACT_APP_BACKEND_URL + '/murals/mural/' + this.state.muralId, {
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify(this.state.mural),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      if(editResponse.status !== 200){
        throw Error(editResponse.statusText)
      }
      const parsedResponse = await editResponse.json()
      const editedMuralArray = this.state.murals.map((mural) => {
        if(mural._id === this.state.muralId){
          mural.title = parsedResponse.mural.title;
          mural.artist = parsedResponse.mural.artist;
          mural.description = parsedResponse.mural.description
          mural.locationDescription = parsedResponse.mural.locationDescription
          mural.year = parsedResponse.mural.year
          mural.affiliation = parsedResponse.mural.affiliation
          mural.address = parsedResponse.mural.address
          mural.lat = parsedResponse.mural.lat
          mural.lng = parsedResponse.mural.lng
          mural.zipcode = parsedResponse.mural.zipcode
        }
        return mural
      })
      this.setState({
        mural: editedMuralArray,
        showEdit: false
      })
    }
    catch(error){
      console.log(error);
      return error
    }
  }

	render(){
		let show = <div>
								<h2>{this.props.muralObj.title}</h2><br/>
								<h3>{this.props.muralObj.artist}</h3><br/>
								<img src={Logo} alt="Picture"/><br/>
								<span>{this.props.muralObj.description}</span><br/>
								<span>{this.props.muralObj.locationDescription}</span><br/>
								<span>{this.props.muralObj.year}</span><br/>
								<span>{this.props.muralObj.affiliation}</span><br/>
								<span>{this.props.muralObj.address} </span>
								<span>{this.props.muralObj.zipcode}</span><br/>
								<button onClick={this.deleteMural.bind(null, this.props.muralObj._id)}>Delete</button>
								<button onClick={this.showEditModal.bind(null, this.props.muralObj._id)}>Edit</button>
								<button onClick={this.showUserModal.bind(null, this.props.muralObj._id)}>User</button>
							 </div>
		let edit;
		if(this.state.showEdit){
      edit = <EditMural 
          editMural={this.editMural} 
          updateMural={this.updateMural} 
          mural={this.state.mural}
        />
      show = ''
    }
		return(
			<div>
				{show}
				{edit}
			</div>
		)
	}
}

export default ShowMural;