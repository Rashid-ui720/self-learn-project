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
class Register extends React.Component {
  state = {
    err: null,
    full_name: "",
    email: "",
    password: "",
    phone_code: "",
    mobile_no: "",
    device_type: "web",
    device_token: "9asdsadaq2",
    renderOtp: false,
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
  registerUser() {
    const { t } = this.props;
    console.clear();
    if (
      this.state.email === "" ||
      this.state.password === "" ||
      this.state.mobile_no === "" ||
      this.state.full_name === ""
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

      var VerfiyfEmailformdata = new FormData();
      var VerifyPhoneformdata = new FormData();
      //verification form data
      VerfiyfEmailformdata.append("email", this.state.email);
      VerifyPhoneformdata.append("mobile_no", this.state.mobile_no);

      //check for the email
      axios
        .post(ApiRoute.verifyemail, VerfiyfEmailformdata)
        .then((res) => {
          if (res.data.error === 1) {
            toast.dismiss();
            toast(() => ToastContent(res.data.message), {
              toastId: "infoToast",
              hideProgressBar: true,
              type: toast.TYPE.ERROR,
              autoClose: 2000,
            });
          }
          //npw check for the number available
          else {
            axios
              .post(ApiRoute.verifyPhone, VerifyPhoneformdata)
              .then((res) => {
                if (res.data.error === 1) {
                  toast.dismiss();
                  toast(() => ToastContent(res.data.message), {
                    toastId: "infoToast",
                    hideProgressBar: true,
                    type: toast.TYPE.ERROR,
                    autoClose: 2000,
                  });
                }

                //now generate the otp and sed it to user phone number the user
                else {
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
                    "Your SitFast 6 digit OTP code is " +
                    this.state.systemGeneratedOtp +
                    ". Please enter this code in the required field to complete your registration process. Team SitFast. "
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
              })
              .catch((err) => {
                this.setState({ err: err });
              });
          }
        })
        .catch((err) => {
          this.setState({ err: err });
        });
    }
  }

  //Final Registration Method after OPT has entered
  RegisterUser = () => {
    const { t } = this.props;
    toast.dismiss();
    toast(() => ToastContent(t("alerts.pleasewait")), {
      toastId: "infoToast",
      hideProgressBar: true,
      type: toast.TYPE.INFO,
      autoClose: 2000,
    });
    var bodyFormData = new FormData();
    //register form data
    bodyFormData.append("email", this.state.email);
    bodyFormData.append("device_token", this.state.device_token);
    bodyFormData.append("device_type", this.state.device_type);
    bodyFormData.append("phone_code", "+1");
    bodyFormData.append("mobile_no", this.state.mobile_no);
    bodyFormData.append("password", this.state.password);
    bodyFormData.append("full_name", this.state.full_name);
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
        //Finally  after otp success register the user
        axios
          .post(ApiRoute.RegisterUser, bodyFormData)
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
              localStorage.setItem("userData", JSON.stringify(res));
              toast.dismiss();
              toast(() => ToastContent(res.data.message), {
                toastId: "infoToast",
                hideProgressBar: true,
                type: toast.TYPE.INFO,
                autoClose: 2000,
              });
              window.location.reload();
            }
          })
          .catch((err) => {
            this.setState({ err: err });
          });
      } else {
        //in case of incorrect otp
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
              <a  onClick={()=>this.registerUser()}  style={{cursor:"pointer"}} > {t("form.optnotreceived")}</a>
            </span>
        </form>
        <button
          className="button border margin-top-5"
          id="loginbtn"
          onClick={() => this.RegisterUser()}
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
    return (
      <div className="tab-content" id="tab2">
        <form className="register">
          <p className="form-row form-row-wide">
            <label htmlFor="fullname">
              {t("form.fullname")}
              <i className="im im-icon-Male"></i>
              <input
                type="text"
                className="input-text"
                name="fullname"
                id="fullname"
                vlaue={this.state.full_name}
                onChange={(e) => this.setState({ full_name: e.target.value })}
              />
            </label>
          </p>

          <p className="form-row form-row-wide">
            <label htmlFor="email">
              {t("form.email")}
              <i className="im im-icon-Mail"></i>
              <input
                type="text"
                className="input-text"
                name="email"
                id="email"
                vlaue={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </label>
          </p>

          <p className="form-row form-row-wide">
            <label htmlFor="number">
              {t("form.mobilenumber")}

              <PhoneInput
                defaultCountry={"PR"}
                vlaue={this.state.mobile_no}
                onChange={(value) => this.setState({ mobile_no: value })}
              />
              {/* <input
                className="input-text"
                type="text"
                name="number"
                id="number"
                vlaue={this.state.mobile_no}
                onChange={(e) => this.setState({ mobile_no: e.target.value })}
              /> */}
            </label>
          </p>

          <p className="form-row form-row-wide">
            <label htmlFor="password">
              {t("form.password")}
              <i className="im im-icon-Lock-2"></i>
              <input
                className="input-text"
                type="password"
                name="password"
                id="password"
                maxLength="4"
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </label>
          </p>
        </form>
        <button
          className="button border margin-top-5"
          id="signupbtn"
          onClick={() => this.registerUser()}
        >
          {t("form.register")}
        </button>
      </div>
    );
  }
}

export default withRouter(withTranslation()(Register));
