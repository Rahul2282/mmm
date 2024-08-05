import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "../Axios";
import Loader from "./Loader";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
// import PopUp from "./PopUp"  ;
import CustomSelection from "./CustomSelect.js"
import CascaderWrapper from "./SingleCascading.js";


const DetailsPopUp = (props) => {

  console.log("DetailPopUp")
  // console.log("props.Data: ", props.Data);
  const navigate = useNavigate();
  const DivRef = useRef(null);

  const casRef = useRef(null);

  const [divWidth, setDivWidth] = useState("");
  // console.log("divWidth: ", divWidth);

  useLayoutEffect(() => {
    const updateDivHeight = () => {
      if (casRef.current !== null) {
        const newWidth = casRef.current.clientWidth;
        setDivWidth(newWidth);
      }
    };

    updateDivHeight(); // Initial update
    window.addEventListener("resize", updateDivHeight);

    return () => {
      window.removeEventListener("resize", updateDivHeight);
    };
  }, []);

  const [loader, setLoader] = useState(false);
  const [KPIAll, setKPIAll] = useState([]);
  const [KPI, setKPI] = useState("");
  const [KPIName, setKPIName] = useState("");
  const [AnalyticsToolAll, setAnalyticsToolAll] = useState([]);
  const [AnalyticsTool, setAnalyticsTool] = useState("");
  // console.log("AnalyticsTool: ", AnalyticsTool);

  const [tag1, settag1] = useState("");
  const [tag_unit1, settag_unit1] = useState("");
  const [tag_val1, settag_val1] = useState();
  const [tag2, settag2] = useState("");
  const [tag_unit2, settag_unit2] = useState("");
  const [tag_val2, settag_val2] = useState("");

  const [Redirect, setRedirect] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [getBrand, setGetBrand] = useState("");
  const [BrandFullName, setBrandFullName] = useState("");


  useEffect(() => {
    if (getBrand !== "") {
      props.setDetailsId(getBrand?.value);
      props.setDetails({
        id: getBrand?.id,
        name: getBrand?.name,
        hirarchy_level: getBrand?.hirarchy_level,
        img: getBrand?.img,
      });

      localStorage.removeItem("BrandDetails");
      localStorage.setItem(
        "BrandDetails",
        JSON.stringify({
          id: getBrand?.id,
          name: getBrand?.name,
          hirarchy_level: getBrand?.hirarchy_level,
          img: getBrand?.img,
        })
      );
    }
  }, [getBrand]);

  useEffect(() => {
    const controller = new AbortController();

    if (props.Details.hirarchy_level !== "" && props.Details.name !== "") {
      const payload = {
        level: props.Details.hirarchy_level,
        name: props.Details.id,
        // "name": getBrand.value
      };

      setLoader(true);
      axios
        .post("get_kpi_tools/", {level: 0, name: "org"}, {
          signal: controller.signal
        })
        .then((response) => {
          if (response.data.error === 1) {
            toast.error(response.data.erroMsg, {
              position: toast.POSITION.TOP_LEFT,
            });
          } else {
            console.log(" response.data.data.data[0].analysis_tools ",response.data.data.data[0].analysis_tools)
            setKPIAll(response.data.data.data);
            setKPI(response.data.data.data[0].kpi_short_code);
            setKPIName(response.data.data.data[0].kpi_display_name);
            setAnalyticsToolAll(response.data.data.data[0].analysis_tools);
            setAnalyticsTool(response.data.data.data[0].analysis_tools[0].value);
            settag1(response.data.data.data[0].tag1);
            settag_unit1(response.data.data.data[0].tag_unit1);
            settag_val1(response.data.data.data[0].tag_val1);
            settag2(response.data.data.data[0].tag2);
            settag_unit2(response.data.data.data[0].tag_unit2);
            settag_val2(response.data.data.data[0].tag_val2);
          }
          setLoader(false);
        })
        .catch((data) => {
          setLoader(false);
        });
    }

    return () => {
      controller.abort();
    };
  }, [props.Details, getBrand]);

  const KPIHandler = (e) => {
    const value = e.target.value;
    setKPI(value);

    for (var i = 0; i < KPIAll.length; i++) {
      if (KPIAll[i].kpi_short_code === value) {
        settag_unit1(KPIAll[i].tag_unit1);
        settag_val1(KPIAll[i].tag_val1);
        settag2(KPIAll[i].tag2);
        settag_unit2(KPIAll[i].tag_unit2);
        settag_val2(KPIAll[i].tag_val2);

        setKPIName(KPIAll[i].kpi_display_name);
        setAnalyticsToolAll(KPIAll[i].analysis_tools);
        setAnalyticsTool(KPIAll[i].analysis_tools[0].value);
        break;
      }
    }

    setKPI(value);
  };

  // useEffect(()=>{

  // }, [props.Details.id])

  const SubmitAnalyse = () => {
    // console.log("Clicked on Analyse: ")
    setLoader(true);
    localStorage.removeItem("AnalyticFilter");
    localStorage.removeItem("CampaignAnalyticFilter");
    axios
      .post("get_hirarchy_dropdown/", {
        hirarchy: props.Details.id,
        // hirarchy: getBrand.value
      })
      .then((response) => {
        var all_heirarchy_filter = [];
        var active_heirarchy_filter = [];

        var heirarchy_sortable = [...response.data.data.sortable];

        for (let i = 0; i < heirarchy_sortable.length; i++) {
          if (parseInt(heirarchy_sortable[i].default) === 1) {
            active_heirarchy_filter.push(heirarchy_sortable[i]);
          }
          all_heirarchy_filter.push(heirarchy_sortable[i]);
        }

        const chartdata = {};
        for (var k = 0; k < response.data.data.fixed.length; k++) {
          chartdata[response.data.data.fixed[k].id] = {
            selection: [],
            Filter: [response.data.data.fixed[k].value],
          };
        }

        var temp_active_heirarchy = [];
        for (var j = 0; j < active_heirarchy_filter.length; j++) {
          var obj = active_heirarchy_filter[j];
          obj["Selected"] = [];
          obj["filters"] = active_heirarchy_filter[j].options;
          temp_active_heirarchy.push(obj);
          chartdata[active_heirarchy_filter[j].name] = {
            selection: [],
            Filter: [],
          };
        }

        const AnalyticFilter = {
          AllFilters: all_heirarchy_filter,
          Fixed: response.data.data.fixed,
          ActiveFilters: temp_active_heirarchy,
        };

        localStorage.setItem("AnalyticFilter", JSON.stringify(AnalyticFilter));
        localStorage.setItem(
          "DefaultLevel",
          JSON.stringify(response.data.data.DefaulLevel)
        );
        localStorage.setItem("Chartdata", JSON.stringify(chartdata));
        setLoader(false);
        // setRedirect(true);
      })
      .catch((data) => {
        setLoader(false);
      });

    const Analyse = {
      KPI: KPI,
      KPIName: KPIName,
      kpiID: getKPI?.id,
      AnalyticsTool: AnalyticsTool,
      Brand: props.Details.id,
      // Brand: getBrand.value,
      BrandName: props.Details.name,
      // BrandName: getBrand.name,
      Menubar: AnalyticsToolAll,
    };

    localStorage.setItem("Analyse", JSON.stringify(Analyse));
    setRedirect(true);
    // setAnalysisClicked(true);
  };


  setTimeout(() => {
    if (Redirect) {
      setLoader(true);
      axios
        .post("get_grain_contrib_new_filters/", {
          brand: props.Details.id,
          // brand: getBrand.value,
          kpi: KPI,
        }
        )
        .then((response) => {
          if (response.data.error === 1) {
            toast.error(response.data.erroMsg);
            setLoader(false);
          } else {
            var active_campaign_filter = [];
            var all_campaign_filter = [];
            var campaign_sortable = [...response.data.data];

            for (let i = 0; i < campaign_sortable.length; i++) {
              if (parseInt(campaign_sortable[i].default) === 1) {
                active_campaign_filter.push(campaign_sortable[i]);
              }
              all_campaign_filter.push(campaign_sortable[i]);
            }

            // Prepare chartdata for selected comp filters
            var ChartdataTemp = JSON.parse(localStorage.getItem("Chartdata"));
            for (var m = 0; m < active_campaign_filter.length; m++) {
              const selection = [];
              if ("Selected" in active_campaign_filter[m]) {
                for (
                  var j = 0;
                  j < active_campaign_filter[m].Selected.length;
                  j++
                ) {
                  selection.push(active_campaign_filter[m].Selected[j].value);
                }
              }

              ChartdataTemp[active_campaign_filter[m].name] = {
                selection: [],
                Filter: selection,
              };
            }

            const CampaignAnalyticFilter = {
              CompAllFilters: all_campaign_filter,
              CompActiveFilters: active_campaign_filter,
            };

            localStorage.setItem(
              "CampaignAnalyticFilter",
              JSON.stringify(CampaignAnalyticFilter)
            );
            localStorage.setItem("Chartdata", JSON.stringify(ChartdataTemp));
            setLoader(false);

            var id = props.Details.id;
            // var id = getBrand.value
            navigate("/" + AnalyticsTool, {
              state: {
                id,
              },
            });
            setRedirect(false);
            // setAnalysisClicked(false);
          }
        })
        .catch((data) => {
          setLoader(false);
        });
    }
  }, 0);

 

  const handleFilterClick = (event) => {
    if (DivRef.current && !DivRef.current.contains(event.target)) {
      // props.setShow(false);
      props.setDetailsId("");
      if (typeof props.show !== "undefined") {
        props.setShow(false);
      }
    }
  };

  const AllBrands = JSON.parse(localStorage.getItem("allBrands"));

  // console.log("kpiID: ", Analyse.kpiID);






  // kpi cascader api call
  const [allKPI, setAllKPI] = useState([]);
  const [getKPI, setGetKPI] = useState("");
  const [matchKPI, setMatchKPI] = useState("");
  // console.log("getKPI: ", getKPI);
  // console.log("matchKPI: ", matchKPI);

 

  useEffect(() => {
    const fetchData = async () => {
      if (props.Details.hirarchy_level !== "" && props.Details.name !== "") {
        const payload = {
          level: props.Details.hirarchy_level,
          name: props.Details.id,
        };

        try {
          const response = await axios.post("kpi_option/", {level: 0, name: "org"});
          console.log("kpi option: ", response.data.data);
          setAllKPI(response.data.data);
          setGetKPI(response.data.data[0]?.children[0]);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [props.Details, getBrand]); // Add props.Details as a dependency to run the effect when it changes

  useEffect(() => {
    if(getKPI !== "") {
      settag_unit1(getKPI?.tag_unit1);
      settag_val1(getKPI?.tag_val1);
      settag2(getKPI?.tag2);
      settag_unit2(getKPI?.tag_unit2);
      settag_val2(getKPI?.tag_val2);
      setKPIName(getKPI?.kpi_display_name);
      setAnalyticsToolAll(getKPI?.analysis_tools);
      setAnalyticsTool(getKPI?.analysis_tools[0].value);
      setKPI(getKPI?.value);
      setKPIName(getKPI?.name);
      setMatchKPI(getKPI?.id);
    }
  }, [getKPI, getBrand])


 
  return (
    <>
      {loader ? <Loader /> : null}
      <ToastContainer theme="colored" />
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100vh",
          
          background: "#00000000",
          zIndex: "999",
          // border: "1px solid red"
        }}
        onClick={(e) => {
          handleFilterClick(e);
        }}
      >
        <div
           className={'right-bar'} 
          ref={DivRef}
          style={{
          width:'300px',
          maxWidth:'400px',
          // right: props.show ? '0' : '-350px',
          // transition: 'right .3s ease-in-out'

          }}
        >
          <div data-simplebar className="h-100" style={{ height: "100%", overflowY: "auto", }}>
            <div className="rightbar-title d-flex align-items-center pt-4 pb-2">
            
            </div>

            <div className="row justify-content-center">
              <div className="col-sm-12 text-center" >
                <img
                  src={`${props.Details.img}?v=${new Date().getTime()}`}
                  alt=""
                  style={{
                    width: "200px",
                    height: "100px",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div
                className="col-sm-12 text-center"
                
              >
                <h4 className="h-menu-user-name" style={{  }}>
                  {props.Details.name}
                </h4>
              </div>
              <hr className="h-menu-user-hr" />
            </div>

            <div className="gautam" >
              <div className="row pt-2">
                <div className="col-sm-6 b-right text-center">
                  <div
                    className="brand-exp-txt"
                    style={{ display: "flex", flexDirection: "column", gap: 7 }}
                  >
                    <p className="m-0">
                      <u> {tag1}</u>
                      {/* <u>{"Aug 2022 - Jul 2023 Spends"}</u> */}
                    </p>
                    <p className="m-0">
                      {tag_val1} {tag_unit1}
                    </p>
                  </div>
                </div>
                <div className="col-sm-6 text-center">
                  <div
                    className="brand-exp-txt"
                    style={{ display: "flex", flexDirection: "column", gap: 7 }}
                  >
                    <p className="m-0">
                      <u> {tag2}</u>
                      {/* <u>{"Aug 2022 - Jul 2023 Spends"}</u> */}
                    </p>
                    <p className="m-0">
                      {/* <img src={Vector} className="p-1" alt="" /> */}
                      {tag_val2} {tag_unit2}
                    </p>
                  </div>
                </div>
              </div>

              <div className="my-5">
                <div className="form-group row my-2">
                  {/* for brand selection */}
                  <div className="col-12" style={{}} ref={casRef}>
                    <h3>
                      <label className="login-lable h-menu-label">
                        Select or Search Brand
                      </label>
                    </h3>
                    {/* <SelectBrand
                      setGetBrand={setGetBrand}
                      match={props.Details.id}
                      setDetailsId={props.setDetailsId}
                      setDetails={props.setDetails}
                    /> */}
                    <CascaderWrapper
                      data={[AllBrands]}
                      divWidth={divWidth}
                      setGetBrand={setGetBrand}
                      match={props.Details.id}
                      setDetailsId={props.setDetailsId}
                      setDetails={props.setDetails}
                    />
                  </div>

                  {/* for brand selection */}

                  {/* for kpi selection */}
                  <div className="col-12">
                    <h3>
                      <label className="login-lable h-menu-label">
                        Select or Search KPI
                      </label>
                    </h3>
                    {/* <select
                      className="form-select"
                      value={KPI}
                      onChange={KPIHandler}
                    >
                      {KPIAll.map((item) => {
                        return (
                          <option
                            key={item.kpi_short_code}
                            value={item.kpi_short_code}
                          >
                            {item.kpi_display_name}
                          </option>
                        );
                      })}
                    </select> */}
                    {getKPI !== "" && matchKPI && 
                      <CascaderWrapper
                        key={matchKPI}
                        data={allKPI}
                        setGetBrand={setGetKPI}
                        match={matchKPI}
                    />}
                  </div>
                  {/* for kpi selection */}
                </div>
              
                  <div className="col-12">
                    <h3>
                      <label className="login-lable h-menu-label">
                        Select Analytics Tool
                      </label>
                    </h3>
                    {/* <select  onFocus={(e) => e.target.size = 1}
                             onBlur={(e) => e.target.size = 1}
                      className="form-select"
                      value={AnalyticsTool}
                      onChange={(e) => setAnalyticsTool(e.target.value)}
                    >
                      {AnalyticsToolAll.map((item) => {
                        return (
                          <option key={item.key} value={item.key} className="optionHover">
                            {item.value}
                            
                          </option>
                        );
                      })}
                    </select> */}
                    <CustomSelection
                     value={AnalyticsTool}
                     onChange={(e) => setAnalyticsTool(e.target.value)}
                     options={AnalyticsToolAll}
                    />
                    
                  </div>
                
                <div className="form-group row my-2 text-center">
                  <div className="col-12 mt-3">
                    <button
                      className="btn btn-info"
                      type="button"
                      onClick={SubmitAnalyse}
                    >
                      Analyse
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <footer className="right-bar-footer" >
              {/* onClick={()=>{
                  window.Change_Theme()
                }} */}
              <div className=" gautam" >
                {localStorage.getItem("is_superuser") === "1" ? (
                  <div className="row py-2 ">
                    <div className="col-sm-12">
                      <Link to="/users" className="h-menu-link">
                        <p className="mb-0">
                          <u>User Management </u>
                        </p>
                      </Link>
                    </div>
                  </div>
                ) : null}
                {/* <div className="row py-2 ">
                  <div className="col-sm-12" onClick={() => {
                    setShowPopup(true);
                  }}>
                    <Link to="" className="h-menu-link">
                      <p className="mb-0">
                        <u>Change Theme</u>
                      </p>
                    </Link>
                  </div>
                </div> */}

                <div className="row py-2 ">
                  <div className="col-sm-12">
                    <Link to="/user_profile" className="h-menu-link">
                      <p className="mb-0">
                        <u>Theme</u>
                      </p>
                    </Link>
                  </div>
                </div>
                <div className="row py-2 ">
                  <div className="col-sm-12">
                    <Link
                      to=""
                      className="h-menu-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      <p className="mb-0">
                        <u onClick={() => setShowPopup(true)}>
                          Contact Support
                        </u>
                      </p>
                    </Link>
                  </div>
                </div>
                <div className="row py-2">
                  <div className="col-sm-12">
                    <Link to="/logout" className="h-menu-link">
                      <p className="mb-0">
                        <u>Logout</u>
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
        {/* <div className="rightbar-overlay"></div> */}
      </div>
      {/* {showPopup && (
        <PopUp
          setShowPopup={setShowPopup}
          width={"300px"}
          height={"160px"}
          children={<h3 style={{ color: "#d6ff41" }}>info@skewb.ai</h3>}
        />
      )} */}
    </>
  );
};

export default DetailsPopUp;
