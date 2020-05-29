import React, { useContext, useEffect } from "react";
import "./index.less";
import {TestMb} from "../components/testMb";
import {Link} from "react-router-dom";

interface ITestName {

}

export const SubPage: React.FC<ITestName> = props => {
  return <div className="sub-page">
    <Link to="/main">to main</Link>
    <TestMb />
  </div>;
}
