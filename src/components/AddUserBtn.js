import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import * as React from "react";
import UserDialog from "./UserDialog";

export default function AddUserBtn({ usersData, setUsersData, lastId }) {
  const [open, setOpen] = React.useState(false);
  const handleCloseDialog = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        sx={{ "&, &:hover": { background: "#22a565" } }}
        variant="contained"
        startIcon={<Add />}
        onClick={() => setOpen(true)}
      >
        Add New
      </Button>
      <UserDialog
        open={open}
        handleCloseDialog={handleCloseDialog}
        handleSave={(user, handleClose) => {
          setUsersData([...usersData, { ...user, id: lastId + 1 }]);
          handleClose();
        }}
      />
    </>
  );
}
