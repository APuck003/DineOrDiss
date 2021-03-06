import React, { Component } from "react";
import axios from "axios";
import { API_KEY } from "../constants";
import { Image } from "semantic-ui-react";
import {ReviewList} from "../ReviewList"
import {Link} from 'react-router-dom'

// console.log(this.props.location.state)

export class RestaurantPage extends Component {
  constructor() {
    super();
    this.state = {
      restaurant: {},
      isLoading: false,
      reviews: [],
      showAll: false
    };
  }

  componentDidMount = () => {
    console.log(this.props.location.state.id)
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`
      }
    };
    axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${
          this.props.location.state.id
        }`,
        config
      )
      .then(restaurant => {
        this.setState({
          restaurant: restaurant,
          isLoading: true
        }, () => {this.getReviews()});
      });
  };

  getReviews = () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`
      }
    };

    axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${
          this.props.location.state.id
        }/reviews`,
        config
      )
      .then(data => {

        this.setState({
          reviews: data.data.reviews
        }, () => {console.log(this.state.reviews)})} 
        )}
      

  render() {
    let restaurant = this.state.restaurant.data;
    console.log(restaurant);


    return (
      

      
      <div>
        {this.state.isLoading ? (
          <div className="restInfo">
          <div className="title-photos">
              <h1>{restaurant.name}</h1>
              <div className="photos">
                <Image src={restaurant.photos[0]} width="200" />
                <Image className="middlepic" src={restaurant.photos[1]} width="200" />
                <Image src={restaurant.photos[2]} width="200" />
              </div>
            </div>
            <p>{restaurant.display_phone}</p>
            <p>Total Reviews: {restaurant.review_count}</p>
            <p>Rating: {restaurant.rating}</p>
            <p>Location: {restaurant.location["display_address"]}</p>
            <p>Price: {restaurant.price}</p>
            <ReviewList reviews={this.state.reviews}/>
            <button className="restpagehomebutton"><Link to={{ pathname: `/users/${localStorage.user_id}`}}>Home</Link></button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}
