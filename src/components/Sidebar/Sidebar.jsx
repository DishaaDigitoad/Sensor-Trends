import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./HoverCard";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleSensorClick = () => {
    navigate("/sensor");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const sidebarItems = [
    {
      text: "Sensor Data Overview",
      route: "/sensor-overview",
      description: "View all the available sensors and their value",
    },
    {
      text: "Data Trends",
      route: "/data-trends",
      description: "Graphs and charts",
    },
    {
      text: "Share",
      route: "/share",
      description: "Share the sensor data with others",
    },
  ];

  return (
    <div className="main-container">
      <div
        className={`sidebar-toggle ${isOpen ? "slanted" : ""}`}
        onClick={toggleSidebar}
      >
        <i className="fas fa-bars"></i>
      </div>
      <nav ref={sidebarRef} className={`sidebar ${isOpen ? "open" : "hidden"}`}>
        {sidebarItems.map((item, index) => (
          <div key={index} className="sidebar-item">
            <HoverCard>
              <HoverCardTrigger>
                <NavLink
                  to={item.route}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {item.text}
                </NavLink>
              </HoverCardTrigger>
              <HoverCardContent
                position="full-right"
                backgroundColor="#ECF4E5"
                textColor="black"
              >
                {item.description}
              </HoverCardContent>
            </HoverCard>
          </div>
        ))}
        <div className="sidebar-item" onClick={handleSensorClick}>
          <NavLink
            to="/sensor"
            className={({ isActive }) => (isActive ? "active" : "")}
          ></NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
