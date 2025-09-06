import { TextField } from "@mui/material";

type Props = {
  name: string;
  type: string;
  label: string;
};

const CustomizedInput = (props: Props) => {
  return (
    <TextField
      margin="none"
      InputLabelProps={{
        style: {
          color: "white",
          fontSize: "16px",
        },
      }}
      name={props.name}
      label={props.label}
      type={props.type}
      fullWidth
      InputProps={{
        style: {
          borderRadius: 12,
          fontSize: 16,
          color: "white",
          padding: "0 16px",
        },
      }}
      sx={{
        width: "100%",
        margin: { xs: "1px 0", sm: "2px 0", md: "2px 0", lg: "3px 0" },
        "& .MuiInputBase-root": {
          fontSize: { xs: "14px", sm: "16px", md: "17px", lg: "18px" },
          height: { xs: "42px", sm: "48px", md: "52px", lg: "56px" },
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          },
          "&.Mui-focused": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          },
        },
        "& .MuiInputLabel-root": {
          fontSize: { xs: "12px", sm: "14px", md: "15px", lg: "16px" },
          color: "rgba(255, 255, 255, 0.7)",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
      }}
    />
  );
};

export default CustomizedInput;
