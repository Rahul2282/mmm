
import React, { useState, useEffect,useContext } from "react";
import Topbar from "../Components/Topbar";
import Tree from "react-d3-tree";
import { useCenteredTree } from "../Components/Helpers";
import "../assets/ManualCSS/custom-tree.css";
import Axios from "../Axios";
import Loader from "../Components/Loader";
import { ToastContainer, toast } from "react-toastify";
import { CssBaseline } from "@mui/material";
import DetailsPopUp from "../Components/DetailsPopUp";
import appContext from "../context/appContext";
const RenderRectSvgNode = ({ nodeDatum, toggleNode, handleNodeClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  

  // Inline style for the default and hovered states
  const rectStyle = {
    width: "200px",
    height: "76px",
    fill: "black",
    x: "-90px",
    y: "-38px",
    rx: "7px",
    ry: "7px",
    filter: isHovered ? "url(#hoverShadow)" : "url(#dropShadow)",
    cursor: nodeDatum.access === 0 ? "not-allowed" : "pointer",
    transition: "transform 0.001s, filter 0.001s",
    transform: isHovered ? "scale(1.05)" : "scale(1)",
  };

  return (
    <g>
      <defs>
        <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="-1" dy="-1" stdDeviation="0" floodColor="#d6ff41" />
          <feDropShadow dx="4" dy="4" stdDeviation="2" floodColor="#1c2427" />
          <feDropShadow dx="6" dy="6" stdDeviation="4" floodColor="rgba(0, 0, 0, 0.3)" />
          <feDropShadow dx="3" dy="3" stdDeviation="2" floodColor="rgba(0, 0, 0, 0.5)" />
        </filter>
        <filter id="hoverShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="-2" dy="-2" stdDeviation="1" floodColor="#d6ff41" />
          <feDropShadow dx="6" dy="6" stdDeviation="3" floodColor="#1c2427" />
          <feDropShadow dx="9" dy="9" stdDeviation="5" floodColor="rgba(0, 0, 0, 0.5)" />
        </filter>
      </defs>
      <rect
        style={rectStyle}
        onClick={() => handleNodeClick(nodeDatum)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      <foreignObject
        x="-90px"
        y="-32px"
        width="60px"
        height="60px"
        style={{
          cursor: nodeDatum.access === 0 ? "not-allowed" : "pointer",
        }}
        onClick={() => handleNodeClick(nodeDatum)}
      >
        <div className="image-bg" xmlns="http://www.w3.org/1999/xhtml"></div>
      </foreignObject>

      {nodeDatum.img && (
        <image
          onClick={() => handleNodeClick(nodeDatum)}
          href={`${nodeDatum.img}?v=${new Date().getTime()}`}
          width="75px"
          height="75px"
          x="-90px"
          y="-38px"
          alt="logo"
          loading="eager"
          style={{
            cursor: nodeDatum.access === 0 ? "not-allowed" : "pointer",
          }}
        />
      )}
      <foreignObject
        x="-30px"
        y="-32px"
        width="120px"
        height="60px"
        style={{
          cursor: nodeDatum.access === 0 ? "not-allowed" : "pointer",
        }}
        onClick={() => handleNodeClick(nodeDatum)}
      >
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            wordWrap: "break-word",
            fontWeight: "bold",
            color: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: nodeDatum.access === 0 ? "not-allowed" : "pointer",
            fontSize: "16px",
            textAlign: "center",
          }}
        >
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            style={{
              fontWeight: "bold",
              color: "white",
              width: "100%",
              cursor: nodeDatum.access === 0 ? "not-allowed" : "pointer",
              fontSize: "14px",
            }}
          >
            {nodeDatum.name}
          </div>
        </div>
      </foreignObject>

      {nodeDatum.children?.length > 0 && (
        <>
          <circle
            onClick={toggleNode}
            cx="98px"
            cy="-1px"
            r="8px"
            stroke="white"
            strokeWidth="1"
            fill="black"
          ></circle>
          {nodeDatum.__rd3t.collapsed ? (
            <svg
              width="14px"
              height="14px"
              x="91px"
              y="-8px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              onClick={toggleNode}
            >
              <line
                onClick={toggleNode}
                x1="12"
                y1="5"
                x2="12"
                y2="19"
                stroke="white"
                strokeWidth="2"
              />
              <line
                onClick={toggleNode}
                x1="5"
                y1="12"
                x2="19"
                y2="12"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          ) : (
            <svg
              onClick={toggleNode}
              width="16px"
              height="16px"
              x="90px"
              y="-9px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                onClick={toggleNode}
                x1="5"
                y1="12"
                x2="19"
                y2="12"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          )}
        </>
      )}
    </g>
  );
};



// const Portfolio = () => {
//   const [dimensions, translate, containerRef] = useCenteredTree();
//   const [chartJson, setChartJson] = useState({});
//   const [Details, setDetails] = useState({});
//   const [DetailsId, setDetailsId] = useState("");

//   const [loader, setLoader] = useState(false);

//   const nodeSize = { x: 240, y: 100 };

//   const containerStyles = {
//     width: "100vw",
//     height: "100vh",
//   };

//   const handleNodeClick = (nodeDatum) => {
//     setDetailsId("");
//     setDetails({});

//     if (parseInt(nodeDatum.access) === 1) {
//       setDetailsId(nodeDatum.id);
//       setDetails({
//         id: nodeDatum.id,
//         name: nodeDatum.name,
//         hirarchy_level: nodeDatum.hirarchy_level,
//         img: nodeDatum.img,
//       });

//       localStorage.setItem(
//         "BrandDetails",
//         JSON.stringify({
//           id: nodeDatum.id,
//           name: nodeDatum.name,
//           hirarchy_level: nodeDatum.hirarchy_level,
//           img: nodeDatum.img,
//         })
//       );
//     }
//   };

//   const fetchDisplayNames = async () => {
//     try {
//       const response = await Axios.post("display_name_filter/", {});

//       const data = response.data;
//       localStorage.setItem("displayNames", JSON.stringify(data.data));
//     } catch (error) {
//       console.error("Failed to fetch:", error);
//     }
//   };

//   const fetchDisplayNamesChart = async () => {
//     try {
//       const response = await Axios.post("display_name_chart/", {});

//       const data = response.data;
//       localStorage.setItem("displayNamesChart", JSON.stringify(data.data));
//     } catch (error) {
//       console.error("Failed to fetch:", error);
//     }
//   };

//   useEffect(() => {
//     setLoader(true);
//     Axios
//       .post("get_hirarchy_data_nested/", {})
//       .then((response) => {
//         if (response.data.error === 1) {
//           toast.error(response.data.erroMsg);
//           setLoader(false);
//         } else {
//           setChartJson(response.data);
//           localStorage.setItem("allBrands", JSON.stringify(response.data));
//           setLoader(false);
//         }
//       })
//       .catch((data) => {
//         setLoader(false);
//       });

//     fetchDisplayNames();
//     fetchDisplayNamesChart();

//     return () => {};
//   }, []);

//   return (
//     <div style={{ backgroundColor: "black" }}>
//       <CssBaseline />
//       {loader ? <Loader /> : null}
//       <ToastContainer />
//       <Topbar BrandName="" />

//       {/* {DetailsId !== "" ? (
//         <DetailsPopUp
//           DetailsId={DetailsId}
//           setDetailsId={setDetailsId}
//           Details={Details}
//           setDetails={setDetails}
//         />
//       ) : null} */}

//       <div style={containerStyles} ref={containerRef}>
//         <Tree
//           data={chartJson}
//           dimensions={dimensions}
//           translate={translate}
//           renderCustomNodeElement={(rd3tProps) => (
//             <RenderRectSvgNode
//               {...rd3tProps}
//               handleNodeClick={handleNodeClick}
//               setDetailsId={setDetailsId}
//             />
//           )}
//           orientation="horizontal"
//           initialDepth={maxdepth}
//           separation={{ siblings: 1, nonSiblings: 1 }}
//           enableLegacyTransitions={800}
//           nodeSize={nodeSize}
//           pathFunc={"step"}
//           zoomable={true}
//           pathClassFunc={() => "custom-path-link"}
//         />
//       </div>
//     </div>
//   );
// };

// export default Portfolio;
const PortfolioLandscape = () => {
  const [dimensions, translate, containerRef] = useCenteredTree();
  const [chartJson, setChartJson] = useState({});
  const [Details, setDetails] = useState({});
  const [DetailsId, setDetailsId] = useState("");
  const [loader, setLoader] = useState(false);
  const [maxDepth, setMaxDepth] = useState(0);
  const context=useContext(appContext);
  const {isOpen,setIsOpen}=context;
  const nodeSize = { x: 250, y: 100 };
  const containerStyles = { width: "100vw", height: "100vh" };

  const handleNodeClick = (nodeDatum) => {
    setDetailsId("");
    setDetails({});
    setIsOpen(!isOpen);

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

  const collapseNodesBeyondLevel = (node, level, maxLevel) => {
    if (level > maxLevel) {
      node.__rd3t = { collapsed: true };
    }
    if (node.children) {
      node.children.forEach((child) =>
        collapseNodesBeyondLevel(child, level + 1, maxLevel)
      );
    }
  };

  const calculateMaxDepth = (node, depth = 0) => {
    if (!node.children || node.children.length === 0) {
      return depth;
    }
    return Math.max(...node.children.map(child => calculateMaxDepth(child, depth + 1)));
  };

  useEffect(() => {
    setLoader(true);
    Axios.post("get_hirarchy_data_nested/", {})
      .then((response) => {
        if (response.data.error === 1) {
          toast.error(response.data.erroMsg);
          setLoader(false);
        } else {
          const data = response.data;
          const depth = calculateMaxDepth(data);
          setMaxDepth(depth);
          collapseNodesBeyondLevel(data, 0, depth); // Collapse nodes beyond max depth
          setChartJson(data);
          localStorage.setItem("allBrands", JSON.stringify(data));
          setLoader(false);
        }
      })
      .catch((data) => {
        setLoader(false);
      });

    fetchDisplayNames();
    fetchDisplayNamesChart();

    return () => { };
  }, []);


  

  return (
    <div style={{ backgroundColor: "black" }}>
      <CssBaseline />
      {loader ? <Loader /> : null}
      <ToastContainer />
      <Topbar BrandName="" />
      {DetailsId !== "" ?  (
        <DetailsPopUp
          
          DetailsId={DetailsId}
          setDetailsId={setDetailsId}
          Details={Details}
          setDetails={setDetails}
        />
      ) : null}
      <div style={containerStyles} ref={containerRef}>
        <Tree
          data={chartJson}
          dimensions={dimensions}
          translate={translate}
          renderCustomNodeElement={(rd3tProps) => (
            <RenderRectSvgNode
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
