import React, { Fragment } from "react";
import Header from "../components/Navigations/Header";
import Modal from "../components/UI/Modal";
import { authAction } from "../store/auth-slice";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

const Root = () => {
  const dispatch = useDispatch();
  const isError = useSelector((state) => state.auth.errorMessage);
  const isSucess = useSelector((state) => state.auth.sucessMessage);

  const closeModal = () => {
    dispatch(authAction.setError(null));
    dispatch(authAction.setSuccess(null));
  };

  return (
    <Fragment>
      <Header />
      {isError && (
        <Modal title="Error" message={isError} onClose={closeModal} />
      )}
      {isSucess && (
        <Modal title="Success" message={isSucess} onClose={closeModal} />
      )}
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
};

export default Root;
