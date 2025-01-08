import React from "react";
import { getLocalStorage } from "../../utils/session";
import { useHandleLocation } from "../../utils/handleLocation";
import "../../styles/common/header/header_1.css";

const Header1 = ({ title }) => {
    const image = getLocalStorage('profile');
    console.log(`image : ${image}`);

    const handleProfile = () => {
        handleLocation('/profile');
      }

  return (
    <>
    <header>
        <div class="head">
                <div class="title">
                    <h4>{title}</h4>
                </div>
                <div class="avatar">
                    <img src={image} alt="profile" onClick={handleProfile}/>
                </div>
        </div>
    </header> 
    </>
    )
};

export default Header1;
