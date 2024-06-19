import { fetchAllJobs } from "@/actions/create-job";
import { jobColumns } from "@/components/admin/AdminColumns";
import { DataTable } from "@/components/admin/DataTable";

import React from "react";

const AdminJobsPage = async () => {
  const jobs = await fetchAllJobs();
  return (
    <div className="w-full">
      <div className="flex items-center pb-2 border-b">
        <h1 className="text-lg font-semibold md:text-2xl">Jobs</h1>
      </div>
      {jobs ? (
        <div className="w-full">
          <DataTable data={jobs} columns={jobColumns} type="jobs" />
        </div>
      ) : (
        <h2>No jobs available at the moment</h2>
      )}
    </div>
  );
};

export default AdminJobsPage;
