import React from "react";
import "./Search.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSortDown,
  faKey,
  faChalkboard,
  faArrowLeft,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";
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
      tableInfoData: [],
      isUserTyping: false,
      pagination: {
        current_page: 1,
        next_page: null,
        prev_page: null,
        total_entries: 0,
        total_pages: 1
      },
      searchedValue: ""
    };
    this.searchInput = React.createRef();
  }
  //if you send a value to this function as second argument this operation called force search
  doSearch = (searchElement, forcedValue) => {
    let searchValue = "";
    //checking force search
    if (forcedValue === undefined) {
      //operation goes here only when user starts typing
      searchValue = searchElement.target.value;
      this.setState({ isUserTyping: true });
    } else {
      searchValue = forcedValue;
    }
    searchValue = searchValue.toString();
    GetSearchResult({ search: searchValue }, item => {
      if (item.success_result.success) {
        this.setState(
          {
            tableInfoData: SafeValue(item, "data.included", "object", []),
            searchedValue: searchValue,
            isUserTyping: false,
            pagination: SafeValue(item, "data.meta", "object", {})
          },
          () => console.log("state:", this.state)
        );
      }
    });
  };
  generateTableInfo = () => {
    const { tableInfoData } = this.state;
    const rows = [];
    let name, art;
    if (tableInfoData.length > 0) {
      tableInfoData.forEach((info, idx) => {
        name = SafeValue(info, "attributes.label", "string", "No Specified");
        //if data of art was not reliable and true then return a default icon
        art = SafeValue(
          info,
          "type",
          "string",
          <FontAwesomeIcon icon={faSortDown} size="1x" color="whitesmoke" />
        );
        rows.push(
          <tr key={idx}>
            <td>
              {art === "authorization_roles" ? (
                <FontAwesomeIcon icon={faKey} size="lg" color="grey" />
              ) : (
                <FontAwesomeIcon icon={faChalkboard} size="lg" color="grey" />
              )}
            </td>
            <td>{name}</td>
          </tr>
        );
      });
    } else {
      rows.push(
        <tr key={0}>
          <td style={{ border: "none" }}>&nbsp;</td>
          <td>
            <span style={{ marginLeft: "39%" }}>Kein Ergebnis</span>
          </td>
        </tr>
      );
    }
    return rows;
  };
  generatePaginationItems = () => {
    const { total_pages } = this.state.pagination;
    const generatedItems = [];
    for (let i = 1; i <= total_pages; i++) {
      generatedItems.push(<span className="pageButton">{i}</span>);
    }
    return generatedItems;
  };
  handleUrl = () => {};
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
    this.doSearch(null, "");
  }

  render() {
    const { isUserTyping, pagination, searchedValue } = this.state;
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
              ref={this.searchInput}
            />
            <span
              className={classnames(
                "searchButton-wrapper",
                !isUserTyping && "active"
              )}
            >
              <button
                disabled={isUserTyping}
                onClick={() => this.doSearch(null, searchedValue)}
              >
                {isUserTyping ? <Spinner /> : "SUCHEN"}
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
          <div className="contentBody-section">
            <div className="dataInfoTable-section">
              <span className="resultCount">
                {pagination.total_entries} Ergebnisse gefunden
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
                <tbody>{this.generateTableInfo()}</tbody>
              </Table>
              <div className="tablePagination-section">
                <span className="prev navigation">
                  <FontAwesomeIcon icon={faArrowLeft} size="1x" pull="left" />
                  Vorherige
                </span>
                <div clasName="pagesButton-wrapper">
                  {this.generatePaginationItems()}
                </div>
                <span className="next navigation">
                  <FontAwesomeIcon icon={faArrowRight} size="1x" pull="right" />
                  Nächste
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
