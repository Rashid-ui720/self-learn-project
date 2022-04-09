import React from "react";

import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContent } from "../components/Toast";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Rating from 'react-rating';
import {Star} from "react-feather";
import axios from "axios";
import {ApiRoute} from "../util/routes"
class AddReviews extends React.Component {
  //render method
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      activeTab2: false,
      activeTab1: true,
      userData: null,
      comment:"",
      rating:0,
    };
  }
  componentDidMount() {
    const user_data = JSON.parse(localStorage.getItem("userData"));

    this.setState({ userData: user_data });
  }
  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  ShowLoginMessage = () => {
    const { t } = this.props;
    this.onOpenModal();
    toast.dismiss();
    toast(() => ToastContent(t("alerts.sigininmessgaeforreview")), {
      toastId: "infoToast",
      hideProgressBar: true,
      type: toast.TYPE.INFO,
      autoClose: 2000,
    });
  };



  //addReview
  AddReview=()=>{
    const { t } = this.props;
    
    toast.dismiss();
      if(this.state.comment=="" || this.state.rating==0){
      
            toast(() => ToastContent(t("alerts.fillfeilds")), {
              toastId: "infoToast",
              hideProgressBar: true,
              type: toast.TYPE.ERROR,
              autoClose: 2000,
            });
            return;
          
      }
      toast(() => ToastContent(t("alerts.pleasewait")), {
        toastId: "infoToast",
        hideProgressBar: true,
        type: toast.TYPE.INFO,
        autoClose: 2000,
      });

      
    
  var formdata={
    customer_id:this.state.userData.data.data.user_id,
    provider_id:this.props.provider_id,
    rating:this.state.rating,
    comment:this.state.comment,
    type:0
  }
 
  axios
  .post(ApiRoute.addReview,formdata)
  .then((res) => {
     
  toast.dismiss();
  toast(() => ToastContent(res.data.message), {
    toastId: "infoToast",
    hideProgressBar: true,
    type: toast.TYPE.SUCCESS,
    autoClose: 2000,
  });
  window.location.reload()
  })
  .catch((err) => {
    toast.dismiss();
  toast(() => ToastContent(t("alerts.unexpectederror")), {
    toastId: "infoToast",
    hideProgressBar: true,
    type: toast.TYPE.SUCCESS,
    autoClose: 2000,
  });
  });

  }
  render() {
    const { t } = this.props;
    const { activeTab1, activeTab2 } = this.state;
    return (
      <div id="listing-reviews " className="listing-section " style={{marginTop:"4rem"}}>
    

    <section id="contact">
                <h4 className="headline margin-bottom-35">
                  {t("detailpage.addreview")}
                </h4>

                <div id="contact-message"></div>

               
               <div>
                   <h4>  {t("detailpage.rating")}</h4>
                   <Rating
          emptySymbol={<Star size={25} fill='#babfc7' stroke='#babfc7' />}
          fullSymbol={<Star size={25} fill={"rgb(122, 195, 236)"} stroke={"rgb(122, 195, 236)"} />}
          
          onChange={(value)=>this.setState({rating:value})}
          step={1}
          initialRating={this.state.rating}
       
        />
               </div>
               

                <div>
                  <textarea
                    name="comments"
                    cols="40"
                    rows="3"
                    id="comments"
                    onChange={(e) => this.setState({comment:e.target.value})}
                    value={this.state.comment}
                    placeholder= {t("detailpage.comment")}
                    spellCheck="true"
                    required="required"
                  ></textarea>
                </div>
                {this.state.userData == null ? (
                         <input
                         type="submit"
                         className="submit button"
                         id="submit"
                         value={t("detailpage.sendreview")}
                            onClick={() => this.ShowLoginMessage()}
                           
                            
                          />
                           
                        ) : (
                <input
                  type="submit"
                  className="submit button"
                  id="submit"
                  value={t("detailpage.sendreview")}
                  onClick={() => this.AddReview()}
                />)}
              </section>
   <Modal center open={this.state.open} onClose={this.onCloseModal}>
          <div className="zoom-anim-dialog">
            {/* <!--Tabs --> */}
            <div className="sign-in-form">
              <ul className="tabs-nav" style={{ marginTop: "10%" }}>
                <li className="">
                  <a
                    onClick={() =>
                      this.setState({
                        activeTab1: !activeTab1,
                        activeTab2: false,
                      })
                    }
                    style={
                      !activeTab1
                        ? {
                            fontSize: 20,
                            cursor: "pointer",
                          }
                        : {
                            fontSize: 20,
                            cursor: "pointer",
                            color: "#7AC3EC",
                            borderBottomColor: "#7AC3EC",
                          }
                    }
                  >
                    {t("form.login")}
                  </a>
                </li>
                <li>
                  <a
                    onClick={() =>
                      this.setState({
                        activeTab2: !activeTab2,
                        activeTab1: false,
                      })
                    }
                    style={
                      !activeTab2
                        ? {
                            fontSize: 20,
                            cursor: "pointer",
                          }
                        : {
                            fontSize: 20,
                            cursor: "pointer",
                            color: "#7AC3EC",
                            borderBottomColor: "#7AC3EC",
                          }
                    }
                  >
                    {t("form.register")}
                  </a>
                </li>
              </ul>

              <div className="tabs-container alt">
                {activeTab2 ? <Register /> : <Login />}
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withTranslation()(AddReviews);
