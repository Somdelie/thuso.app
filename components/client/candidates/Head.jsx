import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import useLocation from "@/hooks/UseLocation";

const Head = () => {
  const { getAllCountries, getCountryStates, getStateCities } = useLocation();
  const countries = getAllCountries();
  return (
    <div className="grid sm:grid-cols-2 gap-4 md:grid-cols-3 w-full">
      <div className="relative w-full">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search candidates..."
          className="w-full appearance-none bg-background pl-8 shadow-none "
        />
      </div>
      <Select className="w-full">
        <SelectTrigger className="w-full">
          <SelectValue defaultValue="" placeholder="Select a Country" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => {
            return (
              <SelectItem key={country.isoCode} value={country.isoCode}>
                {country.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Select className="w-full">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>North America</SelectLabel>
            <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
            <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
            <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
            <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
            <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
            <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Head;
