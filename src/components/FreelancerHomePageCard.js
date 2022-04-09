import React from "react";
import { Link } from "react-router-dom";
import { Local_routes } from "../util/routes";
class FreelancerHomePageCard extends React.Component {
 

 
  render() {
    const { ServiceProvider, keyValue } = this.props;
    var email = ServiceProvider.provider_email;
    var splitString = email.split("@");
    return (
      <div className="carousel-item">
        <Link
          to={{
            pathname: Local_routes.detail,
            search: new Buffer(`&query=${true}&U_id=
             ${ServiceProvider.user_id}`).toString("base64"),
          }}
          className="listing-item-container"
        >
          <div className="listing-item">
            <img src={ ServiceProvider.user_image === "https://admin.sitfastapp.com//upload/" ? './images/userAvtar.webp' : ServiceProvider.user_image } />

            {/* <div className="listing-badge now-open">
              price: {ServiceProvider.reservationfees}$
            </div> */}

         
            {/* <span className="like-icon"></span> */}
          </div>
          <div className="star-rating">
          <div className="listing-item-content" style={{paddingRight:"0px"}}>
              {/* <span className="tag">{ServiceProvider.reservationfees}</span> */}
              <h3 style={{ color: 'black' }}>{ServiceProvider.name}</h3>
              <span style={{ color: 'black' }}>
                {/* {splitString[0]} */}
                {ServiceProvider.services.length>0?ServiceProvider.services[0].category:null}
                {/* {splitString[1]} */}
              </span>
            </div>
            {/* <div className="rating-counter">
              (
              {ServiceProvider.totalReviews.total == null
                ? 0
                : ServiceProvider.totalReviews.total}
              reviews)
            </div> */}
          </div>
        </Link>
      </div>
    );
  }
}

export default FreelancerHomePageCard;
