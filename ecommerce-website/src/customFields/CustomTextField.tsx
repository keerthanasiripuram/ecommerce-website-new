import React from "react";
import { TextField } from "@mui/material";

type CustomTextFieldProps = {
  label: string;
  name: string;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  value: string | number;
};

const CustomTextField = (props: CustomTextFieldProps) => {
  return (
    <TextField
      label={props.label}
      name={props.name}
      onChange={props.changeHandler}
      value={props.value}
      type={props.type}
      required
      variant={"outlined"}
      size={"small"}
      margin={"dense"}
      fullWidth
    />
  );
};

export default React.memo(CustomTextField);
