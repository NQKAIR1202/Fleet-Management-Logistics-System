import { useMemo, useState } from "react";

import {
    Avatar,
    Chip,
    IconButton,
    LinearProgress,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const getScoreColor = (score) => {

    const value = Number(score);

    if (value >= 90) return "success";

    if (value >= 75) return "warning";

    return "error";

};

const getStatusColor = (status) => {

    switch (status) {

        case "Active":
            return "success";

        case "On Leave":
            return "warning";

        case "Suspended":
            return "error";

        default:
            return "default";

    }

};

const DriverTable = ({

    drivers,

    onView,

    onEdit,

    onDelete,

    canEdit,

    canDelete,

}) => {

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(10);

    const paginatedDrivers = useMemo(() => {

        const start = page * rowsPerPage;

        return drivers.slice(start, start + rowsPerPage);

    }, [drivers, page, rowsPerPage]);

    const handleChangePage = (_, newPage) => {

        setPage(newPage);

    };

    const handleChangeRowsPerPage = (event) => {

        setRowsPerPage(parseInt(event.target.value, 10));

        setPage(0);

    };

    return (

        <Paper elevation={0}>

            <TableContainer>

                <Table stickyHeader>

                    <TableHead>

                        <TableRow>

                            <TableCell><strong>Driver</strong></TableCell>

                            <TableCell><strong>Depot</strong></TableCell>

                            <TableCell><strong>Licence</strong></TableCell>

                            <TableCell><strong>Current Vehicle</strong></TableCell>

                            <TableCell><strong>Safety Score</strong></TableCell>

                            <TableCell><strong>Status</strong></TableCell>

                            <TableCell align="center">

                                <strong>Actions</strong>

                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {paginatedDrivers.length === 0 ? (

                            <TableRow>

                                <TableCell
                                    colSpan={7}
                                    align="center"
                                    sx={{ py: 6 }}
                                >

                                    <Typography color="text.secondary">

                                        No drivers found.

                                    </Typography>

                                </TableCell>

                            </TableRow>

                        ) : (

                            paginatedDrivers.map((driver, index) => (

                                <TableRow
                                    key={driver.DriverID}
                                    hover
                                    sx={{
                                        "&:last-child td": {
                                            borderBottom: 0,
                                        },
                                        bgcolor:
                                            index % 2 === 0
                                                ? "background.paper"
                                                : "action.hover",
                                    }}
                                >

                                    <TableCell>

                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            alignItems="center"
                                        >

                                            <Avatar>

                                                {driver.FullName.charAt(0)}

                                            </Avatar>

                                            <Stack>

                                                <Typography fontWeight={600}>

                                                    {driver.FullName}

                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >

                                                    {driver.ContactInfo?.split("|")[0]}

                                                </Typography>

                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >

                                                    {driver.ContactInfo?.split("|")[1]}

                                                </Typography>

                                            </Stack>

                                        </Stack>

                                    </TableCell>

                                    <TableCell>

                                        {driver.Depot}

                                    </TableCell>

                                    <TableCell>

                                        <Chip
                                            label={driver.LicenceType}
                                            color="primary"
                                            variant="outlined"
                                        />

                                    </TableCell>

                                    <TableCell>

                                        {driver.CurrentVehicle ?? "-"}

                                    </TableCell>

                                    <TableCell width={220}>

                                        <Stack spacing={1}>

                                            <Typography>

                                                {driver.SafetyScore}

                                            </Typography>

                                            <LinearProgress
                                                variant="determinate"
                                                value={Number(driver.SafetyScore)}
                                                color={getScoreColor(driver.SafetyScore)}
                                            />

                                        </Stack>

                                    </TableCell>

                                    <TableCell>

                                        <Chip
                                            label={driver.EmploymentStatus}
                                            color={getStatusColor(driver.EmploymentStatus)}
                                        />

                                    </TableCell>

                                    <TableCell align="center">

                                        <Tooltip title="View">

                                            <IconButton
                                                onClick={() => onView(driver.DriverID)}
                                            >

                                                <VisibilityIcon />

                                            </IconButton>

                                        </Tooltip>

                                        {
                                            canEdit && (

                                                <Tooltip title="Edit">

                                                    <IconButton
                                                        onClick={() => onEdit(driver.DriverID)}
                                                    >

                                                        <EditIcon />

                                                    </IconButton>

                                                </Tooltip>

                                            )
                                        }

                                        {
                                            canDelete && (

                                                <Tooltip title="Delete">

                                                    <IconButton
                                                        color="error"
                                                        onClick={() => onDelete(driver)}
                                                    >

                                                        <DeleteIcon />

                                                    </IconButton>

                                                </Tooltip>

                                            )
                                        }

                                    </TableCell>

                                </TableRow>

                            ))

                        )}

                    </TableBody>

                </Table>

            </TableContainer>

            <TablePagination

                component="div"

                count={drivers.length}

                page={page}

                onPageChange={handleChangePage}

                rowsPerPage={rowsPerPage}

                onRowsPerPageChange={handleChangeRowsPerPage}

                rowsPerPageOptions={[5, 10, 25, 50]}

            />

        </Paper>

    );

};

export default DriverTable;