import React, { useContext, useEffect } from "react";
import "./index.less";
import {TestLess} from "../components/testLess";

interface ITestName {

}

export const MainPage: React.FC<ITestName> = props => {
  return <div className="main-page">
    <TestLess />
  </div>;
}
