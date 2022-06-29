import React from "react";
import { ThreeDots } from "react-loader-spinner";
import s from "./Loader.module.css";

export default function LoaderFnc() {
  return (
    <div className={s.loader}>
      <ThreeDots color='#1c2dcc' height={50} width={50} timeout={3000} />
    </div>
  );
}
