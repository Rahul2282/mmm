import React,{useState,useRef} from 'react'
import appContext from './appContext';
import {Link,useNavigate} from "react-router-dom";
function AppState(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [DetailsId, setDetailsId] = useState("");
    const [Details, setDetails] = useState({});
    const node=useRef(null);
  
    
  return (
    <appContext.Provider value={{isOpen,setIsOpen,DetailsId, setDetailsId,Details, setDetails,node}}>
        {props.children}
        </appContext.Provider>

  )
}


export default AppState