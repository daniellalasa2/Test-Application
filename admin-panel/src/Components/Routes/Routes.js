import React from "react";

const Search = React.lazy(() => import("../Search/Search"));
const AddNewRecord = React.lazy(() => import("../AddNewRecord/AddNewRecord"));
const Routes = [
  { path: "/", exact: true, name: "Home", component: null },
  {
    path: "/listing",
    name: "Listing",
    component: Search
  },
  {
    path: "/addnewrecord",
    name: "Add New Record",
    component: AddNewRecord
  }
];

export default Routes;
