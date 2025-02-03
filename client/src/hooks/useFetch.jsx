import { useState } from "react";

export const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogle = async (response) => {
    console.log(response)
  };
  return { loading, error, handleGoogle };
};

