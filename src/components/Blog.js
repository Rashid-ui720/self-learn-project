import React from "react";
import { withTranslation } from "react-i18next";
class Blog extends React.Component {
  state = {};
  render() {
    const { t } = this.props;
    return (
      <section
        className="fullwidth margin-top-0 padding-top-75 padding-bottom-75"
        data-background-color="#fff"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3 className="headline centered margin-bottom-55">
                <strong className="headline-with-separator">
                  {t("homepage.blogtitle")}
                </strong>
              </h3>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <a className="blog-compact-item-container">
                <div className="blog-compact-item">
                  <img src="images/blog-compact-post-01.jpg" alt="" />
                  <span className="blog-item-tag">{t("homepage.blogtip")}</span>
                  <div className="blog-compact-item-content">
                    <ul className="blog-post-tags">
                      <li>22 August 2019</li>
                    </ul>
                    <h3>{t("homepage.blogposttitle")}</h3>
                    <p>{t("homepage.blogdesc")}</p>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-4">
              <a className="blog-compact-item-container">
                <div className="blog-compact-item">
                  <img src="images/blog-compact-post-01.jpg" alt="" />
                  <span className="blog-item-tag">{t("homepage.blogtip")}</span>
                  <div className="blog-compact-item-content">
                    <ul className="blog-post-tags">
                      <li>22 August 2019</li>
                    </ul>
                    <h3>{t("homepage.blogposttitle")}</h3>
                    <p>{t("homepage.blogdesc")}</p>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-4">
              <a className="blog-compact-item-container">
                <div className="blog-compact-item">
                  <img src="images/blog-compact-post-01.jpg" alt="" />
                  <span className="blog-item-tag">{t("homepage.blogtip")}</span>
                  <div className="blog-compact-item-content">
                    <ul className="blog-post-tags">
                      <li>22 August 2019</li>
                    </ul>
                    <h3>{t("homepage.blogposttitle")}</h3>
                    <p>{t("homepage.blogdesc")}</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withTranslation()(Blog);
