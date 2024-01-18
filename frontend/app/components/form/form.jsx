import { Form } from "@remix-run/react";
import { styled } from "styled-components";

const FromWrapper = styled.div`
  label {
    display: block;
  }
`;

export default function NewSatellite() {
  return (
    <FromWrapper>
      <h2>Add a new satellite</h2>
      <Form method="POST">
        <label>
          Name: <input type="text" name="name" />
        </label>
        <label>
          Owner: <input type="text" name="owner" />
        </label>
        <label>
          Longitude: <input type="number" name="longitude" />
        </label>
        <label>
          Latitude: <input type="number" name="latitude" />
        </label>
        <input type="submit" value="Add New" />
      </Form>
    </FromWrapper>
  );
}
