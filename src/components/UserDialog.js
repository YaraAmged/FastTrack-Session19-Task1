import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import * as React from "react";
import { useForm } from "react-hook-form";
const initialState = {
  name: "",
  userName: "",
  emailAddress: "",
  group: "",
  assignProfile: "",
};
const grayColor = "#ABAFB3";
const darkBlueColor = "#050F2D";
const StyledInputBase = styled(InputBase)(() => ({
  border: `solid 1px ${grayColor}`,
  background: "white",
  paddingLeft: 10,
  borderRadius: "5px",
}));
const StyledInputLabel = styled(InputLabel)(() => ({
  color: darkBlueColor,
}));

export default function UserDialog({
  oldUser,
  open,
  handleCloseDialog,
  handleSave,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: oldUser || initialState });
  React.useEffect(() => {
    reset(oldUser || initialState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      maxWidth="xs"
      fullWidth
      component="form"
      onSubmit={handleSubmit((data) => {
        handleSave(
          {
            ...(oldUser || { createdOn: new Date(), status: "Active" }),
            ...data,
          },
          handleCloseDialog
        );
      })}
    >
      <DialogTitle sx={{ background: darkBlueColor, color: "white" }}>
        {oldUser ? "Edit User" : "Add New User"}
      </DialogTitle>
      <DialogContent sx={{ background: "#F9FAFC" }}>
        <Stack gap={2} pt={2}>
          <Stack>
            <StyledInputLabel>Full Name</StyledInputLabel>
            <StyledInputBase
              placeholder="Enter full name"
              {...register("name", { required: true })}
            />

            {errors.name ? (
              <Typography color={"error"}>This is required</Typography>
            ) : null}
          </Stack>
          <Stack>
            <StyledInputLabel>User Name</StyledInputLabel>
            <StyledInputBase
              placeholder="Enter username"
              {...register("userName", {
                required: true,
              })}
            />
            {errors.userName ? (
              <Typography color={"error"}>This is required</Typography>
            ) : null}
          </Stack>
          <Stack>
            <StyledInputLabel>Email Address</StyledInputLabel>
            <StyledInputBase
              placeholder="Enter user email address"
              {...register("emailAddress", {
                required: { value: true, message: "This is required" },
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Invalid Email",
                },
              })}
            />
            {errors.emailAddress ? (
              <Typography color={"error"}>
                {errors.emailAddress.message}
              </Typography>
            ) : null}
          </Stack>
          <Stack>
            <StyledInputLabel>User Group</StyledInputLabel>
            <Select
              size="small"
              displayEmpty
              {...register("group", {
                required: { value: true, message: "This is required" },
              })}
              defaultValue={oldUser?.group || ""}
            >
              <MenuItem value="" disabled>
                Choose User Group
              </MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Office">Office</MenuItem>
            </Select>
            {errors.group ? (
              <Typography color={"error"}>{errors.group.message}</Typography>
            ) : null}
          </Stack>
          <Stack>
            <StyledInputLabel>Assign Profile</StyledInputLabel>
            <Select
              size="small"
              variant="outlined"
              displayEmpty
              {...register("assignProfile")}
              defaultValue={oldUser?.assignProfile || ""}
            >
              <MenuItem value="" disabled className="placeholder-color">
                Choose Profile
              </MenuItem>
              <MenuItem value="1">1</MenuItem>
            </Select>
          </Stack>
        </Stack>
      </DialogContent>

      <Divider />
      <DialogContent sx={{ p: 2 }}>
        <Stack direction={"row"} gap={2} justifyContent={"space-between"}>
          <Button
            variant="text"
            color="inherit"
            sx={{ textDecoration: "underline", color: darkBlueColor }}
            onClick={() => {
              reset();
            }}
          >
            Reset fields
          </Button>
          <Stack direction={"row"} gap={2}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleCloseDialog}
              sx={{ borderColor: grayColor, color: darkBlueColor }}
            >
              Cancel
            </Button>

            <Button variant="contained" color="success" type="submit">
              {oldUser ? "Save User" : "Add User"}
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
