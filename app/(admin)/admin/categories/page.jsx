import { fetchCategories } from "@/actions/categoryAction";
import Admin from "@/components/admin/Admin";
import { Button } from "@/components/ui/button";
import React from "react";

const CategoriesPage = async () => {
  const categories = await fetchCategories();

  return <Admin categories={categories} />;
};

export default CategoriesPage;
