import React, { Suspense } from "react";
import "./Header.scss";
export default class Header extends React.Component {
  render() {
    return <div className="searchBar-section">{this.props.children}</div>;
  }
}
