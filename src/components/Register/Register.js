import React,{Component} from 'react';

import './Register.css'


class Register extends Component{
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      name:''
    }
  }

  onNameChange = (event) =>{
    this.setState({name:event.target.value})
  }

  onEmailChange = (event) =>{
    this.setState({email:event.target.value})
  }

  onPasswordChange = (event) =>{
    this.setState({password:event.target.value})
  }

  onSubmitRegister = () =>{
      fetch('https://dry-fortress-38309.herokuapp.com/register',{
        method:'post',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          email:this.state.email,
          password:this.state.password,
          name:this.state.name
        })
      })
      .then(response => response.json())
      .then(user => {
        if(user){
          this.props.loadUser(user)
          this.props.onRouteChange('home')
        }
      })
      .catch(err=>console.log('registration error'))
  }


  render(){
    return(
      <div className='signin-body'>
        <div className='signin-main-body'>
          <fieldset>
            <legend className='signin-header'>Register</legend>
            <div className="mt3">
              <label className="text" htmlFor="name">Name :</label>
              <input onChange={this.onNameChange}
                className="input-box"
                type="text"
                name="name"
                id="name"
                placeholder='Enter your Name..'
                />
            </div>
            <div className="mt3">
              <label className="text" htmlFor="email-address">Email</label>
              <input onChange={this.onEmailChange}
                className="input-box"
                type="email"
                name="email-address"
                id="email-address"
                placeholder='Enter your Email..'
                />
            </div>
            <div className="mv3">
              <label className="text" htmlFor="password">Password</label>
              <input onChange={this.onPasswordChange}
                className="input-box"
                type="password"
                name="password"
                id="password"
                placeholder='Enter your Password'
                />
            </div>
          </fieldset>
          <div className="">
            <input onClick={this.onSubmitRegister} className="signin-btn" type="submit" value="Register and Log in"/>
          </div>
          </div>
      </div>
    )
  }
}

export default Register;
