import React from "react";
import { withTranslation } from "react-i18next";
class OverView extends React.Component {
  //render method
  render() {
    const { serviceProviderDetails, t } = this.props;
    return (
      <div id="listing-overview" className="listing-section">
        <h3 className="listing-desc-headline  margin-bottom-30">
          {t("detailpage.about")}
        </h3>
        {/* <!-- Description --> */}
        <p>
          {serviceProviderDetails.about == ""
            ? "No information available about this service provider"
            : serviceProviderDetails.about}
        </p>

        {/* <!-- Listing Contacts --> */}
      </div>
    );
  }
}

export default withTranslation()(OverView);
