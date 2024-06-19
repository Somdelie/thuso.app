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

const RecentJobs = () => {
  return (
    <div className="col-span-2">
      <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Candidates</CardTitle>
            <CardDescription>
              Recent candidates from your store.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="font-medium">Liam Johnson</div>
                </TableCell>
                <TableCell className="hidden xl:table-column">Sale</TableCell>
                <TableCell className="hidden xl:table-column">
                  <Badge className="text-xs" variant="outline">
                    Approved
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                  2023-06-23
                </TableCell>
                <TableCell className="text-right">
                  {" "}
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    liam@example.com
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="font-medium">Olivia Smith</div>
                </TableCell>
                <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                  2023-06-24
                </TableCell>
                <TableCell className="text-right">
                  {" "}
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    olivia@example.com
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="font-medium">Noah Williams</div>
                </TableCell>
                <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                  2023-06-25
                </TableCell>
                <TableCell className="text-right">
                  {" "}
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    noah@example.com
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="#">
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
