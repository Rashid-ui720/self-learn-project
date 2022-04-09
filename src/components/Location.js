import React from "react";
import GoogleMapReact from "google-map-react";
import { withTranslation } from "react-i18next";
const AnyReactComponent = ({ text }) => <div>{text}</div>;
class Location extends React.PureComponent {

  renderMarkers(map, maps) {
 
    const { address, t } = this.props;
    let marker = new maps.Marker({
      position: {
        lat: parseFloat(address.area_lat),
        lng: parseFloat(address.area_long),
      },
      map,
      title: 'Location'
    });
  }
  //render method
  render() {
    const { address, t } = this.props;
    
    return (
      <div id="listing-location" className="listing-section">
        
        <h3 className="listing-desc-headline margin-top-60 margin-bottom-30">
          {t("detailpage.location")}
         
        </h3>
        <div style={{ height: "25rem", width: "100%", marginBottom: "2rem",display:"flex",flexDirection:"column" }}>
       
        <a  className="LocationExtenrnalLink"  target="__blank" href={`https://www.google.com/maps?daddr=${address.area_lat},${address.area_long}&amp;ll=`}><p>{address.area_address}</p> <i className="sl sl-icon-cursor"></i></a>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyCnJVk-xSuqetNgmZsmAHY983QxVGmM7WY",
            }}
            defaultCenter={{
              lat: parseFloat(address.area_lat),
              lng: parseFloat(address.area_long),
            }}
            defaultZoom={11}
            yesIWantToUseGoogleMapApiInternals={true}
           
            onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
          >
            {/* <AnyReactComponent
              lat={parseFloat(address.area_lat)}
              lng={parseFloat(address.area_long)}
              text={
                <i
                  className="fa fa-map-marker"
                  style={{ color: "#d41128", fontSize: "30px" }}
                ></i>
              }
            /> */}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default withTranslation()(Location);
