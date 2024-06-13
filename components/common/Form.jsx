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
  const renderInputByComponentType = (control) => {
    switch (control.componentType) {
      case "input":
        return (
          <div
            className="relative flex w-full items-center mt-4"
            key={control.name}
          >
            <Input
              type="text"
              disabled={control.disabled}
              placeholder={control.placeholder}
              name={control.name}
              id={control.name}
              value={formData[control.name]}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [event.target.name]: event.target.value,
                })
              }
              className="w-full rounded-md py-3 px-4 border bg-sky-100 text-md outline-none drop-shadow-sm transition-all duration-100 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none"
            />
          </div>
        );

      case "file":
        return (
          <Label
            htmlFor={control.name}
            className="w-full flex bg-gray-300 items-center px-3 py-3 mt-6 text-center border-2 border-dashed rounded-lg cursor-pointer"
            key={control.name}
          >
            <h2>{control.label}</h2>
            <Input onChange={handleFileChange} id={control.name} type="file" />
          </Label>
        );

      case "select":
        return (
          <div
            className="relative flex w-full items-center mt-4"
            key={control.name}
          >
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, [control.name]: value })
              }
            >
              <SelectTrigger className="w-full bg-sky-100">
                <SelectValue placeholder={control.placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{control.label}</SelectLabel>
                  {control.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        );

      default:
        return (
          <div className="relative flex items-center mt-8" key={control.name}>
            <Input
              type="text"
              disabled={control.disabled}
              placeholder={control.placeholder}
              name={control.name}
              id={control.name}
              value={formData[control.name]}
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
    }
  };

  return (
    <form onSubmit={action} className="">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
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
