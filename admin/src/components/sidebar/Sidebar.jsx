import React from "react";
import "./sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltSharpIcon from "@mui/icons-material/PeopleAltSharp";
import StorefrontSharpIcon from "@mui/icons-material/StorefrontSharp";
import ShoppingBagSharpIcon from "@mui/icons-material/ShoppingBagSharp";
import AnnouncementIcon from '@mui/icons-material/Announcement'
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import NotificationsSharpIcon from "@mui/icons-material/NotificationsSharp";
import SettingsSuggestSharpIcon from "@mui/icons-material/SettingsSuggestSharp";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Shopping Guide | Admin</span>
        </Link>
      </div>
      <div className="center">
        <ul>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li className="active">
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">Application Stats</p>
          <Link to="/customers" style={{ textDecoration: "none" }}>
            <li>
              <PeopleAltSharpIcon className="icon" />
              <span>Customers</span>
            </li>
          </Link>
          <Link to="/sellers" style={{ textDecoration: "none" }}>
            <li>
              <StorefrontSharpIcon className="icon" />
              <span>Sellers</span>
            </li>
          </Link>
          <Link to="/orders" style={{ textDecoration: "none" }}>
            <li>
              <ShoppingBagSharpIcon className="icon" />
              <span>Orders</span>
            </li>
          </Link>
          <Link to="/complain" style={{ textDecoration: "none" }}>
            <li>
              <AnnouncementIcon className="icon" />
              <span>Complains</span>
            </li>
          </Link>
          <p className="title">Admin Profile</p>
          <li
            onClick={() => {
              navigate("/profile", {
                state: {
                  name: "Admin",
                  email: "admin12@gmail.com",
                  phone: "0334-0058007",
                  image: "https://png.pngtree.com/element_origin_min_pic/16/07/23/22579385076b15c.jpg"
                },
              });
            }}
          >
            <AccountCircleSharpIcon className="icon" />
            <span>Profile</span>
          </li>
          <Link to="/logout">
            <li>
              <LogoutRoundedIcon className="icon" />
              <span>Logout</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
