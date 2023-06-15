import { Stack, Typography } from "@mui/material";

export default function PageHeader({ title, action }) {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{ py: "10px" }}
    >
      <Typography>{title}</Typography>
      {action}
    </Stack>
  );
}
