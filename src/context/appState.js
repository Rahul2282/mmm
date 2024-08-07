import React,{useState} from 'react'
import appContext from './appContext';
import {Link,useNavigate} from "react-router-dom";
function AppState(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [DetailsId, setDetailsId] = useState("");
    const [Details, setDetails] = useState({});
  
    
  return (
    <appContext.Provider value={{isOpen,setIsOpen}}>
        {props.children}
        </appContext.Provider>

  )
}


export default AppState