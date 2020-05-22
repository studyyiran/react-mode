import React, { useContext, useEffect } from "react";
import "./index.less";

interface ITestName {}

export const TestLess: React.FC<ITestName> = (props) => {
  useEffect(() => {
    console.log(props);
  }, []);
  return (
    <div className="test-less">
      <ul>
        <li>123</li>
        <li>456</li>
      </ul>
    </div>
  );
};
