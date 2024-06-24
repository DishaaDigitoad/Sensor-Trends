import React from "react";
import "./HoverCard.css";

export const HoverCard = ({ children }) => (
  <div className="hover-card">{children}</div>
);

export const HoverCardTrigger = ({ children }) => (
  <div className="hover-card-trigger">{children}</div>
);

export const HoverCardContent = ({
  children,
  position,
  backgroundColor,
  textColor,
}) => (
  <div
    className={`hover-card-content ${position}`}
    style={{ backgroundColor, color: textColor }}
  >
    {children}
  </div>
);
