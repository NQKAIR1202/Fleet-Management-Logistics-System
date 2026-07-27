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

        <TableContainer component={Paper}>

            <Table>

                <TableHead>
                    <TableRow>

                        <TableCell>VIN</TableCell>
                        <TableCell>Registration</TableCell>
                        <TableCell>Manufacturer</TableCell>
                        <TableCell>Model</TableCell>
                        <TableCell>Year</TableCell>
                        <TableCell>Odometer</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="center">Actions</TableCell>

                    </TableRow>
                </TableHead>

                <TableBody>

                    {

                        vehicles.length === 0 ?

                            (

                                <TableRow>

                                    <TableCell

                                        colSpan={8}

                                        align="center"

                                    >

                                        <Typography

                                            color="text.secondary"

                                        >

                                            No vehicles found.

                                        </Typography>

                                    </TableCell>


                                    

                                </TableRow>

                            )

                            :

                            vehicles.map(vehicle => (

                                <TableRow

                                    key={vehicle.VIN}

                                    hover

                                >

                                    <TableCell>

                                        {vehicle.VIN}

                                    </TableCell>

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

                    }

                </TableBody>

            </Table>

        </TableContainer>

    );

}

export default VehicleTable;