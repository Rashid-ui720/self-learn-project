import React from "react";
import axios from "axios";
import { ApiRoute } from "../../util/routes";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContent } from "../../components/Toast";
import { withTranslation } from "react-i18next";
import ForgetPassword from "./forgetPassword"
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null,
      email: "",
      password: "",
      ForgetPasswordModal:false
    };
  }

  onOpenModal = () => {
    this.setState({ ForgetPasswordModal: true });
  };

  onCloseModal = () => {
    this.setState({ ForgetPasswordModal: false });
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
          document.getElementById("loginbtn").click();
        }
      });
    }
  }
  loginUser() {
    const { t } = this.props;
    if (this.state.email === "" || this.state.password === "") {
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
      var bodyFormData = new FormData();
      bodyFormData.append("email", this.state.email);
      bodyFormData.append("password", this.state.password);
      axios
        .post(ApiRoute.LoginUser, bodyFormData)
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
            if(res.data.data.user_type=="1"){
              toast.dismiss();
              toast(() => ToastContent(t("alerts.freelanceraccount")), {
                toastId: "infoToast",
                hideProgressBar: true,
                type: toast.TYPE.ERROR,
                autoClose: 2000,
              });
            }
            else{
 localStorage.setItem("userData", JSON.stringify(res));
            toast.dismiss();
            toast(() => ToastContent(res.data.message), {
              toastId: "infoToast",
              hideProgressBar: true,
              type: toast.TYPE.SUCCESS,
              autoClose: 2000,
            });
            window.location.reload();
            }
           
          }
        })
        .catch((err) => {
          this.setState({ err: err });
        });
    }
  }

  render() {
    const { t } = this.props;
    return (
      <div className="tab-content" id="tab2">
        <form className="login" action="/dashboard">
          <p className="form-row form-row-wide">
            <label htmlFor="username">
              {t("form.email")}
              <i className="im im-icon-Male"></i>
              <input
                type="text"
                className="input-text"
                name="username"
                id="username"
                vlaue={this.state.vlaue}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
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
                vlaue={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </label>
            <span className="lost_password">
              <a  onClick={this.onOpenModal} style={{cursor:"pointer"}} > {t("form.lostpassword")}</a>
            </span>
          </p>

          <div className="form-row">
            <div className="checkboxes margin-top-10">
              <input id="remember-me" type="checkbox" name="check" />
              <label htmlFor="remember-me">{t("form.rememberme")}</label>
            </div>
          </div>
        </form>
        <button
          className="button border margin-top-5"
          id="loginbtn"
          onClick={() => this.loginUser()}
        >
          {t("form.login")}
        </button>
        <Modal
          center
          open={this.state.ForgetPasswordModal}
          style={{ zIndex: 100 }}
          onClose={this.onCloseModal}
        >
          <div className="zoom-anim-dialog">
            {/* <!--Tabs --> */}
            <div className="sign-in-form">
              <ul className="tabs-nav" style={{ marginTop: "10%" }}>
                <li className="">
                  <a
                   
                    
                    style={
                     
                            {fontSize: 20,
                            cursor: "pointer",
                            color: "#7AC3EC",
                            borderBottomColor: "#7AC3EC",}
                   
                    }
                  >
                    {t("form.lostpassword")}
                  </a>
                </li>
               
              </ul>

              <div className="tabs-container alt">
                {<ForgetPassword closeModal={this.onCloseModal}/>}
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withRouter(withTranslation()(Login));
