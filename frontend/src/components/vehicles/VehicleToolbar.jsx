import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

function VehicleToolbar({
  search,
  setSearch,

  statusFilter,
  setStatusFilter,

  depotFilter,
  setDepotFilter,

  categoryFilter,
  setCategoryFilter,

  manufacturerFilter,
  setManufacturerFilter,

  depots,
  categories,
  manufacturers,

  onReset,

  onAdd,
}) {
  return (
    <Stack spacing={3}>
      <TextField
        fullWidth
        placeholder="Search VIN, Registration, Manufacturer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            bgcolor: "background.paper",
            borderRadius: 2,

            "& fieldset": {
              borderColor: "divider",
            },

            "&:hover fieldset": {
              borderColor: "primary.main",
            },

            "&.Mui-focused fieldset": {
              borderColor: "primary.main",
            },
          },
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>Status</InputLabel>

            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="All">All Status</MenuItem>
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Assigned">Assigned</MenuItem>
              <MenuItem value="Maintenance">Maintenance</MenuItem>
              <MenuItem value="Out Of Service">Out Of Service</MenuItem>
              <MenuItem value="Retired">Retired</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 220 }}>
            <InputLabel>Depot</InputLabel>

            <Select
              value={depotFilter}
              label="Depot"
              onChange={(e) => setDepotFilter(e.target.value)}
            >
              <MenuItem value="All">All Depots</MenuItem>

              {depots.map((depot) => (
                <MenuItem
                  key={depot.DepotID}
                  value={depot.DepotID}
                >
                  {depot.DepotName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 220 }}>
            <InputLabel>Category</InputLabel>

            <Select
              value={categoryFilter}
              label="Category"
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <MenuItem value="All">All Categories</MenuItem>

              {categories.map((category) => (
                <MenuItem
                  key={category.VehicleCategoryID}
                  value={category.VehicleCategoryID}
                >
                  {category.CategoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 220 }}>
            <InputLabel>Manufacturer</InputLabel>

            <Select
              value={manufacturerFilter}
              label="Manufacturer"
              onChange={(e) =>
                setManufacturerFilter(e.target.value)
              }
            >
              <MenuItem value="All">
                All Manufacturers
              </MenuItem>

              {manufacturers.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<RestartAltIcon />}
            onClick={onReset}
            sx={{
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            Reset
          </Button>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAdd}
            sx={{
              px: 3,
              py: 1.2,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Add Vehicle
          </Button>
        </Box>
      </Box>
    </Stack>
  );
}

export default VehicleToolbar;