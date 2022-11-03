import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Container } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import Land from '../abis/LandRegistry.json'
import { withStyles } from '@material-ui/core/styles'
import '../App.css'
import '../index.css'

const styles = () => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    '& .MuiFormLabel-root': {
      color: '#000',
    },
    '&  .MuiInputBase-root': {
      color: '#000',
    },
    '&  .MuiInput-underline:before': {
      borderBottomColor: '#000',
    },
    '&  .MuiInput-underline:after': {
      borderBottomColor: '#000',
    },
    '&  .MuiInput-underline:hover': {
      borderBottomColor: '#000',
    },
    '& .MuiButton-containedPrimary': {
      backgroundColor: '#2e7d32',
      fontFamily: "'Poppins', sans-serif",
    },
  },
})

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      authenticated: false,
    }
  }
  componentDidMount = async () => {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    await window.localStorage.setItem('web3account', accounts[0])
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const LandData = Land.networks[networkId]
    if (LandData) {
      const landList = new web3.eth.Contract(Land.abi, LandData.address)
      this.setState({ landList })
    } else {
      window.alert('Token contract not deployed to detected network.')
    }

    if (window.localStorage.getItem('authenticated') === 'true')
      window.location = '/dashboard'
  }
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value })
  }
  handleSubmit = async () => {
    let data = {
      address: this.state.address,
    }
    if (this.state.address) {
      try {
        console.log(data.address)
        const user = await this.state.landList.methods
          .getUser(data.address)
          .call()

        if (user) {
          console.log(user)
          this.setState({
            uid: user[0],
            uname: user[1],
            ucontact: user[2],
            uemail: user[3],
            ucode: user[4],
            ucity: user[5],
            exist: user[6],
          })
          if (this.state.exist) {
            window.localStorage.setItem('authenticated', true)
            window.location = '/dashboard'
          } else {
            console.log('Login Failed')
            window.localStorage.setItem('authenticated', false)
            this.props.history.push('/login')
          }
        } else {
          console.log('Please try again')
        }
      } catch (error) {
        console.log('error:', error)
      }
    } else {
      alert('All fields are required')
    }
  }
  render() {
    const { classes } = this.props
    return (
      <div className="fullScreenBG-bg">
        <Container style={{ marginTop: '40px' }} className={classes.root}>
          <div className={["login-block","col-lg-6","col-md-9","col-sm-12"].join(" ")}>
          <div className="login-text">User Login</div>
          <div className="input" style={{ width: '90%', margin: 'auto' }}>
            <TextField
              id="standard-full-width"
              type="address"
              label="Wallet Address"
              placeholder="Enter Your Wallet Address"
              fullWidth
              value={this.state.address}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange('address')}
            />
          </div>

          <div>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                endIcon={<SendIcon>submit</SendIcon>}
                onClick={this.handleSubmit}
              >
                Login
              </Button>
            </div>
          </div>
          <div
            style={{ marginTop: '20px', textAlign: 'center', color: '#000' }}
          >
            Don't have an account?{'   '}{' '}
            <a href="/signup" style={{ color: '#2e7d32' }}>
              Sign Up
            </a>
          </div>
          </div>
        </Container>
      </div>
    )
  }
}
export default withStyles(styles)(Login)
