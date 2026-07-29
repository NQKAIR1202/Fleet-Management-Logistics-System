import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import VehicleStatusChip from "./VehicleStatusChip";
import VehicleActionButtons from "./VehicleActionButtons";

function VehicleTable({
  vehicles,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 2,
        bgcolor: "background.paper",
        boxShadow: 2,
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>VIN</strong></TableCell>

            <TableCell><strong>Registration</strong></TableCell>

            <TableCell><strong>Manufacturer</strong></TableCell>

            <TableCell><strong>Model</strong></TableCell>

            <TableCell><strong>Year</strong></TableCell>

            <TableCell><strong>Odometer</strong></TableCell>

            <TableCell><strong>Status</strong></TableCell>

            <TableCell align="center">
              <strong>Actions</strong>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {vehicles.length === 0 ? (
            <TableRow hover>
              <TableCell
                colSpan={8}
                align="center"
                sx={{
                  py: 5,
                }}
              >
                <Typography color="text.secondary">
                  No vehicles found.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            vehicles.map((vehicle) => (
              <TableRow
                key={vehicle.VIN}
                hover
              >
                <TableCell>{vehicle.VIN}</TableCell>

                <TableCell>
                  {vehicle.RegistrationNumber}
                </TableCell>

                <TableCell>
                  {vehicle.Manufacturer}
                </TableCell>

                <TableCell>
                  {vehicle.Model}
                </TableCell>

                <TableCell>
                  {vehicle.ManufactureYear}
                </TableCell>

                <TableCell>
                  {vehicle.CurrentOdometer?.toLocaleString()} km
                </TableCell>

                <TableCell>
                  <VehicleStatusChip
                    status={vehicle.OperationalStatus}
                  />
                </TableCell>

                <TableCell align="center">
                  <VehicleActionButtons
                    vehicle={vehicle}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default VehicleTable;