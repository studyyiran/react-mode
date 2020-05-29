import React, { useContext, useEffect } from "react";
import "./index.less";
import {TestLess} from "../components/testLess";
import {Link} from 'react-router-dom'

interface ITestName {

}

export const MainPage: React.FC<ITestName> = props => {
  return <div className="main-page">
    <Link to="/sub">to sub</Link>
    <TestLess />
  </div>;
}
