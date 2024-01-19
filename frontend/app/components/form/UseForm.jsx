import { useState } from "react";

function useForm({ additionalData }) {
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    // const finalFormEndpoint = e.target.action;
    const data = Array.from(e.target.elements)
      .filter((input) => input.name)
      .reduce((obj, input) => Object.assign(obj, { [input.name]: input.value }), {});

    if (additionalData) {
      Object.assign(data, additionalData);
    }

    fetch("http://localhost:1256/satellites", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
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
        setStatus('success');
      })
      .catch((err) => {
        setMessage(err.toString());
        setStatus('error');
      });
  };

  return { handleSubmit, status, message };
}

export default useForm;