import React from "react";
import { NavLink } from "react-router-dom";

import routes from "../routes";
import SvgIcon from "./SvgIcon"

import avatar_uri from "../../public/assets/react-logo.png";

export default function Sidebar(props) {
  return (
    <aside
      className="mx-5 my-3 mt-0 rounded w-56"
      style={{
        background: "linear-gradient(0deg, #3358f4 0%, #1d8cf8 100%)"
      }}
    >
      <div className="flex flex-col items-center">
        <h2 className="text-lg text-white uppercase self-start mt-4 mb-3 ml-6">
          <img
            src={avatar_uri}
            className="w-8 h-8 rounded-full inline-block mr-3 mb-px"
          />
          {props.title}
        </h2>
        <div className="w-5/6 h-px mb-4 bg-white opacity-50" />
      </div>
      <ul className="list-disc pl-6">
        {routes.map((prop, key) => {
          return (
            <li key={key} className="list-none">
              <NavLink
                exact
                to={prop.path}
                className="flex flex-row items-center text-center text-white py-5"
              >
                {/* <img
                  className="w-10 h-10 bg-contain bg-no-repeat rounded-full"
                  style={{
                    backgroundImage: `url('${prop.icon}')`
                  }}
                /> */}
                {/* <svg className="svg-icon w-6 h-6 current-fill text-white" viewBox="0 0 20 20">
                  <path fill="rgba(255, 255, 255, 0.8)"  d="M4.68,13.716v-0.169H4.554C4.592,13.605,4.639,13.658,4.68,13.716z M11.931,6.465
	c-0.307-0.087-0.623,0.106-0.706,0.432l-1.389,5.484c-0.901,0.084-1.609,0.833-1.609,1.757c0,0.979,0.793,1.773,1.773,1.773
	c0.979,0,1.773-0.794,1.773-1.773c0-0.624-0.324-1.171-0.812-1.486l1.377-5.439C12.422,6.887,12.239,6.552,11.931,6.465z
	M10.591,14.729H9.408v-1.182h1.183V14.729z M15.32,13.716c0.04-0.058,0.087-0.11,0.126-0.169H15.32V13.716z M10,3.497
	c-3.592,0-6.503,2.911-6.503,6.503H4.68c0-2.938,2.382-5.32,5.32-5.32s5.32,2.382,5.32,5.32h1.182
	C16.502,6.408,13.591,3.497,10,3.497z M10,0.542c-5.224,0-9.458,4.234-9.458,9.458c0,5.224,4.234,9.458,9.458,9.458
	c5.224,0,9.458-4.234,9.458-9.458C19.458,4.776,15.224,0.542,10,0.542z M15.32,16.335v0.167h-0.212
	c-1.407,1.107-3.179,1.773-5.108,1.773c-1.93,0-3.701-0.666-5.108-1.773H4.68v-0.167C2.874,14.816,1.724,12.543,1.724,10
	c0-4.571,3.706-8.276,8.276-8.276c4.57,0,8.275,3.706,8.275,8.276C18.275,12.543,17.126,14.816,15.32,16.335z"></path>
                </svg> */}
                <SvgIcon d={prop.svg_path} fill={"#fff"} width={"1.1rem"} viewBox={prop.svg_viewbox} className="ml-2 mr-4 opacity-75"/>
                <span className="uppercase text tracking-wide">{prop.name}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
