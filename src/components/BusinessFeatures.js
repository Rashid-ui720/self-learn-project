import React from "react";
import { withTranslation } from "react-i18next";

class BusinessFeatures extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <div  className="fullwidth padding-top-75 padding-bottom-70" style={{backgroundColor:"white"}}>

          <div className="container">
              {/* one row */}
              <div className="row ">
                  {/* card */}
              <div className="col-lg-6 feature-card feature-card-Container-border-right">
                 <div className="">
                     <div className="col-12 feature-card-icon"> <div className="div-block-107"><i className="im im-icon-Calendar-4"></i></div></div>
                     <div className="col-12 feature-card-heading"><h4>{t("business.calendar")}</h4></div>
                     <div className="col-12 feature-card-heading"><p>{t("business.calendardesc")}</p></div>

                 </div>
              </div>

              {/* card */}
              <div className="col-lg-6 feature-card ">
                 <div className="">
                     <div className="col-12 feature-card-icon"> <div className="div-block-107"><i className="im im-icon-Business-Mens"></i></div></div>
                     <div className="col-12 feature-card-heading"><h4>{t("business.customertracking")}</h4></div>
                     <div className="col-12 feature-card-heading"><p>{t("business.custoemrtrackingdesc")}</p></div>

                 </div>
              </div>

              </div>


              {/* one row */}
              <div className="row ">
                  {/* card */}
              <div className="col-lg-6 feature-card feature-card-Container-border-right">
                 <div className="">
                     <div className="col-12 feature-card-icon"> <div className="div-block-107"><i className="im im-icon-Speach-Bubbles"></i></div></div>
                     <div className="col-12 feature-card-heading"><h4>{t("business.notifications")}</h4></div>
                     <div className="col-12 feature-card-heading"><p>{t("business.notificationdesc")}</p></div>

                 </div>
              </div>

              {/* card */}
              {/* <div className="col-lg-6 feature-card ">
                 <div className="">
                     <div className="col-12 feature-card-icon"> <div className="div-block-107"><i className="im im-icon-Address-Book2"></i></div></div>
                     <div className="col-12 feature-card-heading"><h4>{t("business.forms")}</h4></div>
                     <div className="col-12 feature-card-heading"><p>{t("business.formsdesc")}</p></div>
                 </div>
              </div> */}
              {/* card */}
              <div className="col-lg-6 feature-card ">
                 <div className="">
                     <div className="col-12 feature-card-icon"> <div className="div-block-107"><i className="im im-icon-Bar-Chart4"></i></div></div>
                     <div className="col-12 feature-card-heading"><h4>{t("business.reports")}</h4></div>
                     <div className="col-12 feature-card-heading"><p>{t("business.reportsdesc")}</p></div>

                 </div>
              </div>

              </div>


{/* one row */}
<div className="row ">
                  {/* card */}
              {/* <div className="col-lg-6 feature-card feature-card-Container-border-right">
                 <div className="">
                     <div className="col-12 feature-card-icon"> <div className="div-block-107"><i className="im im-icon-Email"></i></div></div>
                     <div className="col-12 feature-card-heading"><h4>{t("business.emailmarketing")}</h4></div>
                     <div className="col-12 feature-card-heading"><p>{t("business.emailmarketingdesc")}</p></div>
                 </div>
              </div> */}
               <div className="col-lg-6 feature-card feature-card-Container-border-right">
                 <div className="">
                     <div className="col-12 feature-card-icon"> <div className="div-block-107"><i className="im im-icon-Smartphone-2"></i></div></div>
                     <div className="col-12 feature-card-heading"><h4>{t("business.mobileapp")}</h4></div>
                     <div className="col-12 feature-card-heading"><p>{t("business.mobileappdesc")}</p></div>

                 </div>
              </div>

              {/* card */}
              <div className="col-lg-6 feature-card ">
                 <div className="">
                     <div className="col-12 feature-card-icon"> <div className="div-block-107"><i className="im im-icon-Bookmark"></i></div></div>
                     <div className="col-12 feature-card-heading"><h4>{t("business.onlinebooking")}</h4></div>
                     <div className="col-12 feature-card-heading"><p>{t("business.onlinebookingdesc")}</p></div>

                 </div>
              </div>

              </div>


{/* one row */}
<div className="row ">
                  {/* card */}
              {/* <div className="col-lg-6 feature-card feature-card-Container-border-right">
                 <div className="">
                     <div className="col-12 feature-card-icon"> <div className="div-block-107"><i className="im im-icon-Block-Window"></i></div></div>
                     <div className="col-12 feature-card-heading"><h4>{t("business.websitebuilder")}</h4></div>
                     <div className="col-12 feature-card-heading"><p>{t("business.websitebuilderdesc")}</p></div>
                 </div>
              </div> */}

              

              </div>
{/* one row */}
<div className="row ">
                  {/* card */}
             

              {/* card */}
              {/* <div className="col-lg-6 feature-card ">
                 <div className="">
                     <div className="col-12 feature-card-icon"> <div className="div-block-107"><i className="im im-icon-Money"></i></div></div>
                     <div className="col-12 feature-card-heading"><h4>{t("business.creditcard")}</h4></div>
                     <div className="col-12 feature-card-heading"><p>{t("business.creditdesc")}</p></div>
                 </div>
              </div> */}

              </div>




          </div>
       
      </div>
    );
  }
}

export default withTranslation()(BusinessFeatures);