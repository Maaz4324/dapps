import React, { useState } from "react";
import Admin from "../components/AdminPortal/Admin";
import NoAdmin from "../components/AdminPortal/NoAdmin";

function AdminPortal() {
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <div>
      {isAdmin ? (
        <div>
          <Admin />
        </div>
      ) : (
        <div>
          <NoAdmin setIsAdmin={setIsAdmin} />
        </div>
      )}
    </div>
  );
}

export default AdminPortal;
