import React from "react";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { withTranslation } from "react-i18next";
import ImageSlides from "react-imageslides";

class Gallary extends React.Component {
  state = {
    Images: [],
    imageView: false,
    imageIndex: 0,
    CurrentImage:[]
  };
  componentDidMount() {
    const {
      workimage_url,
      certificate_url,
      user_Performed,
      user_certificate,
    } = this.props;
    var GalryImages = [];
    //create comlete images url of work
    user_Performed.map((Image) => {
      let CompleteImageUrl = workimage_url + Image.image;
      GalryImages.push(CompleteImageUrl);
    });
    //create certificate images url
    user_certificate.map((certificate) => {
      let CompleteCertificateImageUrl = certificate_url + certificate.image;
      GalryImages.push(CompleteCertificateImageUrl);
    });

    this.setState({ Images: GalryImages });
  }
  //toogle Image view
  handleimageview =async  (index,image) => {
  
    await this.setState({ imageView: true,imageIndex:index+1});
   
  };
  //close image view
  handleClose = () => {
    
    this.setState({ imageView: false, imageIndex: null,CurrentImage:[] });
  };
  //render method
  render() {
    const { Images } = this.state;
    const { t } = this.props;
    return (
      <div id="listing-gallery" className="listing-section">
        <h3 className="listing-desc-headline margin-top-70">
          {t("detailpage.gallery")}
        </h3>

        <div className="listing-slider-small mfp-gallery-container margin-bottom-0" >
          {Images.length > 0 ? (
            <>
              <ImageSlides
                images={this.state.Images}
                isOpen={this.state.imageView}
                index={this.state.imageIndex}
                onClose={()=> this.handleClose()}
                noTapClose={true}
               
                showPageButton={true}
                addon={() => {
                  return (
                    <div style={{ width: "100%" }} >
                      <button
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          alignItems: "center",
                          justifyContent: "center",
                          display: "flex",
                          fontSize: "30px",
                          fontWeight: "700",
                          color: "white",
                          borderRadius: "0px",
                          zIndex: 1000,
                          backgroundColor: "#141414",
                        }}
                        onClick={() => this.handleClose()}
                      >
                        X
                      </button>
                    </div>
                  );
                }}
              />
              <OwlCarousel
                items={4}
                className="owl-theme"
                
               
                dots={false}
                margin={0}
                responsive={{
                  0: {
                    items: 1,
                  },
                  600: {
                    items: 2,
                  },
                  1000: {
                    items: 4,
                  },
                }}
              >
                {/* Free lancer cards */}
                {Images.map((Image, index) => {
                  return (
                    <img
                      src={Image}
                      key={index}
                      className="item mfp-gallery"
                      style={{ objectFit: "cover" }}
                      onClick={() => this.handleimageview(index,Image)}
                    />
                  );
                })}
              </OwlCarousel>
            </>
          ) : <p>{this.props.noimage}</p>}
        </div>
      </div>
    );
  }
}

export default withTranslation()(Gallary);
