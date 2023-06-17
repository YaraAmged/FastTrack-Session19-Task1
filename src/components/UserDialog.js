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
  styled,
} from "@mui/material";
import * as React from "react";
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
  const [formState, setFormState] = React.useState(oldUser || initialState);
  React.useEffect(() => {
    setFormState(oldUser || initialState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  return (
    <Dialog open={open} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ background: darkBlueColor, color: "white" }}>
        Add New User
      </DialogTitle>
      <DialogContent sx={{ background: "#F9FAFC" }}>
        <Stack gap={2} pt={2}>
          <Stack>
            <StyledInputLabel>Full Name</StyledInputLabel>
            <StyledInputBase
              placeholder="Enter full name"
              value={formState.name}
              onChange={(e) => {
                setFormState({ ...formState, name: e.target.value });
              }}
            />
          </Stack>
          <Stack>
            <StyledInputLabel>User Name</StyledInputLabel>
            <StyledInputBase
              placeholder="Enter username"
              value={formState.userName}
              onChange={(e) => {
                setFormState({ ...formState, userName: e.target.value });
              }}
            />
          </Stack>
          <Stack>
            <StyledInputLabel>Email Address</StyledInputLabel>
            <StyledInputBase
              placeholder="Enter user email address"
              value={formState.emailAddress}
              onChange={(e) => {
                setFormState({ ...formState, emailAddress: e.target.value });
              }}
            />
          </Stack>
          <Stack>
            <StyledInputLabel>User Group</StyledInputLabel>
            <Select
              size="small"
              value={formState.group}
              displayEmpty
              onChange={(e) => {
                setFormState({ ...formState, group: e.target.value });
              }}
              className={
                formState.group === "" ? "placeholder-color" : undefined
              }
            >
              <MenuItem value="" disabled>
                Choose User Group
              </MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="office">Office</MenuItem>
            </Select>
          </Stack>
          <Stack>
            <StyledInputLabel>Assign Profile</StyledInputLabel>
            <Select
              size="small"
              variant="outlined"
              value={formState.assignProfile}
              displayEmpty
              onChange={(e) => {
                setFormState({ ...formState, assignProfile: e.target.value });
              }}
              className={
                formState.assignProfile === "" ? "placeholder-color" : undefined
              }
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
              setFormState(initialState);
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

            <Button
              variant="contained"
              color="success"
              onClick={() => {
                handleSave(
                  {
                    ...(oldUser || { createdOn: new Date(), status: "Active" }),
                    ...formState,
                  },
                  handleCloseDialog
                );
                setFormState(initialState);
              }}
            >
              {oldUser ? "Save User" : "Add User"}
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
