import React from "react";
import SideBar from "../../components/SideBar";
import { withTranslation } from "react-i18next";
import { ApiRoute } from "../../util/routes";
import axios from "axios";
import ImageUploader from "react-images-upload";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContent } from "../../components/Toast";
import PhoneInput,{parsePhoneNumber,getCountryCallingCode } from "react-phone-number-input";
class Profile extends React.Component {
  constructor(props) {
    let user = JSON.parse(localStorage.getItem("userData"));
    super(props);
    this.state = {
      userData: JSON.parse(localStorage.getItem("userData")),
      full_name: user ? user.data.data.first_name : "",
      email: user ? user.data.data.email : "",
      mobile_num: user ? String(user.data.data.mobile) : "",
      defaultCountry:user ? String(user.data.data.mobile) : "",
      country_code: "+92",
      phone_code: "09217",
      user_id: "265",
      image: user ? user.data.data.user_image : "images/user-avatar.jpg",
      image_view:user ? user.data.data.user_image : "images/user-avatar.jpg",
      disabled: true,
      tooglesidebar:false
    };
    console.clear();
    
  }
  toogleSideBar=()=>{
    this.setState({tooglesidebar:!this.state.tooglesidebar})
}
  editProfile=()=>{
    var phoneNumber = parsePhoneNumber(this.state.mobile_num)
   
    let user = JSON.parse(localStorage.getItem("userData"));
    const {t}=this.props
    toast.dismiss();
    toast(() => ToastContent(t("alerts.pleasewait")), {
      toastId: "infoToast",
      hideProgressBar: true,
      type: toast.TYPE.INFO,
      autoClose: 2000,
    });
    var bodyFormData = new FormData();
    bodyFormData.append("full_name", this.state.full_name);
    bodyFormData.append("email", this.state.email);
    bodyFormData.append("mobile_no", this.state.mobile_num);
    bodyFormData.append("phone_code", getCountryCallingCode(phoneNumber.country));
    bodyFormData.append("country_code", getCountryCallingCode(phoneNumber.country));
    bodyFormData.append("image", this.state.image);
    bodyFormData.append("user_id", user.data.data.user_id);
    axios
      .post(ApiRoute.editCustomerProfile,bodyFormData)
      .then((res) => {
        
        if (res.data.error != 0) {
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
          type: toast.TYPE.SUCCESS,
          autoClose: 2000,
        });
        window.location.reload();
      }
      })
      .catch((err) => {
        this.setState({ err: err });
        toast.dismiss();
        toast(() => ToastContent(t("alerts.unexpectederror")), {
          toastId: "infoToast",
          hideProgressBar: true,
          type: toast.TYPE.ERROR,
          autoClose: 2000,
        });
    });
     
  }

  uploadUserImage=()=>{
    var phoneNumber = parsePhoneNumber(this.state.mobile_num)
    let user = JSON.parse(localStorage.getItem("userData"));
    
    const {t}=this.props
    toast.dismiss();
    toast(() => ToastContent(t("alerts.pleasewait")), {
      toastId: "infoToast",
      hideProgressBar: true,
      type: toast.TYPE.INFO,
      autoClose: 2000,
    });
    var bodyFormData = new FormData();
    bodyFormData.append("full_name", this.state.full_name);
    bodyFormData.append("email", this.state.email);
    bodyFormData.append("mobile_no", this.state.mobile_num);
    bodyFormData.append("phone_code", getCountryCallingCode(phoneNumber.country));
    bodyFormData.append("country_code",getCountryCallingCode(phoneNumber.country));
    bodyFormData.append("user_id",user.data.data.user_id);
    bodyFormData.append("image", this.state.image);
    axios
      .post(ApiRoute.editCustomerProfile,bodyFormData )
      .then((res) => {
        
        if (res.data.error !=0) {
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
              type: toast.TYPE.SUCCESS,
              autoClose: 2000,
            });
       window.location.reload();

        }
      })
      .catch((err) => {
        this.setState({ err: err });
        toast.dismiss();
          toast(() => ToastContent(t("alerts.unexpectederror")), {
            toastId: "infoToast",
            hideProgressBar: true,
            type: toast.TYPE.ERROR,
            autoClose: 2000,
          });
      });
  }
//handle Profil Image
HandlePicture_upload= async (picture) => {
  await this.setState({
   
    image: picture[0],
    disabled:false
    });
    await this.setState({
      image_view: URL.createObjectURL(picture[0]),
    });
  };
  render() {
    const { t } = this.props;
    const { userData } = this.state;
    const first_name = userData ? userData.data.data.first_name : "";
    const email = userData ? userData.data.data.email : "";
    const mobile = userData ? userData.data.data.mobile : "";

    return (
      <div id="wrapper" className="dashboardMargin">
        <a onClick={()=>this.toogleSideBar()} className="dashboard-responsive-nav-trigger"><i className="fa fa-reorder"></i> {t("dashboard.dasboardNavigation")}</a>

<SideBar  tooglesidebar={this.state.tooglesidebar}/>

        <div>
          <div className="dashboard-content">
            {/* <div id="titlebar">
              <div className="row">
                <div className="col-md-12">
                  <h2>{t("dashboard.myprofile")}</h2>
                </div>
              </div>
            </div> */}

            <div className="row">
              <div className="col-lg-6 col-md-12">
                <div className="dashboard-list-box margin-top-0">
                  <h4 className="gray">{t("dashboard.profiledetails")}</h4>
                  <div className="dashboard-list-box-static">
                    <div className="edit-profile-photo">
                      {this.state.image_view=="https://secure.sitfast.app/Salons/App/upload/"?<img  src="./images/userAvtar.webp" alt="" />:
                      <img src={this.state.image_view} alt="" />}
                      <div className="change-photo-btn" style={{backgroundColor:"transparent"}}>
                        
                          {/* <span>
                            <i className="fa fa-upload"></i>{" "}
                            {t("dashboard.uploadphoto")}
                          </span> */}
                          {/* <input
                            onChange={(e) =>
                              this.setState({
                                image: e.target.files[0],
                                disabled: false,
                              })
                            }
                            type="file"
                            className="upload"
                          /> */}
                           <ImageUploader
                      fileContainerStyle={{
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        height: "20px",
                        alignItems: "start",
                      }}
                      buttonClassName="upload "
                      buttonStyles={{
                        backgroundColor: "white",
                        color: "black",
                        borderRadius: "30px",
                        padding: ".8rem 1.4rem",
                      }}
                      singleImage={true}
                      withPreview={false}
                      withIcon={false}
                      withLabel={false}
                    
                      buttonText= {t("dashboard.uploadphoto")}
                      onChange={this.HandlePicture_upload}
                      imgExtension={[".jpg", ".jpeg", ".gif", ".png", ".gif"]}
                      maxFileSize={5242880}
                    />
                      </div>
                    </div>
                  
                    <button
                      disabled={this.state.disabled}
                      onClick={() => this.uploadUserImage()}
                      className="button margin-top-15"
                    >
                      {t("dashboard.savechanges")}
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-md-12">
                <div className="dashboard-list-box margin-top-0">
                  <h4 className="gray"> {t("dashboard.changepassword")}</h4>
                  <div className="dashboard-list-box-static">
                    <div className="my-profile">
                      <label className="margin-top-0">
                        {t("form.fullname")}
                      </label>
                      <input
                        className="input-text"
                        type="text"
                        name="full_name"
                        id="full_name"
                        defaultValue={first_name}
                        vlaue={this.state.full_name}
                        onChange={(e) =>
                          this.setState({ full_name: e.target.value })
                        }
                      />

                      <label>{t("form.email")}</label>
                      <input
                        className="input-text"
                        type="text"
                        name="email"
                        id="email"
                        defaultValue={email}
                        vlaue={this.state.email}
                        onChange={(e) =>
                          this.setState({ email: e.target.value })
                        }
                      />

                      <label>{t("form.mobilenumber")}</label>
                      {/* <input
                        className="input-text"
                        type="text"
                        name="mobile_num"
                        id="mobile_num"
                        defaultValue={mobile}
                        vlaue={this.state.mobile_num}
                        onChange={(e) =>
                          this.setState({ mobile_num: e.target.value })
                        }
                      /> */}
                        <PhoneInput
                          defaultCountry={parsePhoneNumber(this.state.defaultCountry).country}
                          className="input-text"
                          vlaue={this.state.mobile_num}
                          placeholder={this.state.mobile_num}
                          onChange={(value) => this.setState({ mobile_num: value })}
                          required
                        />
                      <label>{t("form.password")}</label>
                      <input
                        className="input-text"
                        type="password"
                        name="password"
                        id="password"
                        maxLength="4"
                        vlaue={this.state.password}
                        onChange={(e) =>
                          this.setState({ password: e.target.value })
                        }
                      />

                      <button
                        onClick={() => this.editProfile()}
                        className="button margin-top-15"
                      >
                        {t("dashboard.updateprofile")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="copyrights">{t("dashboard.copyright")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(Profile);
