import React,{Component} from 'react';
import Particles from 'react-particles-js';


//components
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';

const ParticlesOptions = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5
      }
    },
    number:{
      value:30,
      density:{
        enable:true,
        value_area:800
      }
    }
  }
}


const initialState = {
  input:'',
  imageUrl:'',
  box: {},
  info: {},
  route:'signin',
  isSignedIn: false,
  user:{
    id:'',
    name:'',
    email:'',
    entries:'',
    joined:''
  }
}

class App extends Component {
  constructor() {
    super()
    this.state=initialState;
  }

  loadUser = (userData) =>{
    this.setState({user:{
      id:userData.id,
      name:userData.name,
      email:userData.email,
      entries:userData.entries,
      joined:userData.joined
    }
  })
  }


  getInfo = (data) =>{
    return {
      age : data.outputs[0].data.regions[0].data.face.age_appearance.concepts[0].name,
      gender : data.outputs[0].data.regions[0].data.face.gender_appearance.concepts[0].name,
      location : data.outputs[0].data.regions[0].data.face.multicultural_appearance.concepts[0].name
    }
  }

  displayInfo = (info) =>{
    this.setState({info:info})
  }

  calculateFaceLocation = (data)=>{
    const dimensions = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      top_row: dimensions.top_row * height,
      left_col: dimensions.left_col * width,
      right_col: width - (dimensions.right_col * width),
      bottom_row: height - (dimensions.bottom_row * height)
    }
  }

  displayFaceBox = (box) =>{
    this.setState({box: box});
  }

  onInputChange = (event) =>{
    this.setState({
      input:event.target.value
    });
  }
  onButtonSubmit = () =>{
    this.setState({imageUrl:this.state.input})
    fetch('https://dry-fortress-38309.herokuapp.com/imageurl',{
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        input: this.state.input
      })
    })
    .then(response=>response.json())
    .then(response => {
      fetch('https://dry-fortress-38309.herokuapp.com/image',{
        method:'put',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          id:this.state.user.id
        })
      })
      .then(response=>response.json())
      .then(count=>{
        this.setState(Object.assign(this.state.user, {entries:count}))
      })
      this.displayFaceBox(this.calculateFaceLocation(response));
      this.displayInfo(this.getInfo(response));
    })
    .catch(err=>console.log(err))
  }

  onRouteChange = (route) =>{
    if(route==='signout'){
      this.setState(initialState)
    } else if(route==='home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route})
  }

  render(){
    return(
      <div className='main-body'>
      <Particles params={ParticlesOptions}/>
      <div className='components'>
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
      { this.state.route === 'home'
        ? <div>
          <Logo/>
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageLinkForm
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} info={this.state.info}/>
          </div>
        : (
          this.state.route === 'signin'
          ? <Signin loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
          : (this.state.route === 'register'
            ? <Register loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
            : <Signin loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
        )
        )
      }
      </div>
      </div>
    )
  }
}
export default App;
