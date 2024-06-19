import { getAllCandidates } from "@/actions/candidateActions";
import { DataTable } from "@/components/admin/DataTable";
import { candidateColumns } from "@/components/admin/columns";
import React from "react";

const AdminCandidatesPage = async () => {
  const candidates = await getAllCandidates();
  return (
    <div className="w-full">
      <div className="flex items-center pb-2 border-b">
        <h1 className="text-lg font-semibold md:text-2xl">Candidates</h1>
      </div>
      {candidates ? (
        <div className="w-full">
          <DataTable
            data={candidates}
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
