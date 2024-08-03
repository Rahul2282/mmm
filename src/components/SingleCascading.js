import React, { useState, useEffect, useRef } from "react";
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';


const Cascader = ({
  data,
  searchValue,
  setSearchValue,
  selectedPath,
  setSelectedPath,
  setIdList,
  pathName,
  level = 0,
  st=10000,
  setGetBrand
}) => {
  const expandedCategoryRef = useRef(null);
  const timerRef = useRef(null);
  const rootRef = useRef(null);
  const child=useRef(null);
  const span=useRef(null);
  const [isBottom,setIsBottom]=useState(false);
  const [flag,setFlag]=useState(false);
  const [style, setStyle] = useState({});
  const[height,setHeight]=useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedExpandIcon, setSelectedExpandIcon] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const[hit,setHit]=useState(false);
  

  const handleCategoryButtonClick = (categoryId, category,event) => {
    console.log("categoryy ",category);

    if(category.access==1)
        {setGetBrand(category)

        
    
    
    console.log("categoryID: ",categoryId);
    
    event.stopPropagation();
    setSelectedExpandIcon((prevCategory) =>
      prevCategory === categoryId ? null : categoryId
    );
    
    // expandedCategoryRef.current = event.currentTarget;
    const pathSegments = categoryId.split("-");
    const newPath = pathSegments.map((segment, index) =>
      pathSegments.slice(0, index + 1).join("-")
    );

    setIdList(newPath);
    setSearchValue(pathName);

   


    if (categoryId !== selectedCategory) {
      setSelectedCategory(null);
      setSelectedExpandIcon(null);
      setSelectedPath(newPath);
      setSelectedCategory(categoryId);
      setSelectedExpandIcon(categoryId);
    } else {
      setSelectedExpandIcon(null);
      setSelectedPath((prevSelectedPath) => {
        if (prevSelectedPath.length >= newPath.length) {
          return newPath.slice(0, pathSegments.length);
        }
        return newPath;
      });
      setSelectedCategory((prevSelectedCategory) => {
        const prevPathSegments = prevSelectedCategory
          ? prevSelectedCategory.split("-")
          : [];
        if (prevPathSegments.length >= pathSegments.length) {
          return pathSegments.join("-");
        }
        return prevSelectedCategory;
      });
    }
}
  };

  const handleExpandIconHover = (categoryId, event) => {

    

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setHoveredCategory(categoryId);
    setSelectedExpandIcon(categoryId);
    expandedCategoryRef.current = event.currentTarget;

    setSelectedCategory(categoryId);
  };

  const handleExpandIconLeave = (event) => {
    timerRef.current = setTimeout(() => {
        // setFlag(false)
      setHoveredCategory(null);
      setSelectedExpandIcon(null);
      setSelectedCategory(null);
    //   console.log(event.target?.parentNode)
    //   rootRef.current=event.target.parentNode;
    }, 0);
  };


  useEffect(() => {
    
    const checkPosition = () => {
      if (rootRef.current) {

        console.log("maxHeight ",rootRef.current.getBoundingClientRect().bottom)
        
        const store=rootRef.current;
        const bottom = store.getBoundingClientRect().bottom;
        // console.log("root ", rootRef.current);
        // console.log("bottom position", bottom);
        console.log(store,"  ",child.current)
        const childDivs = document.querySelectorAll('.child');
        console.log("childDivs ",childDivs,"    ",childDivs.length>0? childDivs[childDivs.length-1]:null,"  ", childDivs[childDivs.length-1]?.getBoundingClientRect().bottom)
        console.log("st2 ",st);
        {
            
            console.log(childDivs)
            
            // if(level==1)
            // st=rootRef.current.getBoundingClientRect().bottom;

            console.log("hieghtatlevel ",st);
           console.log("st at each level ",level,"  ",st);
           if(level==1)
            {
              if(height==0){
              setHeight(childDivs.length>0? childDivs[childDivs.length-1].getBoundingClientRect().bottom:st);
              
              console.log("asfoihasifjhask;jfhasjdhf",childDivs,"  ",childDivs[childDivs.length-1].getBoundingClientRect().bottom, "  ",level) ;
              }
            }
            childDivs.forEach((div) => {
              

                console.log("st value before compare ",st," ",div.getBoundingClientRect().bottom," ",div,"  ",height,"    ",level,
                childDivs.length>0? childDivs[childDivs.length-1]:null
              )
                if(div.getBoundingClientRect().bottom>st)
                {
                    console.log(st,"  ",div);

                    console.log(div.getBoundingClientRect().bottom);

                   
                    
                    div.style.top='auto';
                    div.style.bottom='0px';
                    
                    // div.style.border = '2px solid white'; // Example style change
                    // div.style.backgroundColor = 'yellow'; // Example style change
                }
                let count=level+1;
                if(div.getBoundingClientRect().right>window.innerWidth)
                    {
                      console.log("top ",div.getBoundingClientRect().bottom-div.getBoundingClientRect().top-10);
                      
                      div.style.left = '';
                      div.style.right = `98%`;
                      div.style.bottom = ``;
                      div.style.top = `${div.getBoundingClientRect().bottom-div.getBoundingClientRect().top-10}px`;
                      
                      div.style.zIndex="1000";
                      
                      // div.style.backgroundColor='yellow';
                      // div.style.color='green'
                      rootRef.current.style.backgroundColor='gray';
                      console.log("right touch ",div);
                      setHit(true);
                      
                    }
               
              });
             
                
        //   rootRef.current.style.backgroundColor = 'red';
          console.log(store,"  ",child.current)
          
          
        //   rootRef.current.style.position='absolute';
        //   rootRef.current.style.bottom = '0px';
          
        setFlag(true);
        }
      }
    };
    console.log(rootRef.current,"   ",child.current);
    // if(rootRef.current && child.current)
    checkPosition(); // Initial check
    
  }, [rootRef.current,child.current,span.current]);


 


  




  
  
  return (
    <div style={{ position: "relative" }} >
      <div
        ref={rootRef}
        style={{
           
          padding: "8px 0",
          backgroundColor: `${localStorage.getItem('ColorCode')}`,
          overflowY: "auto",
        //   borderRadius: "8px",
          whiteSpace: "nowrap",
          minWidth: "80px",
          
        }}
        className="root"
        
        
      >
        { 
        data?.map((category) => (
          <div key={category.id} style={{ marginBottom: "4px", width: "100%" }}>
            <div style={{ display: "flex", width: "100%" }}>
              <div
                style={{
                  color: selectedPath.includes(category.id) ? "black" : "white",
                  padding: "0 10px",
                  fontSize: "14px",
                  cursor: "pointer",
                  backgroundColor: selectedPath.includes(category.id)
                    ? "#D6FF41"
                    : selectedExpandIcon === category.id
                    ? `${localStorage.getItem('ColorTheme')}`
                    : hit==false?`${localStorage.getItem('ColorTheme')}`:'grey',
                  display: "flex",
                  width: "100%",
                  cursor: category.access === 0 ? 'not-allowed' : 'pointer',
                }}
                
                onClick={(event) => handleCategoryButtonClick(category.id, category,event)}
                onMouseLeave={handleExpandIconLeave}
              >
                <span style={{ flexGrow: 1, textAlign: "left" }}>
                  {category.name}
                </span>
                {category?.children?.length>0 && (
                  <span ref={span}
                    style={{
                      marginLeft: "4px",
                      cursor: "pointer",
                      textAlign: "right",
                      color: selectedPath.includes(category.id)
                        ? "black"
                        : "#D6FF41",
                      fontWeight: "bold",
                    }}
                    onMouseEnter={(e) => handleExpandIconHover(category.id, e)}
                    
                  >
                    {selectedExpandIcon === category.id ? <KeyboardArrowLeftOutlinedIcon/> : <KeyboardArrowRightOutlinedIcon/>}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {selectedExpandIcon &&
        data?.find((cat) => cat.id === selectedExpandIcon)?.children?.length>0 &&
        expandedCategoryRef.current 
        && (
            
              
              <div
                ref={child} 
                onMouseEnter={(e) => handleExpandIconHover(selectedExpandIcon, e)}
                onMouseLeave={handleExpandIconLeave}
                
                style={{
                  position: "absolute",
                  // background: "white",
                  left: "100%",
                  
                
                
                  top:expandedCategoryRef.current?.offsetTop,
                //   top: level === 0 ? `${expandedCategoryRef.current?.offsetTop}px` : `0px`,
                //   ...( !flag
                //     ? { top: level === 0 ? `${expandedCategoryRef.current?.offsetTop}px` : `${expandedCategoryRef.current?.offsetTop}px` }
                //     : { bottom: "0px" }),
                  zIndex: 1000 + level,
                }}
                className="child"
              >
                <Cascader
                  data={data.find((cat) => cat.id === selectedExpandIcon).children}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  selectedPath={selectedPath}
                  setSelectedPath={setSelectedPath}
                  setIdList={setIdList}
                  pathName={pathName}
                  level={level + 1}
                  st={level==1?height:st}
                  setGetBrand={setGetBrand}

                  
                  
                  
                />
              </div>
            
          )}
          
    </div>
  );
};

const CascaderWrapper = ({ data, match,setGetBrand }) => {
  const [searchValue, setSearchValue] = useState("");
  const [isCascaderVisible, setIsCascaderVisible] = useState(false);
  const [selectedPath, setSelectedPath] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const cascaderRef = useRef(null);
  const searchBarRef = useRef(null);
  const [idList, setIdList] = useState([]);
  const [nameList, setNameList] = useState([]);
  const [pathName, setPathName] = useState("");

  function flattenDataToObject(data) {
    let result = {};

    function flatten(item) {
      result[item.id] = item.name;
      if (item.children) {
        item.children.forEach(flatten);
      }
    }

    data?.forEach(flatten);
    return result;
  }

  const flattenedData = flattenDataToObject(data);

  function getTeaList(idList, flattenedData) {
    return idList.map((key) => flattenedData[key]);
  }

  useEffect(() => {
    const result = getTeaList(idList, flattenedData);
    setNameList(result);
  }, [idList]);

  useEffect(() => {
    if (nameList) {
      const names = nameList.join(" / ");
      setPathName(names);
      setSearchValue(names);
    } else {
      setPathName("");
      setSearchValue("");
    }
  }, [nameList]);

  useEffect(() => {
    const pathSegments = match.split("-");
    const newPath = pathSegments.map((segment, index) =>
      pathSegments.slice(0, index + 1).join("-")
    );
    setSelectedPath(newPath);
    const result = getTeaList(newPath, flattenedData);
    setNameList(result);

    if (nameList) {
      const names = nameList.join(" / ");
      setPathName(names);
      setSearchValue(names);
    } else {
      setPathName("");
      setSearchValue("");
    }
  }, []);

  const toggleCascaderVisibility = () => {
    setIsCascaderVisible(!isCascaderVisible);
  };

  const handleSearchInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchValue(searchTerm);
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      setSearchValue("");
      setIsDropDownVisible(false);
    } else {
      const matchingResults = findMatchingResults(data, searchTerm);
      setSearchResults(matchingResults);
      setIsDropDownVisible(true);
    }
  };

  const handleSearchResultClick = (result) => {

    
    console.log("results ",result);
    const findCategoryById = (data, id) => {
        for (let category of data) {
            if(category.id===id && category.access==0)
                    return null;
          if (category.id === id && category.access==1) {
            return category;
            
          }
          if (category.children) {
            const found = findCategoryById(category.children, id);
            if (found) {
              return found;
            }
          }
        }
        return null;
      };
     
      const fullCategory = findCategoryById(data, result.id);
      console.log("fullCategory ",fullCategory);
      if(fullCategory!=null){
      setGetBrand(fullCategory);
      

    console.log("resultss ",result);
    const pathSegments = [];
    const idSegments = result.id.trim().toLowerCase().split("-");
    for (let i = idSegments.length; i > 0; i--) {
      pathSegments.push(idSegments.slice(0, i).join("-"));
    }

    result.path.forEach((segment) => {
      const segments = segment.trim().toLowerCase().split("-");
      for (let i = segments.length; i > 0; i--) {
        pathSegments.push(segments.slice(0, i).join("-"));
      }
    });

    const n = pathSegments.length / 2;
    pathSegments.splice(-n);

    const pathName = result.path.join(" / ");
    setSearchValue(pathName);
    setSelectedPath(pathSegments);
    setIsDropDownVisible(false);
}
  };

  const findMatchingResults = (data, searchTerm) => {
    const matchingResults = [];
    const traverse = (children, path) => {
      children.forEach((item) => {
        const currentPath = path ? `${path} / ${item.name}` : item.name;
        if (item.access==1 && item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          matchingResults.push({ path: currentPath.split(" / "), id: item.id });
        }
        if (item.children) {
          traverse(item.children, currentPath);
        }
      });
    };
    traverse(data, "");
    return matchingResults;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropDownVisible(false);
      }
      if (cascaderRef.current && !cascaderRef.current.contains(event.target)) {
        if (
          !searchBarRef.current ||
          !searchBarRef.current.contains(event.target)
        ) {
          if (!event.target.classList.contains("cascader-toggle-button")) {
            setIsCascaderVisible(false);
          }
        }
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <div ref={cascaderRef}>
        <div style={{ display: "flex", alignchildren: "center" }}>
          <div style={{ position: "relative", display: "flex"  }}>
            <input
              ref={searchBarRef}
              id="search-bar"
              type="text"
              value={searchValue}
              onChange={handleSearchInputChange}
              placeholder='Select'
              autocomplete="off"
              style={{
                flexGrow: 1,
                position: "relative",
                border: "1px solid #3E5056",
                borderRadius: "4px",
                autocomplete:"off",
                backgroundColor: `${localStorage.getItem('ColorCode')}`,
                color: "white",
                fontSize:'12px',
                width:'17rem',
                padding:'4px',
                outline: "none"
              }}
            />
            <button
              onClick={toggleCascaderVisibility}
              className="cascader-toggle-button"
              style={{
                position: "absolute",
                right: "0px",
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
                fontSize:'17px'
              }}
            >
              {isCascaderVisible ? <KeyboardArrowUpOutlinedIcon/> :<KeyboardArrowDownOutlinedIcon/>}
            </button>
            {searchValue && searchResults.length > 0 && isDropDownVisible ? (
              <div
                ref={dropdownRef}
                style={{
                  position: "absolute",
                  top: "calc(100% + 4px)",
                  left: 0,
                  backgroundColor: "#1C2427",
                  border: "1px solid #3E5056",
                  borderRadius: "4px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  zIndex: 1000,
                  width: "100%",
                  maxHeight: "200px",
                  overflowY: "auto",
                  fontSize:'small',
                  color: "white",
                }}
              >
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "8px",
                      cursor: 'pointer'
                    }}
                    onClick={() => handleSearchResultClick(result)}
                  >
                    {result.path.map((part, index) => {
                      const regex = new RegExp(`(${searchValue})`, "gi");
                      const parts = part.split(regex);
                      return (
                        <span key={index}>
                          {parts.map((p, i) => (
                            <span
                              key={i}
                              style={{
                                color:
                                  p.toLowerCase() === searchValue.toLowerCase()
                                    ? "#D6FF41"
                                    : "white",
                                fontWeight:
                                  p.toLowerCase() === searchValue.toLowerCase()
                                    ? "bold"
                                    : "normal",
                              }}
                            >
                              {p}
                            </span>
                          ))}
                          {index < result.path.length - 1 && " / "}
                        </span>
                      );
                    })}
                  </div>
                ))}
              </div>
            ) : searchValue &&
              searchResults.length === 0 &&
              isDropDownVisible ? (
              <div
                ref={dropdownRef}
                style={{
                  position: "absolute",
                  top: "calc(100% + 4px)",
                  left: 0,
                  backgroundColor: "#1C2427",
                  border: "1px solid #3E5056",
                  borderRadius: "4px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  zIndex: 10,
                  width: "100%",
                  maxHeight: "100px",
                  overflowY: "auto",
                  color: "white",
                  fontSize:"12px"
                }}
              >
                No data
              </div>
            ) : null}
          </div>
        </div>

        {isCascaderVisible && (
          <div
            ref={cascaderRef}
            style={{
              position: "absolute",
              backgroundColor: "#1C2427",
            //   borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              zIndex: 1000,
              
              
            }}
          >
            <Cascader
              data={data}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              selectedPath={selectedPath}
              setSelectedPath={setSelectedPath}
              setIdList={setIdList}
              pathName={pathName}
              setGetBrand={setGetBrand}
            />
          </div>
        )}
      </div>
      
    </div>
  );
};

export default CascaderWrapper;
