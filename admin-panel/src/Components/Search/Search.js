import React from "react";
import "./Search.scss";
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
import { Table } from "reactstrap";
import { GetSearchResult, SafeValue } from "../ApiHandler/ApiHandler";
import Spinner from "../Tools/Spinner/Spinner";
import classnames from "classnames";
import UpdateParams from "../Tools/UpdateParams/UpdateParams";
export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalEntries: 0,
      sort: "asc",
      tableInfoData: [],
      isUserTyping: false,
      pageSize: 8,
      pagination: {
        current_page: 1,
        next_page: null,
        prev_page: null,
        total_entries: 0,
        total_pages: 1
      }
    };
    this.searchInput = React.createRef();
  }
  //if you send a value to this function as second argument this operation called force search

  doSearch = (searchElement, params = {}) => {
    const { pageSize } = this.state;
    //checking force search
    if (searchElement !== null) {
      //operation goes here only when user starts typing
      params.search = searchElement.target.value;
      this.setState({ isUserTyping: true });
    }
    if (params.search !== undefined) {
      params = { search: params.search };
    } else {
      const searchValue = SafeValue(
        this.urlParser(window.location.search),
        "search",
        "string",
        ""
      );
      params = {
        search: searchValue,
        ...params
      };
    }
    GetSearchResult({ ...params, "page[size]": pageSize }, item => {
      if (item.success_result.success) {
        this.setState(
          {
            tableInfoData: SafeValue(item, "data.included", "object", []),
            searchedValue: params.search,
            isUserTyping: false,
            pagination: SafeValue(item, "data.meta", "object", {})
          },
          () => this.updateUrl(params)
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
    const { total_pages, current_page, total_entries } = this.state.pagination;
    const generatedItems = [];
    if (total_entries > 0) {
      for (let i = 1; i <= total_pages; i++) {
        generatedItems.push(
          <span
            key={i}
            className="pageButton"
            onClick={() => current_page !== i && this.doPagination(null, i)}
          >
            <button className={classnames(current_page === i && "active")}>
              {i}
            </button>
          </span>
        );
      }
    }
    return generatedItems;
  };

  updateUrl = params => {
    const newSearch = UpdateParams(params, window.location.search);
    this.props.history.push(newSearch);
  };
  doSort = type => {
    let { sort } = this.state;
    //reversing sort direction
    switch (sort) {
      case "asc":
        sort = "desc";
        break;
      case "desc":
        sort = "asc";
        break;
      default:
        break;
    }

    this.setState({ sort: sort }, () => {
      this.doSearch(null, { sort_direction: sort, sort_type: type });
    });
  };
  doPagination = (type, page) => {
    let {
      current_page,
      next_page,
      prev_page,
      total_pages
    } = this.state.pagination;
    let pagination;
    switch (type) {
      case "next":
        pagination = next_page;
        break;
      case "prev":
        pagination = prev_page;
        break;
      default:
        pagination = page;
    }
    this.doSearch(null, {
      "page[number]": pagination
    });
  };
  urlParser = url => {
    const params = new URLSearchParams(url);
    const paramsObj = {};
    for (const [key, value] of params.entries()) {
      paramsObj[key] = value;
    }
    return paramsObj;
  };

  componentDidMount() {
    this.doSearch(null, this.urlParser(window.location.search));
  }

  render() {
    const { isUserTyping, pagination, searchedValue, sort } = this.state;
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
                onClick={() => this.doSearch(null, { search: searchedValue })}
              >
                {isUserTyping ? <Spinner /> : "SUCHEN"}
              </button>
            </span>
          </div>
          <div className="addNewRecord-box">
            <a
              className="addNewRecord"
              onClick={() => this.props.history.push("/addnewrecord")}
            >
              +
            </a>
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
                    <th onClick={() => this.doSort("label")} className="sort">
                      Name{" "}
                      {sort === "asc" ? (
                        <FontAwesomeIcon icon={faSortDown} size="1x" />
                      ) : (
                        <FontAwesomeIcon icon={faSortUp} size="1x" />
                      )}
                    </th>
                  </tr>
                </thead>
                <tbody>{this.generateTableInfo()}</tbody>
              </Table>
              <div className="tablePagination-section">
                <span
                  onClick={() => this.doPagination("prev")}
                  className={classnames(
                    "prev",
                    "navigation",
                    pagination.prev_page === null && "deactive"
                  )}
                >
                  <FontAwesomeIcon icon={faArrowLeft} size="1x" pull="left" />
                  Vorherige
                </span>
                <div className="pageButton-wrapper">
                  {this.generatePaginationItems()}
                </div>
                <span
                  onClick={() => this.doPagination("next")}
                  className={classnames(
                    "prev",
                    "navigation",
                    pagination.next_page === null && "deactive"
                  )}
                >
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
