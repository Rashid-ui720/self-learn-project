import React from "react";
import { Link } from "react-router-dom";
import { Local_routes } from "../util/routes";
export const ErrorComp = ({ errorDescription }) => {
  return (
    <div id="wrapper">
      {/* <!-- Container --> */}
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <section id="not-found" className="center">
              <p>
                <i
                  style={{ fontSize: "50px" }}
                  className="fa fa-exclamation-circle"
                ></i>
              </p>
              <br />
              <p>{errorDescription}</p>
              <br />
              <button
                onClick={() => window.location.reload()}
                className="button book-now  margin-top-5"
                style={{ paddingLeft: "3rem", paddingRight: "3rem" }}
              >
                Reload
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
