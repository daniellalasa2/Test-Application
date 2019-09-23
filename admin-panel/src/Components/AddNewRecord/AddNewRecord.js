import React from "react";
import "./AddNewRecord.scss";
import Header from "../Layout/Header";
export default class AddNewRecord extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header>
          <strong className="page-title">
            Neues Feature / neue Rolle anlegen
          </strong>
        </Header>
        <div className="addNewRecord-section">
          <div className="description-col">
            <section>
              <h1>Neues Feature / neue Rolle anlegen</h1>
              <h5>
                Um ein neues Feature bzw. eine neue Rolle anzulegen, wahlen Sie
                die entsprechende Schaltflache. Sie gelangen dann in den
                Edit-Bereich.
              </h5>
            </section>
          </div>
          <div className="addNewRecord-col">
            <div className="Feature-box"></div>
            <div className="Rolle-box"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
