import React,{Component} from 'react'

import './Signin.css'


class Signin extends Component{
  constructor(props){
    super(props);
    this.state = {
      signInEmail:'',
      signInPassword:''
    }
  }

  onEmailChange = (event) =>{
    this.setState({signInEmail:event.target.value})
  }

  onPasswordChange = (event) =>{
    this.setState({signInPassword:event.target.value})
  }

  onSubmitSignIn = () =>{
    if(this.state.signInEmail && this.state.signInPassword){
    fetch('https://dry-fortress-38309.herokuapp.com/signin',{
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email:this.state.signInEmail,
        password:this.state.signInPassword
      })
    })
    .then(response => response.json())
    .then(user => {
      if(user){
        this.props.loadUser(user)
        this.props.onRouteChange('home')
      }
    })
  }
  }

  render(){
    const {onRouteChange} = this.props
    return(
      <div className='signin-body'>
        <div className='signin-main-body'>
        <fieldset>
          <legend className='signin-header'>Sign In</legend>
          <div className="mt3">
            <label className='text' htmlFor="email-address">Email :</label>
            <input
              onChange={this.onEmailChange}
              className="input-box"
              type="email"
              name="email-address"
              id="email-address"
              placeholder='Enter your Email..'
              />
          </div>
          <div className="mv3">
            <label className="text" htmlFor="password">Password :</label>
            <input onChange={this.onPasswordChange}
              className="input-box"
              type="password"
              name="password"
              id="password"
              placeholder='Enter your Password..'
              />
          </div>
        </fieldset>
        <div className="">
          <input onClick={this.onSubmitSignIn}
            className="signin-btn"
            type="submit"
            value="Sign in"/>
        </div>
        <div className="lh-copy mt3">
          <p onClick={()=>onRouteChange('register')} className="register-btn">Not a member, Register Here.</p>
        </div>
        </div>
      </div>
    )
  }
}

export default Signin;
