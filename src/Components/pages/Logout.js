import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout({ setRole }) {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setRole(null);
    navigate("/login");
  }, [navigate, setRole]);

  return (
    <>
      <Helmet>
        <title>Logout - GovTenders Portal</title>
        <meta name="description" content="Logout from your GovTenders account." />
      </Helmet>
      {null}
    </>
  );
}

export default Logout;
