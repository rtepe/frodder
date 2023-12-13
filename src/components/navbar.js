import React from "react";
import BookmarkContainer from "./bookmark/bookmark-container";
import logo from "../assets/img/logofrodder.png";
export default function Navbar({ openSite}) {

    return(
        <>
               <div class="navbar-bookmark d-flex justify-content-between">
                    <button className="btn" onClick={()=>openSite("")}>
                        <img src={logo} width="60px"></img>
                    </button>
                    <BookmarkContainer openSite={openSite}></BookmarkContainer>
                </div>
                
        </>
    );
}