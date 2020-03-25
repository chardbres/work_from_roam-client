import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { StarRating } from './StarsRating'

// import TestButton from '../TestButton'
import messages from '../AutoAlert/messages'
import './ReviewForm.scss'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

  class ReviewCreate extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        work_space_id: props.currentWorkspace.id,
        rating: 3,
        review: '',
        wifi: '',
        noise: 3,
        bathroom: 3,
        coffee: false,
        food: false,
        outlet: false,
        seating: '',
        display: 'block',
        redirect: false,
        isChecked: props.isChecked || false
      }
      this.toggleChange = this.toggleChange.bind(this);
    }

    componentDidMount(props) {
      console.log('reviewform data: ' + this.props.placeData)
    }

    handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
      // console.log(event.target.value)
    }

    toggleChange = (event) => {
      this.setState({ [event.target.name]: !this.state[event.target.name] })
    }

    handleSubmit = (event) => {
      event.preventDefault()

      const { alert } = this.props

        axios({
          method: 'post',
          url: apiUrl + '/reviews',
          data: {
            review: {
              work_space_id: this.state.work_space_id,
              rating: this.state.rating,
              noise: this.state.noise,
              bathroom: this.state.bathroom,
              seating: this.state.seating,
              coffee: this.state.coffee ? "5" : "0",
              outlet: this.state.outlet ? "5" : "0",
              food: this.state.food ? "5" : "0",
              wifi: this.state.wifi,
              note: this.state.review
            }
          },
          headers: {
            Authorization: `Token token=${this.props.user.token}`
          }
        })
        .then(data => {
          // console.log(data)
          axios(apiUrl + '/work_spaces')
            .then(data => {
                // console.log(data)
                this.props.setApp({ allData: data.data.work_spaces })
            })
          this.setState({ display: 'none' })
        })
        .then(() => alert({
        heading: 'Thanks for your review!',
        message: messages.reviewCreateSuccess,
        variant: 'success',
        image: 'Roman.png'
      }))
      // 3. redirect to '/' and close the review form
      .catch(() => alert('create review failed'))
    }

    closeWindow = () => {
      // update state which updates component's style to display: none
      this.setState({ display: 'none' })
    }

    render () {
      let placeName = ''
      // if user is not signed in, redirect to '/sign-in'

      if (this.props.placeData && this.props.placeData.name) {
        placeName = this.props.placeData.name
      }

      let placeImage = ''

      if (this.props.placeData && this.props.placeData.photos) {
        placeImage =  this.props.placeData.photos[0].getUrl()

}


      // console.log(placeImage)

        if (!this.props.user) {
          return (<Redirect to='/sign-in'/>)
        }

        if (this.state.display === 'none') {
          return (<Redirect to='/'/>)
        }

      return (

          <div className='review-form' style={{display: this.state.display}}>

          <Link to='/'>
            <button className="close-window" style={{float: 'right'}} onClick={this.closeWindow}>X</button>
          </Link>


          {/* This is the tag for the place image, commented out (for now)
            <a href={this.props.placeData.website} target="_blank" rel="noopener noreferrer">
              <img height={'100px'} alt={'pic'} src={placeImage} />
            </a>
             */}
      <div className="review-scroll">
      <h1 className="main-header">Give {placeName} a review!</h1>
      <Form onSubmit={this.handleSubmit}>
        <Form.Group className="stars">
          <StarRating
            value={this.state.rating}
            onStarClick= {(val) => this.setState({ rating: val })}
        />
        </Form.Group>

        <h2 className="question-header">General Information</h2>
        <Form.Row className="gen-info-options">
          <Form.Group>
            <Form.Check
              className="checkbox-toolbar"
              type="checkbox"
              label="Outlets"
              onChange={this.toggleChange}
              name="outlet"
              id="outlet"
            />
          </Form.Group>

          <Form.Group>
            <Form.Check
              className="checkbox-toolbar"
              type="checkbox"
              label="Coffee"
              onChange={this.toggleChange}
              name="coffee"
              id="coffee"
            />
          </Form.Group>

          <Form.Group>
            <Form.Check
              className="checkbox-toolbar"
              type="checkbox"
              label="Food"
              onChange={this.toggleChange}
              name="food"
              id="food"
            />
          </Form.Group>
        </Form.Row>

        <Form.Group className="question mt-0">
          <Form.Label className="question-header" htmlFor="wifi">How was the Wifi?*</Form.Label>
          <Form.Row>
            <Form.Check
              className="radio-toolbar"
              type="radio"
              label="None"
              value="0"
              checked={this.state.wifi === '0'}
              name="wifi"
              onChange={this.handleChange}
              id="wifi1"
            />
            <Form.Check
              className="radio-toolbar"
              type="radio"
              label="Slow"
              value="1"
              checked={this.state.wifi === '1'}
              name="wifi"
              onChange={this.handleChange}
              id="wifi2"
            />
            <Form.Check
              className="radio-toolbar"
              type="radio"
              label="Spotty"
              value="2.5"
              checked={this.state.wifi === '2.5'}
              name="wifi"
              onChange={this.handleChange}
              id="wifi3"
            />
            <Form.Check
              className="radio-toolbar"
              type="radio"
              label="Fast!"
              value="5"
              checked={this.state.wifi === '5'}
              name="wifi"
              onChange={this.handleChange}
              id="wifi4"
            />
          </Form.Row>
        </Form.Group>

        <Form.Group className="question">
          <Form.Label className="question-header" htmlFor="name">How noisy was it?*</Form.Label>
          <Form.Row>
            <Form.Check
              className="radio-toolbar"
              type="radio"
              label="Quiet"
              value="1"
              checked={this.state.noise === '1'}
              name="noise"
              onChange={this.handleChange}
              id="noise1"
            />
            <Form.Check
              className="radio-toolbar"
              type="radio"
              label="Moderate"
              value="2.5"
              checked={this.state.noise === '2.5'}
              name="noise"
              onChange={this.handleChange}
              id="noise2"
            />
            <Form.Check
              className="radio-toolbar"
              type="radio"
              label="Loud"
              value="5"
              checked={this.state.noise === '5'}
              name="noise"
              onChange={this.handleChange}
              id="noise3"
            />
          </Form.Row>
        </Form.Group>

        <Form.Group className="question">
          <Form.Label className="question-header" htmlFor="name">How were the bathrooms?*</Form.Label>
          <Form.Row>
            <Form.Check
              className="radio-toolbar"
              type="radio"
              label="None"
              value="0"
              checked={this.state.bathroom === '0'}
              name="bathroom"
              onChange={this.handleChange}
              id="bathroom1"
            />
            <Form.Check
              className="radio-toolbar"
              type="radio"
              label="Messy"
              value="1"
              checked={this.state.bathroom === '1'}
              name="bathroom"
              onChange={this.handleChange}
              id="bathroom2"
            />
            <Form.Check
              className="radio-toolbar"
              type="radio"
              label="Usable"
              value="2.5"
              checked={this.state.bathroom === '2.5'}
              name="bathroom"
              onChange={this.handleChange}
              id="bathroom3"
            />
            <Form.Check
              className="radio-toolbar"
              type="radio"
              label="Great!"
              value="5"
              checked={this.state.bathroom === '5'}
              name="bathroom"
              onChange={this.handleChange}
              id="bathroom4"
            />
          </Form.Row>
        </Form.Group>

        <Form.Group className="question">
          <Form.Label className="question-header" htmlFor="seating">What was the seating like?*</Form.Label>
          <Form.Row>
            <Form.Check
              className="radio-toolbar"
              type="radio"
              label="None"
              value="0"
              checked={this.state.seating === '0'}
              name="seating"
              onChange={this.handleChange}
              id="seating1"
            />
            <Form.Check
              className="radio-toolbar"
              type="radio"
              label="Very Little"
              value="1"
              checked={this.state.seating === '1'}
              name="seating"
              onChange={this.handleChange}
              id="seating2"
            />
            <Form.Check
              className="radio-toolbar"
              type="radio"
              label="Adequate"
              value="2.5"
              checked={this.state.seating === '2.5'}
              name="seating"
              onChange={this.handleChange}
              id="seating3"
            />
            <Form.Check
              className="radio-toolbar"
              type="radio"
              label="Lots!"
              value="5"
              checked={this.state.seating === '5'}
              name="seating"
              onChange={this.handleChange}
              id="seating4"
            />
          </Form.Row>
        </Form.Group>

        <Form.Group className="question">
          <Form.Label className="question-header" htmlFor="name">Write a review (optional)</Form.Label>
          <Form.Control
            style={{ height: '50px', width: '250px' }}
            type="text"
            as="textarea"
            placeholder="Enter Your Review..."
            value={this.state.review}
            name="review"
            onChange={this.handleChange}
            id="review"
          />
        </Form.Group>

        <Button className="submit-button" type="submit"> Submit </Button>
        </Form>
        </div>
      </div>
      )
    }
  }




  export default ReviewCreate;
