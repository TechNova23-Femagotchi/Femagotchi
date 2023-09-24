import React from "react";
import '../popoff.css'



interface PopUpProps{
    children: React.ReactNode;
    trigger: boolean;
    setTrigger: (arg0: boolean) => void;
}

function PopUp(props:PopUpProps){
    return (props.trigger)?(
        <div className="pop-up">
            <div className="popup-inner">
                
                {props.children}
            </div>
        </div>
    ) : "";
}

export default PopUp