import React from "react";
import Base from "../core/Base";
import { signin, isAuthenticated} from "../auth/helper";

function UserDashBoard() {
  const user = isAuthenticated();
  return (
    <Base title="UserDashBoard">
      <h1>This is UserDashBoard</h1>
      <p> EMAIL: {user.email}</p>
      <p> Name : {user.name} </p>
    </Base>
  );
}

export default UserDashBoard;
