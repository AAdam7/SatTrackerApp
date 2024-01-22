import { useState, useContext } from "react";
import { DataContext } from "../../context/dataContext.js";
import { useRevalidator } from "@remix-run/react";

function useForm() {
	const {formAdditionalData, isClicked, setState } = useContext(DataContext);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const revalidator = useRevalidator();
  const handleLoad = () => {
    revalidator.revalidate();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const dataAPI =
      formAdditionalData === "post" || formAdditionalData === "put"
        ? Array.from(e.target.elements)
            .filter((input) => input.name)
            .reduce(
              (obj, input) => Object.assign(obj, { [input.name]: input.value }),
              {}
            )
        : "";

    switch (formAdditionalData) {
      case "delete":
        fetch(`http://localhost:1256/satellites/${e.target.id}`, {
          method: "DELETE",
        })
          .then((response) => {
            // due to cors...
            // if (response.status !== 200) {
            //   throw new Error(response.statusText);
            // }
            // return response.json();
          })
					.then(() => {
						setMessage("Check list/api");
						setStatus("success");
						handleLoad();
					})
					.catch((err) => {
						setMessage(err.toString());
						setStatus("error");
					});
        break;

      case "post":
        fetch("http://localhost:1256/satellites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataAPI),
        }).then((response) => {
          // due to cors...
          // if (response.status !== 200) {
          //   throw new Error(response.statusText);
          // }
          // return response.json();
        })
				.then(() => {
					setMessage("Check list/api");
					setStatus("success");
					handleLoad();
				})
				.catch((err) => {
					setMessage(err.toString());
					setStatus("error");
				});
        
				setState({ isClicked: false });
				
        break;

      case "put":
        fetch(`http://localhost:1256/satellites/${isClicked.target.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataAPI),
        })
          .then((response) => {
            // due to cors...
            // if (response.status !== 200) {
            //   throw new Error(response.statusText);
            // }
            // return response.json();
          })
          .then(() => {
            setMessage("Check list/api");
            setStatus("success");
						handleLoad();
          })
          .catch((err) => {
            setMessage(err.toString());
            setStatus("error");
          });
        
				setState({ isClicked: false });
				
        break;
    }
  };

  return { handleSubmit, status, message };
}

export default useForm;
