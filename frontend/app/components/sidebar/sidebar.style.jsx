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