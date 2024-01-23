import { Form } from "@remix-run/react";
import useForm from "./UseForm";
import { useContext } from "react";
import { DataContext } from "../../context/dataContext.js";
import { styled } from "styled-components";
import { ButtonsWrap } from "../sidebar/sidebar.style.jsx";

const FromWrapper = styled.div`
  label {
    display: block;
    padding: 10px 0;
  }
`;

export default function FormSatellite({ isClicked }) {
  const { formEndPoint, setState } = useContext(DataContext);

  const handleMethod = () => {
    setState({ formAdditionalData: isClicked ? "put" : "post" });
  };

  const { handleSubmit, status, message } = useForm();
  const switchText = isClicked ? "Update" : "Add a new";
  return (
    <FromWrapper>
      <h2>{switchText} satellite</h2>
      <Form action={formEndPoint} onSubmit={handleSubmit}>
        <label>
          Name: <input type="text" name="name" />
        </label>
        <label>
          Owner: <input type="text" name="owner" />
        </label>
        <label>
          Longitude: <input type="number" step="0.00001" name="longitude" />
        </label>
        <label>
          Latitude: <input type="number" step="0.00001" name="latitude" />
        </label>
        <ButtonsWrap>
          <button type="submit" onClick={handleMethod}>
            {switchText} Sat
          </button>
        </ButtonsWrap>
      </Form>
    </FromWrapper>
  );
}
