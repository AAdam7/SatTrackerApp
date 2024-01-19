import { Form } from "@remix-run/react";
import { styled } from "styled-components";
import {
  formData,
  useSubmit,
  useActionData,
  useLoaderData,
} from "@remix-run/react";
import useForm from "./UseForm";

const FromWrapper = styled.div`
  label {
    display: block;
  }
`;

export default function NewSatellite({formEndPoint}) {
  const additionalData = {
    // sent: new Date().toISOString()
  };

  const { handleSubmit, status, message } = useForm({ additionalData });
  if (status === 'success') {
    return (
      <>
        <div>Satellite Added!</div>
        <div>{message}</div>
      </>
    );
  }

  if (status === 'error') {
    return (
      <>
        <div>Something bad happened!</div>
        <div>{message}</div>
      </>
    );
  }

  return (
    <FromWrapper>
      <h2>Add a new satellite</h2>
      <Form action={formEndPoint} onSubmit={handleSubmit} method="POST">
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
        <button type="submit">Add New Sat</button>
      </Form>
    </FromWrapper>
  );
}
