import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/signin", {
      replace: true,
    });
  }, []);

  return <div>PageNotFound</div>;
};

export default PageNotFound;
