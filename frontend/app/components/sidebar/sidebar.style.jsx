import { styled } from "styled-components";

export const SidebarWrap = styled.div`
  color: #6b6b76;
  text-transform: uppercase;
`;
export const Sidebar = styled.div`
  position: absolute;
  z-index: 100;
  left: 0;
  height: calc(100% - 20px);
  width: 250px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  padding: 10px 24px;
  font-size: 12px;
  line-height: 2;
  color: #6b6b76;
  outline: none;
  display: flex;
  flex-flow: column;
  p {
    margin: 0;
  }
`;
export const FormSatelliteWrap = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  z-index: 999;
  background-color: white;
  border: 1px #aaa solid;
  border-radius: 10px;
`;
export const Warning = styled.div`
  position: absolute;
  top: 0;
  margin: 100% 0;
  padding: 20px;
  z-index: 999;
  background-color: white;
  border: 1px black solid;
  border-radius: 10px;
`;
export const SatelliteLi = styled.li`
  background-color: lightgrey;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
`;
export const SatelliteUl = styled.ul`
  overflow-x: hidden;
  overflow-y: auto;
  list-style-type: none;
  padding-left: 0;
`;
export const ButtonsWrap = styled.div`
  padding: 10px 0;
`;

export const Button = styled.button`
  padding: 10px 10px;
`;
