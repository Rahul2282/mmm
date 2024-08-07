import React, { useEffect, useState, useRef, useLayoutEffect ,useContext} from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "../Axios";
import Loader from "./Loader";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
// import PopUp from "./PopUp"  ;
import CustomSelection from "./CustomSelect.js"
import CascaderWrapper from "./SingleCascading.js";
import appContext from "../context/appContext";


const DetailsPopUp = () => {
  // console.log("Data: ", Data);
  const navigate = useNavigate();
  const DivRef = useRef(null);
  const mainDef=useRef(null);

  const casRef = useRef(null);

  const [divWidth, setDivWidth] = useState("");

  const context=useContext(appContext);
  const {isOpen,setIsOpen,DetailsId, setDetailsId,Details, setDetails,node}=context;

  
  console.log("DetailsPopUP ",isOpen," " ,Details)
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
  const [showPopup, setIsOpenPopup] = useState(false);

  const [getBrand, setGetBrand] = useState("");
  
  const [BrandFullName, setBrandFullName] = useState("");


  useEffect(() => {
    if (getBrand !== "") {
      setDetailsId(getBrand?.value);
      setDetails({
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

 

  const SubmitAnalyse = () => {
    // console.log("Clicked on Analyse: ")
    setLoader(true);
    localStorage.removeItem("AnalyticFilter");
    localStorage.removeItem("CampaignAnalyticFilter");
    axios
      .post("get_hirarchy_dropdown/", {
        hirarchy: Details.id,
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
      Brand: Details.id,
      // Brand: getBrand.value,
      BrandName: Details.name,
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
          brand: Details.id,
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

            var id = Details.id;
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
    event.stopPropagation(); // Prevent the click event from propagating
    if (mainDef.current && !mainDef.current.contains(event.target)) {
        // setIsOpen(false);
      // setDetailsId("");
      if (typeof isOpen !== "undefined") {
        setIsOpen(false);
        // console.log("ISOPEN false ");
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
      if (Details.hirarchy_level !== "" && Details.name !== "") {
        const payload = {
          level: Details.hirarchy_level,
          name: Details.id,
        };

        console.log("details Payload",payload)
        try {
          const response = await axios.post("get_kpi_tools/", payload);
          // console.log("kpi option: ", response.data.data);
          setAllKPI(response.data.data);
          setGetKPI(response.data.data[0]?.children[0]);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [Details, getBrand]); // Add Details as a dependency to run the effect when it changes

  useEffect(() => {
    console.log("getKPI ",getKPI);
    if(getKPI !== "") {
      settag_unit1(getKPI?.tag_unit1);
      settag_val1(getKPI?.tag_val1);
      settag2(getKPI?.tag2);
      settag1(getKPI?.tag1);
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


  useEffect(() => {
     if (DivRef.current && isOpen===false) {

      setTimeout(()=>{
        console.log("Scrolling to top",DivRef.current);
        // setDivDisplay('none');
        DivRef.current.scrollIntoView({ behavior: "instant", block: "end" }); 
      },400)



    }
    // if(isOpen)
    // {
    //   setDivDisplay('block');
    // }
  }, [isOpen]);

console.log("isOpen ",isOpen);



useEffect(() => {
  if (mainDef.current) {
    mainDef.current.style.right = isOpen ? '0' : '-350px';
  }
}, [isOpen]);
  return (
    <>
      {loader ? <Loader /> : null}
      <ToastContainer theme="colored" />
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100vh",
          // background: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
          // backdropFilter: 'blur(4px)', // Apply blur effect
          // opacity:'.1',
          // overflowX:"hidden",
          zIndex: "999",
          // transition:'backdropFilter .4 ease-in-out',

          // border: "1px solid red"
        }}
        
        
      >
        <div
         style={{
          position: "absolute",
          width: "100%",
          height: "100vh",
          background: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
          backdropFilter: 'blur(5px)', // Apply blur effect
          // opacity:'.1',
          // overflowX:"hidden",
          zIndex: "999",
          // transition:'backdropFilter .4 ease-in-out',

          // border: "1px solid red"
        }}
        
        onClick={(e) => {
          handleFilterClick(e);
        }}
        >
          
        </div>
        <div
          className={'right-bar'}
          ref={mainDef}
          style={{
            width: '300px',
            maxWidth: '400px',
            right: '-350px',
            transition: 'right .4s ease-in-out',
            position: 'fixed',
            

          }}
        >
          
          <div data-simplebar className="h-100" style={{ height: "100%", overflowY: "scroll", }}>
            <div className="rightbar-title d-flex align-items-center pt-4 pb-2" ref={DivRef}>

            </div>

            <div className="row justify-content-center">
              <div className="col-sm-12 text-center" >
                <img
                  src={`${Details.img}?v=${new Date().getTime()}`}
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
                <h4 className="h-menu-user-name" style={{}}>
                  {Details.name}
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
                      match={Details.id}
                      setDetailsId={setDetailsId}
                      setDetails={setDetails}
                    /> */}
                    <CascaderWrapper
                      data={[AllBrands]}
                      divWidth={divWidth}
                      setGetBrand={setGetBrand}
                      match={Details.id}
                      setDetailsId={setDetailsId}
                      setDetails={setDetails}
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
                    {/* <CascaderWrapper
                      data={[AllBrands]}
                      divWidth={divWidth}
                      setGetBrand={setGetBrand}
                      match={Details.id}
                      setDetailsId={setDetailsId}
                      setDetails={setDetails}
                    /> */}
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

            <footer className="right-bar-footer"  >
              {/* onClick={()=>{
                  window.Change_Theme()
                }} */}

              {window.innerWidth < 600 && <div className="row py-2 ">
                <div className="col-sm-12">
                  <Link to="/gpt" className="h-menu-link">
                    <p className="mb-0">
                      <u>Skewb GPT</u>
                    </p>
                  </Link>
                </div>
              </div>
              }
              {window.innerWidth < 600 &&
                <div className="row py-2 ">
                  <div className="col-sm-12">
                    <Link to="/portfolio" className="h-menu-link">
                      <p className="mb-0">
                        <u>Back To Portfolio Landscape</u>
                      </p>
                    </Link>
                  </div>
                </div>
              }
              <div className=" gautam" >
                {localStorage.getItem("is_superuser") === "1" ? (
                  <div className="row py-2 ">
                    <div className="col-sm-12">
                      <Link to="#" className="h-menu-link">
                        <p className="mb-0">
                          <u>User Management </u>
                        </p>
                      </Link>
                    </div>
                  </div>
                ) : null}
                {/* <div className="row py-2 ">
                  <div className="col-sm-12" onClick={() => {
                    setIsOpenPopup(true);
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
                    <Link to="#" className="h-menu-link">
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
                        <u onClick={() => setIsOpenPopup(true)}>
                          Contact Support
                        </u>
                      </p>
                    </Link>
                  </div>
                </div>
                <div className="row py-2"
                >
                  <div className="col-sm-12">
                    <Link to="/login" className="h-menu-link">
                      <p className="mb-0">
                        <u >Logout</u>

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
          setIsOpenPopup={setIsOpenPopup}
          width={"300px"}
          height={"160px"}
          children={<h3 style={{ color: "#d6ff41" }}>info@skewb.ai</h3>}
        />
      )} */}
    </>
  );
};

export default DetailsPopUp;
