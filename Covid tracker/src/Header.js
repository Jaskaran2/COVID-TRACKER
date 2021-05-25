import React from "react";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <img
        className="header__logo"
        src="https://i.etsystatic.com/16452967/c/2000/1589/0/239/il/b18081/2816876738/il_340x270.2816876738_jzky.jpg"
        alt="Logo"
      ></img>
      <div className="header__nav">
        <div className="header__option">
          <span className="header__optionLineOne">
            <a href="#top"> Top </a>
          </span>
        </div>
        <div className="header__option">
          <span className="header__optionLineOne">
            <a href="#table"> Table </a>
          </span>
        </div>
        <div className="header__option">
          <span className="header__optionLineOne">
            <a href="#graphs"> Graphs </a>
          </span>
        </div>
        <div className="header__option">
          <span className="header__optionLineOne">
            <a href="#map"> Map </a>
          </span>
        </div>
        <div className="header__option">
          <span className="header__optionLineOne">
            <a href="#resources"> Resources </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
