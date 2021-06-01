import React from "react";
import { withRouter } from "react-router-dom";

const Home = ({ history }) => {
  return (
    <div className="home">
      <div className="content">
        <div className="left">
          <h2>The online quiz maker. Easy to use, fun and customizable</h2>
          <p>Make a quiz and share link for passing</p>
        </div>
        <div className="right">
          <h1>Testify</h1>
          <button className="main" onClick={() => history.push("/test/create")}>
            Create Quiz
          </button>
          <button>Show recent</button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Home);
