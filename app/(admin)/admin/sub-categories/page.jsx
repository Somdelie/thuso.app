import { fetchCategories, fetchSubcategories } from "@/actions/categoryAction";
import SubCats from "@/components/admin/SubCats";

const CategoriesPage = async () => {
  const subCategories = await fetchSubcategories();
  const categories = await fetchCategories();

  return <SubCats subCategories={subCategories} categories={categories} />;
};

export default CategoriesPage;
