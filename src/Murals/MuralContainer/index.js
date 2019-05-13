import React, { Component } from 'react';
import Murals from '../MuralsList'
import CreateMural from '../CreateMural'
import EditMural from '../EditMural'

class MuralContainer extends Component {
  constructor(){
    super();
    this.state = {
      murals: [],
      showEdit: false,
      editMuralId: null,
      muralToEdit: {
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

  componentDidMount(){
    this.getMurals()
    this.state.murals = this.props.murals
  }

  getMurals = async () => {
    try{
      const foundMurals = await fetch('http://localhost:9000/murals/home', {
        credentials: 'include',
        method: 'GET'
      });
      if(foundMurals.status !== 200){
        throw Error(foundMurals.statusText)
      }
      const muralsParsed = await foundMurals.json();
      this.setState({murals: muralsParsed.murals})
    }
    catch(error){
      console.log(error);
      return error
    }    
  }

  deleteMural = async (id, event) => {
    event.preventDefault()
    try{
      const deleteMural = await fetch('http://localhost:9000/murals/mural/' + id, {
        credentials: 'include',
        method: 'DELETE'
      })
      if(deleteMural.status !== 200){
        throw Error(deleteMural.statusText)
      }
      const parsedResponse = await deleteMural.json()
      this.setState({
        murals: this.state.murals.filter((mural, i) => mural._id !== id)
      })
    }
    catch(error){
      console.log(error);
    }
  }

  showModal = (id, event) => {
    const muralToEdit = this.state.murals.find((mural) => mural._id === id)
    this.setState({
      showEdit: true,
      editMuralId: id,
      muralToEdit: muralToEdit
    })
  }

  editMural = async (event) => {
    event.preventDefault()
    try{
      const editResponse = await fetch('http://localhost:9000/murals/mural/' + this.state.editMuralId, {
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify(this.state.muralToEdit),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      if(editResponse.status !== 200){
        throw Error(editResponse.statusText)
      }
      const parsedResponse = await editResponse.json()
      const editedMuralArray = this.state.murals.map((mural) => {
        if(mural._id === this.state.editMuralId){
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
    }
  }

  updateMural = (event) => {
    this.setState({
      muralToEdit: {
        ...this.state.muralToEdit,
        [event.target.name]: event.target.value
      }
    })
  }

  render(){
    return(
      <div>
        {this.state.showEdit ? 
          <EditMural 
            editMural={this.editMural} 
            updateMural={this.updateMural} 
            muralToEdit={this.state.muralToEdit}
          /> :
          <Murals 
            murals={this.state.murals} 
            deleteMural={this.deleteMural}
            showModal={this.showModal}
          />
        }
      </div>
    )
  }
}

export default MuralContainer;