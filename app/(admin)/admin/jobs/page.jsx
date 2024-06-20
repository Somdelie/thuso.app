import { fetchAllJobs } from "@/actions/create-job";
import { jobColumns } from "@/components/admin/AdminColumns";
import { DataTable } from "@/components/admin/DataTable";
import PostNewJob from "@/components/client/jobs/PostNewJob";
import { fetchCategories } from "@/actions/categoryAction";
import { fetchProfile } from "@/actions/create-profile";
import { currentUser } from "@clerk/nextjs/server";

import React from "react";
import AdminJobs from "@/components/admin/jobs/AdminJobs";

const AdminJobsPage = async () => {
  const user = await currentUser();
  const profileInfo = await fetchProfile(user?.id);

  const categories = await fetchCategories();

  const jobs = await fetchAllJobs();
  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-2 border-b">
        <h1 className="text-lg font-semibold md:text-2xl">Jobs</h1>
        <AdminJobs
          user={JSON.parse(JSON.stringify(user))}
          profileInfo={profileInfo}
          categories={categories}
        />
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
