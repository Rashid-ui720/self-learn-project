import React from "react";
import { withTranslation } from "react-i18next";
import { Local_routes } from "../util/routes";

class TryForFree extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <div  className="fullwidth padding-top-75 padding-bottom-70 tryforfree" >

          <h1>{t("business.tryforfree")}</h1>

          <button onClick={()=>window.open(Local_routes.businessSignup,'_blank')} >{t("business.tryfreebtn")}</button>
       
      </div>
    );
  }
}

export default withTranslation()(TryForFree);
