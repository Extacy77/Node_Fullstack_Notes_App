import React from "react";

const Header = ({ handleTogglerSwitch }) => {
  return (
    <div className="app-header">
      <h1>Quick Notes</h1>
      <label className="switch">
        <input
          type="checkbox"
          onClick={() =>
            handleTogglerSwitch((previousDarkMode) => !previousDarkMode)
          }
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default Header;
