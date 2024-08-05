import React from "react";

// const RenderRectSvgNode = ({ nodeDatum, toggleNode, handleNodeClick }) => {
//     return (
//       <g>
//         <rect
//           width="280"
//           height="116"
//           fill="#282728"
//           x="-110"
//           y="-58"
//           rx="5"
//           ry="5"
//           style={{
//             cursor: nodeDatum.access === 0 ? "not-allowed" : "pointer",
//           }}
//           onClick={() => {
//             handleNodeClick(nodeDatum);
//           }}
//         />
//         <foreignObject
//           x="-110"
//           y="-49"
//           width="100"
//           height="100"
//           style={{
//             cursor: nodeDatum.access === 0 ? "not-allowed" : "pointer",
//           }}
//           onClick={() => handleNodeClick(nodeDatum)}
//         >
//           <div className="image-bg" xmlns="http://www.w3.org/1999/xhtml"></div>
//         </foreignObject>
  
//         {nodeDatum.img && (
//           <image
//             onClick={() => handleNodeClick(nodeDatum)}
//             href={`${nodeDatum.img}?v=${new Date().getTime()}`} // Replace with the actual path to your image
//             // href={pocky}
//             width="103" // Set the desired width of the image
//             height="90" // Set the desired height of the image
//             x="-100" // Adjust the X position as needed
//             y="-44" // Adjust the Y position as needed
//             // stroke="black"
//             // strokeWidth={3}
//             alt="logo"
//             loading="eager"
//             style={{
//               cursor: nodeDatum.access === 0 ? "not-allowed" : "pointer",
//             }}
//           />
//         )}
//         <foreignObject
//           x="20"
//           y="-50"
//           width="118"
//           height="100"
//           style={{
//             cursor: nodeDatum.access === 0 ? "not-allowed" : "pointer",
//           }}
//           onClick={() => handleNodeClick(nodeDatum)}
//         >
//           <div
//             xmlns="http://www.w3.org/1999/xhtml"
//             style={{
//               wordWrap: "break-word",
//               fontWeight: "bold",
//               color: "white",
//               width: "100%",
//               height: "100%",
//               // border: "1px solid red",
//               display: "flex",
//               justifyContent: "flex-start",
//               alignItems: "center",
//               cursor: nodeDatum.access === 0 ? "not-allowed" : "pointer",
//             }}
//           >
//             <div
//               xmlns="http://www.w3.org/1999/xhtml"
//               style={{
//                 // wordWrap: "break-word",
//                 fontWeight: "bold",
//                 color: "white",
//                 width: "100%",
//                 // border: "1px solid yellow",
//                 // textAlign: "center",
//                 cursor: nodeDatum.access === 0 ? "not-allowed" : "pointer",
//               }}
//             >
//               {nodeDatum.name}
//             </div>
//           </div>
//         </foreignObject>
//         <line
//           onClick={() => handleNodeClick(nodeDatum)}
//           x1="10"
//           y1="-45"
//           x2="10"
//           y2="45"
//           stroke="yellow"
//           strokeWidth="1px"
//           style={{
//             cursor: nodeDatum.access === 0 ? "not-allowed" : "pointer",
//           }}
//         />
  
//         {nodeDatum.children?.length > 0 && (
//           <>
//             <circle
//               onClick={toggleNode}
//               cx="150"
//               cy="-1"
//               r="11"
//               stroke="black"
//               fill="black"
//             ></circle>
//             {/* <text
//               style={{ fontSize: "1.3rem" }}
//               onClick={toggleNode}
//               fill="white"
//               strokeWidth="0"
//               x="150"
//               y="0"
//               textAnchor="middle"
//               alignmentBaseline="middle"
//             >
//               {nodeDatum.__rd3t.collapsed ? "+" : "-"}
//             </text> */}
//             {nodeDatum.__rd3t.collapsed ? (
//               <svg
//                 width="21"
//                 height="21"
//                 x="140"
//                 y="-11"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//                 onClick={toggleNode}
//               >
//                 <line
//                   onClick={toggleNode}
//                   x1="12"
//                   y1="5"
//                   x2="12"
//                   y2="19"
//                   stroke="white"
//                   stroke-width="2"
//                 />
//                 <line
//                   onClick={toggleNode}
//                   x1="5"
//                   y1="12"
//                   x2="19"
//                   y2="12"
//                   stroke="white"
//                   stroke-width="2"
//                 />
//               </svg>
//             ) : (
//               <svg
//                 onClick={toggleNode}
//                 width="21"
//                 height="21"
//                 x="140"
//                 y="-11"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <line
//                   onClick={toggleNode}
//                   x1="5"
//                   y1="12"
//                   x2="19"
//                   y2="12"
//                   stroke="white"
//                   stroke-width="2"
//                 />
//               </svg>
//             )}
//           </>
//         )}
//       </g>
//     );
//   };
const RenderRectSvgNode = ({ nodeDatum, toggleNode, handleNodeClick }) => {
    return (
      <g>
      
        <rect
          width="180"
          height="76"
          fill="#282728"
          x="-90"
          y="-38"
          rx="5"
          ry="5"
          stroke="#d6ff41" // Border color
          strokeWidth="1" // Border width
          filter="url(#f1)" // Apply the shadow filter
          style={{
            cursor: nodeDatum.access === 0 ? "not-allowed" : "pointer",
          }}
          onClick={() => {
            handleNodeClick(nodeDatum);
          }}
        />
        <foreignObject
          x="-90"
          y="-32"
          width="60"
          height="60"
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
            width="75"
            height="75"
            x="-90"
            y="-38"
            alt="logo"
            loading="eager"
            style={{
              cursor: nodeDatum.access === 0 ? "not-allowed" : "pointer",
            }}
          />
        )}
        <foreignObject
          x="-30"
          y="-32"
          width="120"
          height="60"
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
              justifyContent: "center", // Center the text horizontally
              alignItems: "center", // Center the text vertically
              cursor: nodeDatum.access === 0 ? "not-allowed" : "pointer",
              fontSize: "16px", // Reduced font size
              textAlign: "center", // Center the text
            }}
          >
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                fontWeight: "bold",
                color: "white",
                width: "100%",
                cursor: nodeDatum.access === 0 ? "not-allowed" : "pointer",
                fontSize: "14px", // Reduced font size
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
              cx="75" // Shifted circle further to the left
              cy="-1"
              r="8" // Reduced circle radius
              stroke="white" // Border color
              strokeWidth="1" // Border width
              fill="black"
            ></circle>
            {nodeDatum.__rd3t.collapsed ? (
              <svg
                width="14"
                height="14"
                x="68" // Adjusted to keep the plus sign centered
                y="-8" // Adjusted to keep the plus sign centered
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
                width="16"
                height="16"
                x="67" // Adjusted to keep the minus sign centered
                y="-8" // Adjusted to keep the minus sign centered
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

export default RenderRectSvgNode;