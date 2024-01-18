import NewSatellite from "../form/form";
import { styled } from "styled-components";

const Sidebar = styled.div`
  position: absolute;
  z-index: 100;
  left: 0;
  height: 100%;
  max-width: 320px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  padding: 0 24px;
  font-size: 13px;
  line-height: 2;
  color: #6b6b76;
  text-transform: uppercase;
  outline: none;
`;
const Warning = styled.div`
  position: relative;
  display: none;
  z-index: 999;
`;

function SideBar() {
  const satellite = {
    name: "NewYork",
  }; // temp satellitename var
  const warningText = `Are you sure you want to delete the satellite - ${satellite.name} ?`;
  return (
    <>
      <Sidebar>
        <h3>Sidebar</h3>
        <button>Add Satellite</button>
        <NewSatellite />
        <h3>List of Satellites:</h3>
        <div>
          Satellite_Name <button>Edit</button> <button>Delete</button>
        </div>
      </Sidebar>
      <Warning>{warningText}</Warning>
    </>
  );
}

export default SideBar;
