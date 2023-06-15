import React from "react";
import "./App.css";
import SideBar from "./components/SideBar";
import UserTable from "./components/UserTable";

export default function UserManagementApp() {
  return (
    <>
      <UserTable />
      <SideBar />
    </>
  );
}
