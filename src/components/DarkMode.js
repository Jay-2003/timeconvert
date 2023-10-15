import React from "react";
import { ReactComponent as Sun } from "../assets/Sun.svg";
import { ReactComponent as Moon } from "../assets/Moon.svg";
import "../styles/DarkModeStyle.css";

const DarkMode = ({setDarkMode, setLightMode}) => {

    const selectedTheme = localStorage.getItem("theme");

    if(selectedTheme === "dark") {
        setDarkMode();
    } else {
        setLightMode();
    }


    const toggleDarkMode = (e) => {
        if (e.target.checked) {
            setDarkMode();
        } else {
            setLightMode();
        }
    };

    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onClick={toggleDarkMode}
                defaultChecked={selectedTheme === "dark"}
            />
            <label className='dark_mode_label' for='darkmode-toggle'>
                <Sun />
                <Moon />
            </label>
        </div>
    );
};

export default DarkMode;
