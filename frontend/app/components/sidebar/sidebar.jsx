import FormSatellite from "../form/form";
import { styled } from "styled-components";
import { useState, useContext } from "react";
import { DataContext } from "../../context/dataContext.js";
import useForm from "./../form/UseForm";

const SidebarWrap = styled.div`
  color: #6b6b76;
  text-transform: uppercase;
`;
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
const FormSatelliteWrap = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  z-index: 999;
  background-color: white;
  border: 1px black solid;
  border-radius: 10px;
`;
const Warning = styled.div`
  position: absolute;
  top: 0;
  margin: 100% 0;
  padding: 20px;
  z-index: 999;
  background-color: white;
  border: 1px black solid;
  border-radius: 10px;
`;
const SatelliteLi = styled.li`
  background-color: lightgrey;
  padding: 20px;
  margin-bottom: 20px;
`;
const SatelliteUl = styled.ul`
  overflow-x: hidden;
  overflow-y: auto;
  list-style-type: none;
  padding-left: 0;
`;

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
              <p>{item.name}</p>
              {/* <p>Coords: {item.latitude}/{item.longitude}</p> */}
              {/* <p>Owner: {item.owner}</p> */}
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
        <h3>Sidebar</h3>
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
