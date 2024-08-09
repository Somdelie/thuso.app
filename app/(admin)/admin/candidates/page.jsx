import { getAllCandidates } from "@/actions/candidateActions";
import { candidateColumns } from "@/components/admin/AdminColumns";
import { DataTable } from "@/components/admin/DataTable";
import React from "react";

const AdminCandidatesPage = async () => {
  const profiles = await getAllCandidates();
  console.log(profiles, "these are the candidates");
  return (
    <div className="w-full">
      <div className="flex items-center pb-2 border-b">
        <h1 className="text-lg font-semibold md:text-2xl">Candidates</h1>
      </div>
      {profiles ? (
        <div className="w-full">
          <DataTable
            data={profiles}
            columns={candidateColumns}
            type="candidates"
          />
        </div>
      ) : (
        <h2>No candidates available</h2>
      )}
    </div>
  );
};

export default AdminCandidatesPage;
