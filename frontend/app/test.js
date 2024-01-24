import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createRemixStub } from "@remix-run/testing";
import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";

test("renders loader data", async () => {
  
  function MyComponent() {
    const data = useLoaderData() 
    return <p>Message: {data.message}</p>;
  }

  const RemixStub = createRemixStub([
    {
      path: "/",
      Component: MyComponent,
      loader() {
        return json({ message: "Satellite" });
      },
    },
  ]);

  render(<RemixStub />);

  await waitFor(() => screen.findByText("Message: Satellite"));
});
