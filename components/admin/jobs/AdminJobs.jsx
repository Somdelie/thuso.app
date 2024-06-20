"use client";

import AdminPostJob from "./AdminPostJob";
import { useState } from "react";

const AdminJobs = ({ profileInfo, user, categories }) => {
  const [openJobModal, setOpenJobModal] = useState(false);

  return (
    <div>
      <AdminPostJob
        setOpenJobModal={setOpenJobModal}
        openJobModal={openJobModal}
        profileInfo={profileInfo}
        user={user}
        categories={categories}
      />
    </div>
  );
};

export default AdminJobs;
