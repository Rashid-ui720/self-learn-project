import React from "react";
import { withTranslation } from "react-i18next";
let concatString = '';
let joinstrng = ',';
class BookingSummary extends React.Component {
  render() {
    const {
      service_duration,
      selectedSlot,
      date,
      service_price,
      depositAmount,
      sitfastFee,
      service_subcategory,
      provider_pre_booking_type,
      t,
      selectedService
    } = this.props;

    return (
      <React.Fragment>
        <div className="col-lg-6 col-md-6  margin-bottom-60">
          <div
            className="boxed-widget opening-hours summary margin-top-0"
            style={{ zIndex: 1 }}
          >
            <h3>
              <i className="fa fa-briefcase"></i>{" "}
              {t("detailpage.services")}
            </h3>
            <ul>
              {selectedService.map((service) => {
                return(
                  <li>
                    {service.sub_category}
                  <span>
                    ${service.price} / {service.duration} mins
                  </span>
                  </li>
                )
              })}
            </ul>
          </div>
          <br/>
          <div
            className="boxed-widget opening-hours summary margin-top-0"
            style={{ zIndex: 1 }}
          >
            <h3>
              <i className="fa fa-calendar-check-o"></i>{" "}
              {t("servicebookingpage.bookingsummary")}
            </h3>
            <ul>
              <li>
                {t("servicebookingpage.date")} <span>{date}</span>
              </li>
              <li>
                {t("servicebookingpage.time")}
                <span>{selectedSlot !== null ? selectedSlot : "00:00"}</span>
              </li>
              <li>
                {t("servicebookingpage.durtion")}{" "}
                <span>{service_duration}:00 Min</span>
              </li>
              <li>
                {t("servicebookingpage.servicedeposit")}{" "}
                <span>$ {depositAmount.toFixed(2)}</span>
              </li>
              <li>
                {t("servicebookingpage.sitfastfee")}{" "}
                <span>$ {sitfastFee.toFixed(2)}</span>
              </li>

              <li className="total-costs">
                {t("servicebookingpage.total")}
                <span>
                  $
                  <span id="totalAmount">
                    {(depositAmount + sitfastFee).toFixed(2)}
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withTranslation()(BookingSummary);
