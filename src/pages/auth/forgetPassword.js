import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { ApiRoute } from "../../util/routes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContent } from "../../components/Toast";
import { withTranslation } from "react-i18next";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
class ForgetPassword extends React.Component {
  state = {
    err: null,
    token:"259035a4a6bff1c585efbbdaa14fb670",
    Newpassword:"",
    ConfirmPassword:"",
    mobile_no: "",
    device_type: "web",
    device_token: "9asdsadaq2",
    renderOtp: false,
    renderPassword:false,
    UserEnteredotp: "",
    systemGeneratedOtp: "",
  };

  componentDidMount() {
    // Get the input field
    var inputs = document.getElementsByClassName("input-text");
    for (let i = 0; i < inputs.length; i++) {
      // Execute a function when the user releases a key on the keyboard
      inputs[i].addEventListener("keyup", function (event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          document.getElementById("signupbtn").click();
        }
      });
    }
  }

//   Send otp on phone
  SendOTP() {
    const { t } = this.props;
    if (
      
      this.state.mobile_no === ""
     
    ) {
      toast.dismiss();
      toast(() => ToastContent(t("alerts.fillfeilds")), {
        toastId: "infoToast",
        hideProgressBar: true,
        type: toast.TYPE.ERROR,
        autoClose: 2000,
      });
    } else {
      toast.dismiss();
      toast(() => ToastContent(t("alerts.pleasewait")), {
        toastId: "infoToast",
        hideProgressBar: true,
        type: toast.TYPE.INFO,
        autoClose: 2000,
      });

     
      var VerifyPhoneformdata = new FormData();
     
      VerifyPhoneformdata.append("mobile_no", this.state.mobile_no);

     
     //check phone number exists
            axios
              .post(ApiRoute.verifyPhone, VerifyPhoneformdata)
              .then((res) => {
                if (res.data.error === 1) {
                   //Generate an otp and show the user otp screen
                   this.setState({
                    systemGeneratedOtp: Math.floor(
                      100000 + Math.random() * 900000
                    ),
                  });

                
                  var SendOTPMessageFormData = new FormData();
                  SendOTPMessageFormData.append(
                    "mobile_no",
                    this.state.mobile_no
                  );
                  SendOTPMessageFormData.append(
                    "message",
                    "your sitfasst new 6 digits OTP code is " +
                      this.state.systemGeneratedOtp +
                      " Please enter this in the required feild to get registered"
                  );
                  //send the otp to user phone number
                  axios
                    .post(ApiRoute.sendOtp, SendOTPMessageFormData)
                    .then((res) => {
                      if (res.data.error === 1) {
                        
                        toast.dismiss();
                        toast(() => ToastContent(res.data.message), {
                          toastId: "infoToast",
                          hideProgressBar: true,
                          type: toast.TYPE.ERROR,
                          autoClose: 2000,
                        });
                      } else {
                        
                        toast.dismiss();
                        toast(() => ToastContent(t("alerts.otpSent")), {
                          toastId: "infoToast",
                          hideProgressBar: true,
                          type: toast.TYPE.SUCCESS,
                          autoClose: 2000,
                        });
                        this.setState({ renderOtp: true });
                      }
                    })
                    .catch((err) => {
                      toast.dismiss();
                      toast(
                        () => ToastContent(t("alerts.somethingwronginotp")),
                        {
                          toastId: "infoToast",
                          hideProgressBar: true,
                          type: toast.TYPE.ERROR,
                          autoClose: 2000,
                        }
                      );
                      this.setState({ err: err });
                    });
                }

                //now generate the otp and sed it to user phone number the user
                else {
                  
                    toast.dismiss();
                    toast(() => ToastContent(t("alerts.nonumberFound")), {
                      toastId: "infoToast",
                      hideProgressBar: true,
                      type: toast.TYPE.ERROR,
                      autoClose: 2000,
                    });
                
                }
              })
              .catch((err) => {
                this.setState({ err: err });
              });
          
    }
  }

  // Method after OPT has entered
  VerifyUser = () => {
    const { t } = this.props;
   
    
    if (this.state.UserEnteredotp == "") {
      toast.dismiss();
      toast(() => ToastContent(t("alerts.fillfeilds")), {
        toastId: "infoToast",
        hideProgressBar: true,
        type: toast.TYPE.ERROR,
        autoClose: 2000,
      });
    } else {
      //check if otp is correct
      if (
        parseInt(this.state.UserEnteredotp) == this.state.systemGeneratedOtp
      ) {
       this.setState({renderPassword:true,renderOtp:false})
    }
    else{
        toast.dismiss();
      toast(() => ToastContent(t("alerts.worngotp")), {
        toastId: "infoToast",
        hideProgressBar: true,
        type: toast.TYPE.ERROR,
        autoClose: 2000,
      }); 
    }
}
  };

  ChangePasssword=()=>{
    const { t } = this.props;
    toast.dismiss();
    toast(() => ToastContent(t("alerts.pleasewait")), {
      toastId: "infoToast",
      hideProgressBar: true,
      type: toast.TYPE.INFO,
      autoClose: 2000,
    });
    if (this.state.password == "" || this.state.ConfirmPassword=="") {
        toast.dismiss();
        toast(() => ToastContent(t("alerts.fillfeilds")), {
          toastId: "infoToast",
          hideProgressBar: true,
          type: toast.TYPE.ERROR,
          autoClose: 2000,
        });
      } 
      else{
          if(this.state.Newpassword==this.state.ConfirmPassword){
            var forgetPasswordFormData = new FormData();
            forgetPasswordFormData.append(
              "token",
              this.state.token
            );
            forgetPasswordFormData.append(
                "new_password",
                this.state.Newpassword
              );
              forgetPasswordFormData.append(
                "confirm_password",
                this.state.ConfirmPassword
              );
              forgetPasswordFormData.append(
                "mobile",
                this.state.mobile_no
              );
            axios
            .post(ApiRoute.forgetPassword, forgetPasswordFormData)
            .then((res) => {
              if (res.data.error === 1) {
                toast.dismiss();
                toast(() => ToastContent(res.data.message), {
                  toastId: "infoToast",
                  hideProgressBar: true,
                  type: toast.TYPE.ERROR,
                  autoClose: 2000,
                });
              } else {
                
                toast.dismiss();
                toast(() => ToastContent(res.data.message), {
                  toastId: "infoToast",
                  hideProgressBar: true,
                  type: toast.TYPE.SUCCESS,
                  autoClose: 2000,
                });
                this.props.closeModal()
              }
            })
            .catch((err) => {
              toast.dismiss();
              toast(
                () => ToastContent(t("alerts.somethingwronginotp")),
                {
                  toastId: "infoToast",
                  hideProgressBar: true,
                  type: toast.TYPE.ERROR,
                  autoClose: 2000,
                }
              );
              this.setState({ err: err });
            });
          
          }
          else{
            toast.dismiss();
            toast(() => ToastContent(t("alerts.nomatchpass")), {
              toastId: "infoToast",
              hideProgressBar: true,
              type: toast.TYPE.ERROR,
              autoClose: 2000,
            });  
          }
        
      }
  }

  //render password
  RenderPasswordFeilds=()=>{
    const { t } = this.props;
    return (
      <div className="tab-content" id="tab2">
        <form className="login" action="/dashboard">
        <p className="form-row form-row-wide">
            <label htmlFor="newpassword">
              {t("form.newpassword")}
              <i className="im im-icon-Lock-2"></i>
              <input
                className="input-text"
                type="password"
                name="password"
                id="password"
                maxLength="4"
                value={this.state.Newpassword}
                onChange={(e) => this.setState({ Newpassword: e.target.value })}
              />
            </label>
          </p>
          <p className="form-row form-row-wide">
            <label htmlFor="newpassword">
              {t("form.confirmpassword")}
              <i className="im im-icon-Lock-2"></i>
              <input
                className="input-text"
                type="password"
                name="password"
                id="password"
                maxLength="4"
                value={this.state.ConfirmPassword}
                onChange={(e) => this.setState({ ConfirmPassword: e.target.value })}
              />
            </label>
          </p>
        </form>
        <button
          className="button border margin-top-5"
          id="loginbtn"
          onClick={() => this.ChangePasssword()}
        >
          {t("form.submit")}
        </button>
      </div>
    );
  }
  //render OTP input

  RenderOtpInput = () => {
    const { t } = this.props;
    return (
      <div className="tab-content" id="tab2">
        <form className="login" action="/dashboard">
          <p className="form-row form-row-wide">
            <label htmlFor="otp">
              {t("form.otpdesc")}
              <i className="im im-icon-Lock-2"></i>
              <input
                type="number"
                className="input-text"
                name="otp"
                id="otp"
                vlaue={this.state.UserEnteredotp}
                onChange={(e) =>
                  this.setState({ UserEnteredotp: e.target.value })
                }
              />
            </label>
          </p>
          <span className="lost_password">
              <a  onClick={()=>this.SendOTP()}  style={{cursor:"pointer"}} > {t("form.optnotreceived")}</a>
            </span>
        </form>
        <button
          className="button border margin-top-5"
          id="loginbtn"
          onClick={() => this.VerifyUser()}
        >
          {t("form.submit")}
        </button>
      </div>
    );
  };
  render() {
    const { t } = this.props;
    if (this.state.renderOtp) {
      return this.RenderOtpInput();
    }
    if(this.state.renderPassword){
        return this.RenderPasswordFeilds();
    }
    return (
      <div className="tab-content" id="tab2">
        <form className="register">
          <p className="form-row form-row-wide">
            <label htmlFor="number">
              {t("form.mobilenumberRegistered")}
              <PhoneInput
                defaultCountry={"PR"}
                vlaue={this.state.mobile_no}
                onChange={(value) => this.setState({ mobile_no: value })}
              />
            </label>
          </p>
        </form>
        <button
          className="button border margin-top-5"
          id="signupbtn"
          onClick={() => this.SendOTP()}
        >
         {t("form.submit")}
        </button>
      </div>
    );
  }
}

export default withRouter(withTranslation()(ForgetPassword));
