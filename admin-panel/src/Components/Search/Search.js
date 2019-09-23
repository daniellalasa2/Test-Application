import React from "react";
import "./Search.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { Table } from "reactstrap";
export default class Search extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Search">
        {/* Search Section Elements */}
        <div className="searchBar-section">
          <div className="logoTitle-box">
            <strong className="logoTitle">Admin Tool</strong>
          </div>
          <div className="searchField-box">
            <span className="searchIcon-wrapper">
              <FontAwesomeIcon
                icon={faSearch}
                pull="left"
                size="lg"
                color="whitesmoke"
              />
            </span>
            <input type="text" className="searchField" />
            <span className="searchButton-wrapper">
              <button onClick={null}>SUCHEN</button>
            </span>
          </div>
          <div className="addNewRecord-box">
            <a className="addNewRecord">+</a>
          </div>
        </div>

        {/* Body Section */}
        <div className="searchBody-section">
          <div className="menu-section">menu section</div>
          <div className="dataInfoTable-section">
            <span className="resultCount">9 Ergebnisse gefunden</span>
            <Table>
              <thead>
                <tr>
                  <th>Art</th>
                  <th>
                    Name{" "}
                    <FontAwesomeIcon
                      icon={faSortDown}
                      size="md"
                      color="whitesmoke"
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>icon </td>
                  <td>title</td>
                </tr>
                <tr>
                  <td>icon </td>
                  <td>title</td>
                </tr>
                <tr>
                  <td>icon </td>
                  <td>title</td>
                </tr>
                <tr>
                  <td>icon </td>
                  <td>title</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}
