import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import amazonLogo from "../../assets/amazon-logo.png";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useStateValue } from "../../utils/StateProvider";
import { auth } from "../../utils/firebase";
import ReorderIcon from "@material-ui/icons/Reorder";

const Header = () => {
  const [{ basket, user }] = useStateValue();
  const handleAuth = () => {
    if (user) {
      auth.signOut();
    }
  };
  return (
    <>
      <div className="header__primary">
        <Link to="/">
          <img className="header__logo" src={amazonLogo} alt="amazon-logo" />
        </Link>
        <div className="header__search">
          <input className="header__searchInput" type="text" />
          <SearchIcon className="header__searchIcon" />
        </div>

        <div className="header__nav">
          <Link to="/login">
            <div onClick={handleAuth} className="header__option">
              {/* Dynamic Username */}

              {user ? (
                <>
                  <span className="header__optionLineOne">
                    Hello, {user?.email}
                  </span>
                  <span className="header__optionLineTwo">Sign Out</span>
                </>
              ) : (
                <>
                  <span className="header__optionLineOne">Hello, Sign in</span>
                  <span className="header__optionLineTwo">
                    Account and Lists
                  </span>
                </>
              )}
            </div>
          </Link>

          <Link to="/orders">
            <div className="header__option">
              <span className="header__optionLineOne">Returns</span>
              <span className="header__optionLineTwo">& Orders</span>
            </div>
          </Link>
          <div className="header__option">
            <span className="header__optionLineOne">Your</span>
            <span className="header__optionLineTwo">Prime</span>
          </div>
          <Link to="/checkout">
            <div className="header__optionCart">
              <ShoppingCartIcon className="header__CartIcon" />

              {/* Dynamic Value */}
              <span className="header__optionLineTwo header__CartCount">
                {basket?.length}
              </span>
            </div>
          </Link>
        </div>
      </div>
      <div className="header__secondary">
        <div className="header__secondaryLeftMain">
          <div className="header__secondaryLeft">
            <ReorderIcon className="icon" />
            All
          </div>
          <div className="header__secondaryLeft">Today's Deals</div>
          <div className="header__secondaryLeft">Customer Service</div>
          <div className="header__secondaryLeft">Gift Cards</div>
          <div className="header__secondaryLeft">Registry</div>
          <div className="header__secondaryLeft">Sell</div>
        </div>
        <div className="header__secondaryRight">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://blog.aboutamazon.com/company-news/amazons-actions-to-help-employees-communities-and-customers-affected-by-covid-19/?_encoding=UTF8&token=GW&utm_content=COVID-19_roundup&utm_medium=swm&utm_source=gateway&utm_term=gw03162020&ref_=nav_swm_undefined&pf_rd_p=cf6260e5-93a9-45ad-9653-d1fc95751fac&pf_rd_s=nav-sitewide-msg-text-export&pf_rd_t=4201&pf_rd_i=navbar-4201&pf_rd_m=ATVPDKIKX0DER&pf_rd_r=SSKBS0A7CBZ65SCE9PX4"
          >
            Amazon Clone's response to COVID-19
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
