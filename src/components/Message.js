import React from "react";

export const Message = ({ MessageDescription }) => {
  return (
    <div id="wrapper">
      {/* <!-- Container --> */}
      <div className="container col-md-10">
        <div className="row" >
          <div className="col-md-12" >
            <section id="not-found" className="center">
              <p>
                <i
                  style={{ fontSize: "50px" }}
                  className="fa fa-exclamation-circle"
                ></i>
              </p>
              <br />
              <p>{MessageDescription}</p>
              <br />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
