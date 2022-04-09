import React from "react";
import { Link } from "react-router-dom";
import { Local_routes } from "../util/routes";
class Four_o_FourPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div id="wrapper">
        <div id="titlebar">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2>404 Not Found</h2>

                {/* <!-- Breadcrumbs --> */}
                <nav id="breadcrumbs">
                  <ul>
                    <li>
                      <Link to={Local_routes.home}>Home</Link>
                    </li>
                    <li>404 Not Found</li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {/* 

<!-- Content
================================================== --> */}

        {/* <!-- Container --> */}
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <section id="not-found" className="center">
                <h2>
                  404 <i className="fa fa-question-circle"></i>
                </h2>
                <p>
                  We're sorry, but the page you were looking for doesn't exist.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Four_o_FourPage;
