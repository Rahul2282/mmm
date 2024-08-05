import React, { useState,useEffect } from "react";
import Topbar from "../Components/Topbar";
import CategoryNode from "../Components/CategoryNode";
import Tree from "react-d3-tree";
import { useCenteredTree } from "../Components/Helpers";
import "../assets/ManualCSS/custom-tree.css";
import Axios from "../Axios";
import Loader from "../Components/Loader";
import { ToastContainer, toast } from "react-toastify";
import { CssBaseline } from "@mui/material";


const PortfolioLandscape = () => {
  const [dimensions, translate, containerRef] = useCenteredTree();
  const [chartJson, setChartJson] = useState({});
  const [Details, setDetails] = useState({});
  const [DetailsId, setDetailsId] = useState("");

  const [loader, setLoader] = useState(false);

  const nodeSize = { x: 240, y: 100 };

  const containerStyles = {
    width: "100vw",
    height: "100vh",
  };
  // console.log("usecenteredTree",useCenteredTree);

  const handleNodeClick = (nodeDatum) => {
    setDetailsId("");
    setDetails({});

    if (parseInt(nodeDatum.access) === 1) {
      setDetailsId(nodeDatum.id);
      setDetails({
        id: nodeDatum.id,
        name: nodeDatum.name,
        hirarchy_level: nodeDatum.hirarchy_level,
        img: nodeDatum.img,
      });

      localStorage.setItem(
        "BrandDetails",
        JSON.stringify({
          id: nodeDatum.id,
          name: nodeDatum.name,
          hirarchy_level: nodeDatum.hirarchy_level,
          img: nodeDatum.img,
        })
      );
    }
  };

  const fetchDisplayNames = async () => {
    try {
      const response = await Axios.post("display_name_filter/", {});

      const data = response.data;
      localStorage.setItem("displayNames", JSON.stringify(data.data));
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };

  const fetchDisplayNamesChart = async () => {
    try {
      const response = await Axios.post("display_name_chart/", {});

      const data = response.data;
      localStorage.setItem("displayNamesChart", JSON.stringify(data.data));
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };

  useEffect(() => {
    setLoader(true);
    Axios
      .post("get_hirarchy_data_nested/", {})
      .then((response) => {
        if (response.data.error === 1) {
          toast.error(response.data.erroMsg);
          setLoader(false);
        } else {
          setChartJson(response.data);
          localStorage.setItem("allBrands", JSON.stringify(response.data));
          setLoader(false);
        }
      })
      .catch((data) => {
        setLoader(false);
      });

    fetchDisplayNames();
    fetchDisplayNamesChart();

    return () => {};
  }, []);

  return (
    <div style={{ backgroundColor: "black" }}>
      <CssBaseline />
      {loader ? <Loader /> : null}
      <ToastContainer />
      <Topbar BrandName="" />

      {/* {DetailsId !== "" ? (
        <DetailsPopUp
          DetailsId={DetailsId}
          setDetailsId={setDetailsId}
          Details={Details}
          setDetails={setDetails}
        />
      ) : null} */}

      <div style={containerStyles} ref={containerRef}>
        <Tree
          data={chartJson}
          dimensions={dimensions}
          translate={translate}
          renderCustomNodeElement={(rd3tProps) => (
            <CategoryNode
              {...rd3tProps}
              handleNodeClick={handleNodeClick}
              setDetailsId={setDetailsId}
            />
          )}
          orientation="horizontal"
          initialDepth={1}
          separation={{ siblings: 1, nonSiblings: 1 }}
          enableLegacyTransitions={800}
          nodeSize={nodeSize}
          pathFunc={"step"}
          zoomable={true}
          pathClassFunc={() => "custom-path-link"}
        />
      </div>
    </div>
  );
};

export default PortfolioLandscape;
