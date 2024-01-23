import FormSatellite from "../form/form";
import { useState, useContext } from "react";
import { DataContext } from "../../context/dataContext.js";

import { styled } from "styled-components";
import useForm from "./../form/UseForm";
import {
  SidebarWrap,
  Sidebar,
  FormSatelliteWrap,
  Warning,
  SatelliteLi,
  SatelliteUl,
	ButtonsWrap
} from "./sidebar.style.jsx";

function SideBar() {
  const [isDelete, setIsDelete] = useState();
  const { api, isClicked, setState } = useContext(DataContext);
  const { handleSubmit, status, message } = useForm(isDelete);

  const handleDelete = (e) => {
    e.preventDefault();
    handleSubmit(e);
    isDelete ? setIsDelete() : setIsDelete(e);
  };

  const showEditForm = (e) => {
    e.preventDefault();
    isClicked ? setState({ isClicked: false }) : setState({ isClicked: e });
  };

  const warningModal = (e) => {
    e.preventDefault();
    setState({ formAdditionalData: "delete" });
    isDelete ? setIsDelete() : setIsDelete(e);
  };

  const WarningWrap = () => {
    return (
      <Warning>
        <div>
          Are you sure you want to delete the satellite - {isDelete.target.name}{" "}
          ?
        </div>
        <button
          id={isDelete.target.id}
          name={"delete"}
          onClick={(isDelete) => handleDelete(isDelete)}
        >
          Continue
        </button>
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

  const SatellitesComponent = () => {
    return (
      <>
        <h3>List of Satellites:</h3>
        <SatelliteUl>
          {api.map((item, index) => (
            <SatelliteLi key={index}>
              <p>
                <strong>Name: </strong>
                {item.name}
              </p>
              <p>
                <strong>Owner: </strong>
                {item.owner}
              </p>
              <p>
                <strong>Lng:</strong>
                {item.longitude}
              </p>
              <p>
                <strong>Lat:</strong>
                {item.latitude}
              </p>
              <ButtonsWrap>
                <button id={item.id} onClick={(e) => showEditForm(e)}>
                  Edit
                </button>
                <button
                  name={item.name}
                  id={item.id}
                  onClick={(e) => warningModal(e)}
                >
                  Delete
                </button>
              </ButtonsWrap>
            </SatelliteLi>
          ))}
          {isDelete && <WarningWrap />}
        </SatelliteUl>
      </>
    );
  };

  return (
    <SidebarWrap>
      {isClicked && (
        <FormSatelliteWrap>
          <FormSatellite isClicked={isClicked.target.id} />
        </FormSatelliteWrap>
      )}
      <Sidebar>
        <button
          onClick={(e) => {
            showEditForm(e);
          }}
        >
          Add Satellite
        </button>
        <SatellitesComponent />
      </Sidebar>
    </SidebarWrap>
  );
}

export default SideBar;
