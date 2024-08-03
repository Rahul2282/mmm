import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

//LOGO
import LogoMark from "../images/skewb-logomark.png";
import LavenderLogo from "../images/skewb-logomark-c1.png";
import SapphireLogo from "../images/skewb-logomark-c3.png";
import TealLogo from "../images/skewb-logomark-c5.png";
import CyanLogo from "../images/skewb-logomark-c7.png";
import GoldenrodLogo from "../images/skewb-logomark-b4.png";

//MENU
import MenuIcon from "../images/Vector.png";
import LavenderMenu from "../images/Vector-c1.png";
import SapphireMenu from "../images/Vector-c3.png";
import TealMenu from "../images/Vector-c5.png";
import CyanMenu from "../images/Vector-c7.png";
import GoldenrodMenu from "../images/Vector-b4.png";

import DetailsPopUp from "./DetailsPopUp";
import { Box } from "@mui/material";

const Topbar = (props) => {
  // console.log("props.Data: ", props.Data);
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [Count, setCount] = useState(0);
  const [BrandName, setBrandName] = useState()
  const [KPIName, setKPIName] = useState()

  const [fullNameBrand, setFullNameBrand] = useState("");
  // console.log("fullNameBrand: ", fullNameBrand);

  const BrandDetails = JSON.parse(localStorage.getItem("BrandDetails"));
  const [DetailsId, setDetailsId] = useState("")
  // console.log("DetailsId: ", DetailsId);
  const [Details, setDetails] = useState({})
  const [DetailsFlag, setDetailsFlag] = useState(false)
  const [ShowHideMenuIcon, setShowHideMenuIcon] = useState("")

  useEffect(() => {
    const url = window.location.href;
    const text = url.split('/');
    const tab = text[text.length - 1];
    setShowHideMenuIcon(tab);
  }, [])

  useEffect(() => {
    if (BrandDetails !== null && JSON.stringify(Details) === "{}" && DetailsId === "") {
      setDetailsId(BrandDetails.id)
      setDetails(BrandDetails)
      setDetailsFlag(true)
    }
  }, [BrandDetails, Details, DetailsId])

  // useEffect(() => {
  //   const handle = setInterval(() => {
  //     setCount(Count + 1);
  //   }, 1000);

  //   return () => {
  //     clearInterval(handle);
  //   };
  // }, [Count]);

  useEffect(() => {
    const Analyse = JSON.parse(localStorage.getItem("Analyse"));
    // console.log("brand name: ", Analyse)

    setBrandName((location.pathname === '/home' || location.pathname === '/' || location.pathname === '/portfolio') ? '' : Analyse ? Analyse.BrandName : '')
    setKPIName((location.pathname !== '/home') ? Analyse ? Analyse.KPIName : '' : '')

  }, [Count, location.pathname])

  // full name logic
  const AllBrands = JSON.parse(localStorage.getItem("allBrands"));
 
  function flattenDataToObject(data) {
    let result = {};
 
    function flatten(item) {
      result[item?.id] = item?.name;
      if (item?.children) {
        item?.children.forEach(flatten);
      }
    }
 
    data?.forEach(flatten);
    return result;
  }
 
  const flattenedData = flattenDataToObject([AllBrands]);

  // console.log("flattenedData: ", flattenedData);

  function getTeaList(idList, flattenedData) {
    return idList?.map((key) => flattenedData[key]);
 }
 
  function getDashSeparatedName(match,flattenedData){
      const pathSegments = match?.split("-");
      const newPath = pathSegments?.map((segment, index) =>
        pathSegments.slice(0, index + 1).join("-")
      );
      const result = getTeaList(newPath, flattenedData);
      const names = result?.join("-");
      return names;
  }

  useEffect(() => {
    const fullName = getDashSeparatedName(DetailsId, flattenedData)
    setFullNameBrand(fullName);
  }, [BrandName])


  return (
    <div>
      <header id="page-topbar">
        <div className="navbar-header max-w-100 p-0 justify-content-sm-evenly">
          <div className="row w-100">
            <div className="col-sm-1">
              <div className="d-flex justify-content-center">
                <div className="navbar-brand-box">
                  <Link to="/" className="logo logo-dark">
                    <span className="logo-sm">
                      <img src={localStorage.getItem("CurrentTheme") === "Dark" ?
                        LogoMark :
                        localStorage.getItem("ColorCode") === "Lavender" ?
                          LavenderLogo :
                          localStorage.getItem("ColorCode") === "Sapphire" ?
                            SapphireLogo :
                            localStorage.getItem("ColorCode") === "Teal" ?
                              TealLogo :
                              localStorage.getItem("ColorCode") === "Cyan" ?
                                CyanLogo :
                                localStorage.getItem("ColorCode") === "Goldenrod" ?
                                  GoldenrodLogo :  LogoMark
                      } alt="logo-sm" height="32" />
                    </span>
                    <span className="logo-lg">
                      <img src={localStorage.getItem("CurrentTheme") === "Dark" ?
                        LogoMark :
                        localStorage.getItem("ColorCode") === "Lavender" ?
                          LavenderLogo :
                          localStorage.getItem("ColorCode") === "Sapphire" ?
                            SapphireLogo :
                            localStorage.getItem("ColorCode") === "Teal" ?
                              TealLogo :
                              localStorage.getItem("ColorCode") === "Cyan" ?
                                CyanLogo :
                                localStorage.getItem("ColorCode") === "Goldenrod" ?
                                  GoldenrodLogo :  LogoMark
                      } alt="logo-dark" height="32" />
                    </span>
                  </Link>
                  <Link to="/" className="logo logo-light">
                    <span className="logo-sm">
                      <img src={localStorage.getItem("CurrentTheme") === "Dark" ?
                        LogoMark :
                        localStorage.getItem("ColorCode") === "Lavender" ?
                          LavenderLogo :
                          localStorage.getItem("ColorCode") === "Sapphire" ?
                            SapphireLogo :
                            localStorage.getItem("ColorCode") === "Teal" ?
                              TealLogo :
                              localStorage.getItem("ColorCode") === "Cyan" ?
                                CyanLogo :
                                localStorage.getItem("ColorCode") === "Goldenrod" ?
                                  GoldenrodLogo : LogoMark
                      } alt="logo-sm-light" height="32" />
                    </span>
                    <span className="logo-lg">
                      <img
                        src={localStorage.getItem("CurrentTheme") === "Dark" ?
                          LogoMark :
                          localStorage.getItem("ColorCode") === "Lavender" ?
                            LavenderLogo :
                            localStorage.getItem("ColorCode") === "Sapphire" ?
                              SapphireLogo :
                              localStorage.getItem("ColorCode") === "Teal" ?
                                TealLogo :
                                localStorage.getItem("ColorCode") === "Cyan" ?
                                  CyanLogo :
                                  localStorage.getItem("ColorCode") === "Goldenrod" ?
                                    GoldenrodLogo : LogoMark
                        }
                        alt="logo-light"
                        height="32"
                      />
                    </span>
                  </Link>
                </div>
                {ShowHideMenuIcon !== "portfolio" ?
                  <button
                    type="button"
                    className="btn btn-sm px-3 font-size-24 d-lg-none header-item"
                    data-bs-toggle="collapse"
                    data-bs-target="#topnav-menu-content"
                    style={{ zIndex: "999" }}
                  >
                    <i className="ri-menu-2-line align-middle"></i>
                  </button>
                  : null}
              </div>
            </div>
            <div className="col-sm-2">
              <div className="d-flex">
                <div className="d-lg-block">
                  <div className="d-lg-inline-block ms-1">
                    {BrandName ? (
                      <Link
                        className="btn header-item noti-icon waves-effect px-0 d-flex align-items-center"
                        to="/portfolio"
                      >
                        <i className="ri-arrow-left-s-line me-2"></i>
                        <p className="m-0 d-flex align-items-center h-breadcrumb-item">
                          Portfolio Landscape
                        </p>
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 d-flex align-items-center justify-content-center   ">
              <div>
                <div className="d-inline-block">
                  {/* <h2 className="heading-menu-title">{BrandName ? fullNameBrand + ' - ' + KPIName : 'PORTFOLIO LANDSCAPE'}</h2> */}
                  <h2 className="heading-menu-title">
                     {BrandName ? (
                       <>
                         {fullNameBrand} - <span style={{color: "#d6ff41", fontWeight: 900}}>{KPIName}</span>
                       </>
                     ) : (
                       'PORTFOLIO LANDSCAPE'
                     )}
                  </h2>
                </div>
              </div>
            </div>
            <div className="offset-sm-1 col-sm-2">
              <div className="d-flex justify-content-around align-items-center">
                <div className="dropdown d-inline-block">
                  {DetailsFlag ?
                    <button
                      type="button"
                      className="btn header-item noti-icon right-bar-toggle waves-effect"
                      onClick={() => setShow(!show)}
                    >
                      <img
                        // src={localStorage.getItem("CurrentTheme") === "Dark" ? MenuIcon : ""}

                        src={localStorage.getItem("CurrentTheme") === "Dark" ?
                          MenuIcon :
                          localStorage.getItem("ColorCode") === "Lavender" ?
                            LavenderMenu :
                            localStorage.getItem("ColorCode") === "Sapphire" ?
                              SapphireMenu :
                              localStorage.getItem("ColorCode") === "Teal" ?
                                TealMenu :
                                localStorage.getItem("ColorCode") === "Cyan" ?
                                  CyanMenu :
                                  localStorage.getItem("ColorCode") === "Goldenrod" ?
                                    GoldenrodMenu : MenuIcon 
                        }
                        alt="" />
                    </button> : null}

             
                   
                </div>
                {BrandName ? <div onClick={() => navigate("/gpt")} style={{color: "#d6ff41", fontSize: "1rem", cursor: "pointer"}}>Skewb GPT</div>: null}
              </div>
             
            </div>
          </div>
          
        </div>
      </header>
      {show ?
        BrandDetails.id !== "" ? <DetailsPopUp DetailsId={DetailsId} setDetailsId={setDetailsId} Details={Details} setDetails={setDetails} setShow={setShow} show={show} />
          : null
        : null}
    </div>
  );
};

export default Topbar;