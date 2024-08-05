import React, { useRef, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CascaderWrapper from './SingleCascading'; // Assuming this is your custom component
import CustomSelection from './CustomSelect'; // Assuming this is your custom component
import { Link } from 'react-router-dom';
import '../assets/ManualCSS/MySidebar.css'; // Import the CSS file

const MySidebar = (props) => {
  const [state, setState] = useState({ right: false });
  const [AnalyticsTool, setAnalyticsTool] = useState('');
  const DivRef = useRef(null);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const drawerRef = useRef(null);

  const handleClickOutside = (event) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target)) {
      setState({ ...state, right: false });
    }
  };

  

  const handleFilterClick = (e) => {
    // Your filter click logic
  };

  const handleExpandIconHover = (id, e) => {
    // Your expand icon hover logic
  };

  const handleCategoryButtonClick = (id, category, event) => {
    // Your category button click logic
  };

  const handleExpandIconLeave = () => {
    // Your expand icon leave logic
  };

  const SubmitAnalyse = () => {
    // Your submit analyse logic
  };

  const list = (anchor) => (
    <Box
    sx={{ width: 'auto',background:'yellow' ,height:'100%' ,opacity:'1' }}
      role="presentation"
      ref={drawerRef}
      onClick={toggleDrawer('right', false)}
        // onClick={handleClickOutside()}
    //   onKeyDown={toggleDrawer('right', false)}
    >
        <div className={`custom-rightbar-overlay ${state.right ? '' : 'hidden'}`} onClick={() => setState(false)}></div>
      <div className={`custom-right-bar ${state.right ? 'open' : ''}`} ref={DivRef} style={{background:''}}>
        <div className="custom-scrollable" style={{ height: "100%", overflowY: "scroll" }}>
          <div className="custom-row custom-justify-content-center">
            <div className="custom-col-12 custom-text-center">
             
              <img
                src={`${props.Details.img}?v=${new Date().getTime()}`}
                alt=""
                className="custom-image"
              /> 
            </div>
            <div className="custom-col-12 custom-text-center" style={{ marginTop: "1rem" }}>
            <h5 className="h-menu-user-name" >
                  {props.Details.name}
                </h5>
            </div>
            <hr className="custom-hr" />
       </div>
       <div className="custom-pb-4">
       <div className="row pt-1">
                <div className="col-sm-6 b-right text-center">
                  <div
                    className="brand-exp-txt"
                    style={{ display: "flex", flexDirection: "column", gap: 7 }}
                  >
                    <p className="m-0">
                      <u> {props.tag1}</u>
                      {/* <u>{"Aug 2022 - Jul 2023 Spends"}</u> */}
                    </p>
                    <p className="m-0">
                      {props.tag_val1} {props.tag_unit1}
                    </p>
                  </div>
                </div>
                <div className="col-sm-6 text-center">
                  <div
                    className="brand-exp-txt"
                    style={{ display: "flex", flexDirection: "column", gap: 7 }}
                  >
                    <p className="m-0">
                      <u> {props.tag2}</u>
                      {/* <u>{"Aug 2022 - Jul 2023 Spends"}</u> */}
                    </p>
                    <p className="m-0">
                      {/* <img src={Vector} className="p-1" alt="" /> */}
                      {props.tag_val2} {props.tag_unit2}
                    </p>
                  </div>
                </div>
              </div>

              <div className="custom-my-5">
  <div className="custom-form-group custom-row custom-my-0">
    <div className="custom-col-12" ref={props.casRef}>
      <h6>
        <label className="custom-login-label custom-h-menu-label">
          Select or Search Brand
        </label>
      </h6>
      <CascaderWrapper
        data={[props.AllBrands]}
        setGetBrand={props.setGetBrand}
        match={props.Details.id}
      />
    </div>
    <div className="custom-col-12">
      <h6>
        <label className="custom-login-label custom-h-menu-label">
          Select or Search  KPI
        </label>
      </h6>
      {props.getKPI !== "" && props.matchKPI && (
        <CascaderWrapper
          data={props.allKPI}
          setGetBrand={props.setGetKPI}
          match={props.matchKPI}
        />
      )}
    </div>
  </div>
  <div className="custom-form-group custom-row custom-my-0" style={{ border: "none" }}>
    <div className="custom-col-12">
      <h6>
        <label className="custom-login-label custom-h-menu-label">
          Select Analytics Tool
        </label>
      </h6>
      <CustomSelection
        value={'Business'}
        onChange={(e) => props.setAnalyticsTool(e.target.value)}
        options={props.AnalyticsToolAll}
      />
    </div>
  </div>
  <div className="custom-form-group custom-row custom-my-2 custom-text-center">
    <div className="custom-col-12 custom-mt-3">
      <div className="btn btn-info" onClick={SubmitAnalyse}>
        Analyse
      </div>
    </div>
  </div>
</div>

              </div>
              <footer className="custom-footer">
              <div className="custom-py-4">
              {localStorage.getItem("is_superuser") === "1" ? (
                <div className="custom-row custom-py-2">
                  <div className="custom-col-12">
                    <Link to="/users" className="custom-link">
                      <p className="custom-mb-0">
                        <u>User Management</u>
                      </p>
                    </Link>
                  </div>
                </div>
              ) : null}
               <div className="custom-row custom-py-2">
                <div className="custom-col-12">
                  {/* <Link to="" className="custom-link"> */}
                    <p className="custom-mb-0">
                      <u>Theme</u>
                    </p>
                  {/* </Link> */}
                </div>
              </div>

              <div className="custom-row custom-py-2">
                <div className="custom-col-12">
                  {/* <Link to="" className="custom-link" onClick={(e) => e.preventDefault()}> */}
                    <p className="custom-mb-0">
                      <u onClick={() => props.setShowPopup(true)}>Contact Support</u>
                    </p>
                  {/* </Link> */}
                </div>
              </div>

              <div className="custom-row custom-py-2">
                <div className="custom-col-12">
                  {/* <Link to="/logout" className="custom-link"> */}
                    <p className="custom-mb-0">
                      <u>Logout</u>
                    </p>
                  {/* </Link> */}
                </div>
              </div>

                </div>
                </footer>

           
        </div>
      </div>
      <div className="custom-rightbar-overlay"></div>
    </Box>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default MySidebar;
