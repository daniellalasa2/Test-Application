import React from "react";
import "./AddNewRecord.scss";
import Header from "../Layout/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSortDown,
  faSortUp,
  faKey,
  faChalkboard,
  faArrowLeft,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";
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
            <div className="Feature-box">
              <div className="icon-wrapper">
                <FontAwesomeIcon icon={faChalkboard} size="2x" />
              </div>
              <div className="title-wrapper">
                <strong>Feature</strong>
                <p>anlegen</p>
              </div>
            </div>
            <div className="Rolle-box">
              <div className="icon-wrapper">
                <FontAwesomeIcon icon={faKey} size="2x" />
              </div>
              <div className="title-wrapper">
                <strong>Rolle</strong>
                <p>anlegen</p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
