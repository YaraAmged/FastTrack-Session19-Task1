import { Stack, Typography } from "@mui/material";

export default function PageHeader({ title, action }) {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{ py: "20px" }}
    >
      <Typography sx={{ fontWeight: "bold", fontSize: "25px" }}>
        {title}
      </Typography>
      {action}
    </Stack>
  );
}
