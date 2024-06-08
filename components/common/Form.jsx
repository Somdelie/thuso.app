import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const Form = ({
  action,
  buttonText,
  isButtonDisabled,
  formControls,
  btnType,
  formData,
  setFormData,
  handleFileChange,
}) => {
  function renderInputByComponentType(getCurrentControl) {
    let content = null;

    switch (getCurrentControl.componentType) {
      case "input":
        content = (
          <div
            className="relative flex w-full items-center mt-4"
            key={getCurrentControl.name}
          >
            <Input
              type="text"
              disabled={getCurrentControl.disabled}
              placeholder={getCurrentControl.placeholder}
              name={getCurrentControl.name}
              id={getCurrentControl.name}
              value={formData[getCurrentControl.name]}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [event.target.name]: event.target.value,
                })
              }
              className="w-full rounded-md py-3 px-4 border bg-sky-100 text-md outline-none drop-shadow-sm transition-all duration-100 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:right-0 focus-visible:ring-offset-0"
            />
          </div>
        );
        break;

      case "file":
        content = (
          <Label
            htmlFor={getCurrentControl.name}
            className="w-full flex bg-gray-300 items-center px-3 py-3 mt-6 text-center border-2 border-dashed rounded-lg cursor-pointer"
          >
            <h2>{getCurrentControl.label}</h2>
            <Input
              onChange={handleFileChange}
              id={getCurrentControl.name}
              type="file"
            />
          </Label>
        );

        break;

      case "select":
        content = (
          <div
            className="relative flex w-full items-center mt-4"
            key={getCurrentControl.name}
          >
            <Select
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  [getCurrentControl.name]: value,
                })
              }
            >
              <SelectTrigger className="w-full bg-sky-100">
                <SelectValue placeholder={getCurrentControl.placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{getCurrentControl.label}</SelectLabel>
                  {getCurrentControl?.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        );
        break;

      default:
        content = (
          <div className="relative flex items-center mt-8">
            <Input
              type="text"
              disabled={getCurrentControl.disabled}
              placeholder={getCurrentControl.placeholder}
              name={getCurrentControl.name}
              id={getCurrentControl.name}
              value={formData[getCurrentControl.name]}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [event.target.name]: event.target.value,
                })
              }
              className="w-full "
            />
          </div>
        );
        break;
    }
    return content;
  }

  return (
    <form action={action} className="">
      <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {formControls.map((control) => renderInputByComponentType(control))}
      </div>
      <Button
        type={btnType || "submit"}
        disabled={isButtonDisabled}
        className="disabled:opacity-60 mt-6 flex h-11 items-center justify-center px-5"
      >
        {buttonText}
      </Button>
    </form>
  );
};

export default Form;
