import FormSatellite from "../form/form";
import { useState, useEffect, useContext } from "react";
import { DataContext } from "../../context/dataContext.js";
import useForm from "./../form/UseForm";
import {
  SidebarWrap,
  Sidebar,
  FormSatelliteWrap,
  Warning,
  SatelliteLi,
  SatelliteUl,
  ButtonsWrap,
  Button,
} from "./sidebar.style.jsx";

function SideBar() {
  const [isDelete, setIsDelete] = useState();
  const { api, isClicked, satelliteRun, setState } = useContext(DataContext);
  const { handleSubmit, status, message } = useForm(isDelete);

  const handleDelete = (e) => {
    e.preventDefault();
    handleSubmit(e);
    isDelete ? setIsDelete() : setIsDelete(e);
  };

  const handleStop = () => {
    !satelliteRun.stop
      ? setState({ ...satelliteRun, satelliteRun: { stop: true } })
      : setState({ ...satelliteRun, satelliteRun: { stop: false } });
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
        <Button
          id={isDelete.target.id}
          name={"delete"}
          onClick={(isDelete) => handleDelete(isDelete)}
        >
          Continue
        </Button>
        <Button
          onClick={(e) => {
            warningModal(e);
          }}
        >
          Cancel
        </Button>
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
                <strong>Lng: </strong>
                {item.longitude}
              </p>
              <p>
                <strong>Lat: </strong>
                {item.latitude}
              </p>
              <ButtonsWrap>
                <Button id={item.id} onClick={(e) => showEditForm(e)}>
                  Edit
                </Button>
                <Button
                  name={item.name}
                  id={item.id}
                  onClick={(e) => warningModal(e)}
                >
                  Delete
                </Button>
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
        <Button
          onClick={(e) => {
            showEditForm(e);
          }}
        >
          Add Satellite
        </Button>
        <Button
          onClick={() => {
            handleStop();
          }}
        >
          <strong>{!satelliteRun.stop ? "PAUSE" : "RESUME"}</strong>
        </Button>
        <SatellitesComponent />
      </Sidebar>
    </SidebarWrap>
  );
}

export default SideBar;
