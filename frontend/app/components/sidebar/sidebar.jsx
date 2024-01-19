import NewSatellite from "../form/form";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  redirect,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import { styled } from "styled-components";
import { useState } from "react";

const Sidebar = styled.div`
  position: absolute;
  z-index: 100;
  left: 0;
  height: 100%;
  width: 250px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  padding: 0 24px;
  font-size: 13px;
  line-height: 2;
  color: #6b6b76;
  text-transform: uppercase;
  outline: none;
  display: flex;
  flex-flow: column;
`;
const Warning = styled.div`
  /* position: absolute; */
  padding: 20px;
  z-index: 999;
  background-color: white;
  border: 1px black solid;
`;

const SatelliteLi = styled.li`
  background-color: lightgrey;
  padding: 20px;
  margin-bottom: 20px;
`;

const SatellitesComponentWrapper = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  ul {
    list-style-type: none;
  }
  ul {
    padding-left: 0;
  }
`;

function SideBar({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const showModalAdd = (e) => {
    setIsOpen((isOpen) => !isOpen);
  };
  const warningModal = (e, item) => {
    setIsClicked((isClicked) => !isClicked);
  };

  const WarningWrap = () => {
    return (
      <Warning>
        <div>Are you sure you want to delete the satellite XXX ?</div>
        <button>Continue</button>
        <button
          onClick={(e) => {
            warningModal(e);
          }}
        >
          Cancel
        </button>
      </Warning>
    );
  };

  const satellitesComponent = data.api.map((item, index) => (
    <SatelliteLi key={index}>
      <p>{item.name}</p>
      {/* <p>Coords: {item.latitude}/{item.longitude}</p> */}
      {/* <p>Owner: {item.owner}</p> */}
      <button>Edit</button>
      <button
        onClick={(e) => {
          warningModal(e, item);
        }}
      >
        Delete
      </button>
    </SatelliteLi>
  ));

  return (
    <>
      <Sidebar>
        <h3>Sidebar</h3>
        <button
          onClick={(e) => {
            showModalAdd(e);
          }}
        >
          Add Satellite
        </button>
        {isOpen && <NewSatellite data={data} />}
        <h3>List of Satellites:</h3>

        <SatellitesComponentWrapper>
          {/* {!isClicked && <ul>{satellitesComponent}</ul>} */}
          <ul>{satellitesComponent}</ul>
        </SatellitesComponentWrapper>
      </Sidebar>
    </>
  );
}

export default SideBar;
