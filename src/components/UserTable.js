import {
  Block,
  DateRange,
  Download,
  Edit,
  Lock,
  MoreVert,
  Search,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Checkbox,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { DateRangePicker } from "date-range-picker-mui";
import moment from "moment/moment";
import * as React from "react";
import AddUserBtn from "./AddUserBtn";
import PageHeader from "./PageHeader";
import UserDialog from "./UserDialog";

const StyledIconButton = styled(IconButton)(() => ({
  background: "#e7e9ef",
  borderRadius: "5px",
  color: "#51576d",
}));
const StyledButton = styled(Button)(() => ({
  borderRadius: "5px",
  "&:hover, &": {
    background: "#e7e9ef",
    color: "#51576d",
    height: "40px",
  },
}));

function QuickSearchToolbar({ filters, setFilters }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Grid
      container
      direction={"row"}
      spacing={2}
      sx={{ pl: "20px", pb: "20px" }}
      columns={16}
    >
      <Grid item xs={4}>
        <TextField
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          placeholder="Search ..."
          size="small"
          fullWidth
          InputProps={{
            sx: {
              color: "#51576d",
            },
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "#51576d" }} />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          placeholder="User Name"
          size="small"
          value={filters.userName}
          onChange={(e) => setFilters({ ...filters, userName: e.target.value })}
        />
      </Grid>
      <Grid item xs={2}>
        <FormControl fullWidth size="small">
          <InputLabel>User Status</InputLabel>
          <Select
            multiple
            label="User Status"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            renderValue={(s) => `${s},`}
          >
            {["Active", "Inactive"].map((statusItem) => (
              <MenuItem value={statusItem} key={statusItem}>
                <Checkbox
                  size="small"
                  checked={filters.status.includes(statusItem)}
                />
                <ListItemText primary={statusItem} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3} alignSelf={"center"} position={"relative"}>
        <TextField
          fullWidth
          label="Creation Date"
          size="small"
          sx={{ "& *": { cursor: "pointer !important" } }}
          value={
            filters.startDate
              ? `${moment(filters.startDate).format("DD/MM/YYYY")} - ${moment(
                  filters.endDate
                ).format("DD/MM/YYYY")}`
              : "All Time"
          }
          onClick={() => setOpen(true)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <DateRange sx={{ color: "#8893aa" }} />
              </InputAdornment>
            ),
          }}
        />
        <DateRangePicker
          open={open}
          wrapperClassName="DateRangePicker"
          toggle={() => setOpen(!open)}
          onChange={(newValue) => {
            setFilters({ ...filters, ...newValue });
          }}
        />{" "}
      </Grid>
      <Grid item xs={2} alignSelf={"center"}>
        <Typography color={"#1b81fb"}>All Filters</Typography>
      </Grid>
    </Grid>
  );
}

export default function UserTable() {
  const [rows, setRows] = React.useState([]);
  const [filters, setFilters] = React.useState({
    name: "",
    userName: "",
    status: [],
    startDate: null,
    endDate: null,
  });
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 300,
      renderCell: (params) => {
        const nameParts = params.row.name.split(" ");
        return (
          <Stack direction={"row"} gap={2} alignItems={"center"}>
            <Avatar>{nameParts.map((namePart) => namePart[0]).join("")}</Avatar>
            <Typography>{params.row.name}</Typography>
          </Stack>
        );
      },
    },
    {
      field: "userName",
      headerName: "User Name",
      width: 200,
    },
    {
      field: "emailAddress",
      headerName: "Email Address",
      width: 200,
    },
    {
      field: "group",
      headerName: "Group",
      width: 120,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        return (
          <Select
            onChange={(e) =>
              setRows((rows) => {
                const newRows = [...rows];
                const index = newRows.findIndex(
                  (row) => row.id === params.row.id
                );
                newRows[index].status = e.target.value;
                return newRows;
              })
            }
            value={params.row.status}
            fullWidth
            variant="standard"
            disableUnderline
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        );
      },
    },
    {
      field: "createdOn",
      headerName: "Created On",
      sortable: false,
      width: 120,
      valueGetter: (params) => {
        return moment(params.row.createdOn).format("MMM DD, YYYY");
      },
    },
  ];

  React.useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("rows", JSON.stringify(rows));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);
  React.useEffect(() => {
    const rowsFromLocalStorage = localStorage.getItem("rows");
    if (rowsFromLocalStorage) {
      setRows(JSON.parse(rowsFromLocalStorage));
    }
    setIsLoaded(true);
  }, []);
  const filteredRows = rows.filter((row) => {
    if (filters.startDate && new Date(row.createdOn) < filters.startDate)
      return false;
    if (filters.endDate && new Date(row.createdOn) > filters.endDate)
      return false;
    if (filters.name && !new RegExp(filters.name).test(row.name)) return false;
    if (filters.status.length > 0 && !filters.status.includes(row.status))
      return false;
    if (filters.userName && filters.userName !== row.userName) return false;
    return true;
  });
  const handleEditUser = (user, handleClose) => {
    const newRows = [...rows];
    const index = newRows.findIndex((r) => r.id === selectedRows[0]);
    newRows.splice(index, 1, user);
    setRows(newRows);
    handleClose();
  };
  const handleRemoveUsers = () => {
    setRows(rows.filter((r) => !selectedRows.includes(r.id)));
  };
  return (
    <>
      <PageHeader
        title={"User Management"}
        action={<AddUserBtn setUsersData={setRows} usersData={rows} />}
      />

      <Box
        sx={{
          paddingTop: "20px",
          width: "100%",
          border: "solid 1px #e7e9ef ",
          borderRadius: "16px",
        }}
      >
        <QuickSearchToolbar
          filters={filters}
          setFilters={setFilters}
          sx={{ padding: "20px" }}
        />

        {selectedRows.length > 0 && (
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            p={1}
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              gap={2}
              sx={{ paddingLeft: "20px" }}
            >
              <Typography sx={{ color: "#51576d" }}>
                {selectedRows.length} selected
              </Typography>
              <Divider orientation="vertical" sx={{ height: "25px" }} />
              {selectedRows.length === 1 && (
                <>
                  <StyledIconButton onClick={() => setOpen(true)}>
                    <Edit />
                  </StyledIconButton>
                  <UserDialog
                    oldUser={rows[selectedRows[0]]}
                    open={open}
                    handleCloseDialog={() => setOpen(false)}
                    handleSave={handleEditUser}
                  />
                </>
              )}
              <StyledIconButton onClick={handleRemoveUsers}>
                <Block />
              </StyledIconButton>
              <StyledIconButton>
                <Lock />
              </StyledIconButton>
              <StyledButton>Assign To Profile</StyledButton>
              <StyledButton>Assign To Group</StyledButton>
              <StyledIconButton>
                <MoreVert />
              </StyledIconButton>
              <Button
                variant="text"
                sx={{
                  textTransform: "none",
                  textDecoration: "underline",
                  color: "#51576d",
                }}
                onClick={() => setSelectedRows([])}
              >
                Unselect all
              </Button>
            </Stack>
            <StyledIconButton>
              <Download />
            </StyledIconButton>
          </Stack>
        )}
        <Divider />
        <DataGrid
          slotProps={{
            baseCheckbox: { color: "success" },
          }}
          rows={filteredRows}
          sx={{
            color: "#8893aa",
            minHeight: "300px",
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              background: "#F9FAFC",
            },
          }}
          columns={columns.map((col) => ({
            ...col,
            sortable: false,
            editable: false,
          }))}
          disableColumnMenu
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          rowSelectionModel={selectedRows}
          onRowSelectionModelChange={(r) => setSelectedRows(r)}
        />
      </Box>
    </>
  );
}
