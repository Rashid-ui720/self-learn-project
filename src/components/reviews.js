import React from "react";
import Rating from "@material-ui/lab/Rating";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import AddReviews from "./AddReview"
const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 0,
    backgroundColor: "#7AC3EC",
  },
}))(LinearProgress);
class Reviews extends React.Component {
  //render method

  getDate = (date) => {
    var d = new Date(date);
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  };
  render() {
    const { latestReview, rating_detail, rating,provider_id, t } = this.props;
    return (
      <div id="listing-reviews" className="listing-section">
        <h3 className="listing-desc-headline margin-top-75 margin-bottom-20">
          {t("detailpage.reviews")} <span></span>
        </h3>

        {/* <!-- Rating Overview --> */}
        <div className="rating-overview">
          <div className="rating-overview-box">
            <span className="rating-overview-box-total">{rating}</span>
            <span>
              {" "}
              <Rating
                name="read-only "
                readOnly
                value={parseFloat(rating)}
                precision={0.1}
                style={{ color: "#7AC3EC" }}
              />
            </span>
            <span className="rating-overview-box-percent">
              {" "}
              {t("detailpage.outof5")}
            </span>
            <div className="star-rating" data-rating="5"></div>
          </div>

          <div
            className="rating-bars"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {rating_detail.map((rating, index) => {
              return (
                <div className="rating-bars-item" key={index}>
                  <span className="rating-bars-inner">
                    <strong style={{ marginRight: "3px" }}>
                      {rating.stars}
                    </strong>
                    <i
                      className="fa fa-star"
                      style={{
                        color: "#7AC3EC",
                        fontSize: "16px",
                        marginRight: "10px",
                        marginTop: "5px",
                      }}
                    ></i>
                    <span className="rating-bars-rating" data-rating="4.7">
                      <BorderLinearProgress
                        variant="determinate"
                        value={rating.percentage}
                      />
                    </span>
                    <strong>{rating.rating}</strong>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        {/* <!-- Rating Overview / End --> */}

        <div className="clearfix"></div>

        {/* <!-- Reviews --> */}
        <section className="comments listing-reviews">
          <ul>

            {latestReview.length ==0 ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <p>{t("detailpage.noreview")}</p>
              </div>
            ) : (
              latestReview.map((latestReview,index)=>
                {
return (
  <li key={index}>
                <div className="avatar small">
                {latestReview.user_image=="https://secure.sitfast.app/Salons/App/upload/"? <img  src="./images/userAvtar.webp" alt="" />:
               <img src={latestReview.user_image} alt="" />}
                  
                </div>
                <div className="comment-content">
                  <div className="arrow-comment"></div>
                  <div className="comment-by">
                    {latestReview.first_name} {latestReview.last_name}
                    <i
                      className="tip"
                      data-tip-content="Person who left this review actually was a customer"
                    ></i>
                    <span className="date"> {latestReview.creat_at}</span>
                    <div className="star-rating" data-rating="5"></div>
                  </div>
                  <p>{latestReview.comment}</p>
                </div>
              </li>
)
                })

              
              
            )}
          </ul>
        </section>
<AddReviews  provider_id={provider_id}/>


      </div>
    );
  }
}

export default withTranslation()(Reviews);
