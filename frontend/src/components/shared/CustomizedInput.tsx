import { TextField } from "@mui/material";

type Props = {
  name: string;
  type: string;
  label: string;
};

const CustomizedInput = (props: Props) => {
  return (
    <TextField
      margin="normal"
      InputLabelProps={{ style: { color: "white", fontSize: "16px" } }}
      name={props.name}
      label={props.label}
      type={props.type}
      InputProps={{
        style: {
          width: "500px",
          height: "56px",
          borderRadius: 12,
          fontSize: 18,
          color: "white",
          padding: "0 14px",
        },
      }}
    />
  );
};

export default CustomizedInput;
