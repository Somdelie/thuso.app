"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ArrowUpRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";

const RecentJobs = ({ latestJobs }) => {
  return (
    <div className="col-span-2">
      <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Jobs</CardTitle>
            <CardDescription>Recent jobs from your app.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {latestJobs.map((job) => (
                <TableRow key={job?.id}>
                  <TableCell>
                    <div className="font-medium">{job?.title}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {job?.Category?.categoryName}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge className="text-xs" variant="outline">
                      {job?.isFeatured ? "Featured" : "Standard"}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(job?.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="/admin/jobs">
              View All
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RecentJobs;
