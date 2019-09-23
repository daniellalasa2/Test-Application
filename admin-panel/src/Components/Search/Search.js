import React from "react";
import "./Search.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { Table } from "reactstrap";
import { GetSearchResult, SafeValue } from "../ApiHandler/ApiHandler";
import Spinner from "../Tools/Spinner/Spinner";
import classnames from "classnames";
export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalEntries: 0,
      sort: "asc",
      doesUserSearching: false,
      pagination: {
        curr: "",
        total: ""
      }
    };
  }
  doSearch = e => {
    var value = e.target.value;
    this.setState({ doesUserSearching: true });
    GetSearchResult({ search: value }, item => {
      console.log(item);
      if (item.success_result.success) {
        this.setState(
          {
            doesUserSearching: false,
            totalEntries: SafeValue(
              item,
              "data.meta.total_entries",
              "number",
              0
            )
          },
          () => console.log(this.state)
        );
      }
    });
  };
  doSort = () => {
    GetSearchResult({}, item => {
      if (item.success_result.success) {
        console.log(item);
        this.setState(
          {
            totalEntries: SafeValue(
              item,
              "data.meta.total_entries",
              "number",
              0
            )
          },
          () => console.log(this.state)
        );
      }
    });
  };
  doPaginate = type => {
    let pagination_type = false;
    switch (type) {
      case "next":
        break;
      case "prev":
        break;
        break;
      default:
    }
    if (!type) {
      GetSearchResult({}, item => {
        console.log(item);
        if (item.success_result.success) {
          this.setState(
            {
              totalEntries: SafeValue(
                item,
                "data.meta.total_entries",
                "number",
                0
              )
            },
            () => console.log(this.state)
          );
        }
      });
    }
  };
  componentDidMount() {
    // this.doSearch();
  }

  render() {
    const { totalEntries, doesUserSearching } = this.state;
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
            <input
              type="text"
              className="searchField"
              onChange={this.doSearch}
            />
            <span
              className={classnames(
                "searchButton-wrapper",
                !doesUserSearching && "active"
              )}
            >
              <button disabled={doesUserSearching} onClick={this.doSearch}>
                {doesUserSearching ? <Spinner /> : "SUCHEN"}
              </button>
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
            <span className="resultCount">
              {totalEntries} Ergebnisse gefunden
            </span>
            <Table>
              <thead>
                <tr>
                  <th>Art</th>
                  <th>
                    Name{" "}
                    <FontAwesomeIcon
                      icon={faSortDown}
                      size="1x"
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
