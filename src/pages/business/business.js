import React from "react";


import BusinessBannerSlider from "../../components/BusinessBannerSider";



import SoftwareForBooking from "../../components/softwareForBooking"
import BusinessFeatures from "../../components/BusinessFeatures";
import TryForFree from "../../components/TryFroFree"
import { withTranslation } from "react-i18next";
class Business extends React.Component {
  state = {
  
    
  };

  
  //render method
  render() {
    const { t } = this.props;
  
    
    return (
      <React.Fragment>
       
        <BusinessBannerSlider />

      
          <SoftwareForBooking />
          <BusinessFeatures/>
          <TryForFree/>
     
       
        
       
        {/* <GetStarted1 /> */}
        {/* <Blog /> */}
      </React.Fragment>
    );
  }
}

export default withTranslation()(Business);
