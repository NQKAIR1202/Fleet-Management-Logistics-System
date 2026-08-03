import { useEffect, useState } from "react";

import {
    Paper,
    Typography,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
} from "@mui/material";

import { getTopVehicles } from "../../services/reportService";

function TopVehiclesTable() {

    const [rows, setRows] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadData();

    }, []);

    async function loadData() {

        try {

            const data = await getTopVehicles();

            setRows(data);

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <Paper
                sx={{
                    p:4,
                    borderRadius:5,
                    display:"flex",
                    justifyContent:"center",
                }}
            >

                <CircularProgress/>

            </Paper>

        );

    }

    return (

        <Paper
            elevation={3}
            sx={{
                p:3,
                borderRadius:2,
                height:620,
            }}
        >

            <Typography
                variant="h5"
                fontWeight={700}
                mb={2}
            >

                Vehicles Requiring Attention

            </Typography>

            <TableContainer>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>VIN</TableCell>

                            <TableCell>Depot</TableCell>

                            <TableCell align="center">

                                Jobs

                            </TableCell>

                            <TableCell align="center">

                                Downtime

                            </TableCell>

                            <TableCell align="center">

                                Status

                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {

                            rows.map(vehicle=>(

                                <TableRow
                                    key={vehicle.VIN}
                                >

                                    <TableCell>

                                        {vehicle.VIN}

                                    </TableCell>

                                    <TableCell>

                                        {vehicle.Depot}

                                    </TableCell>

                                    <TableCell
                                        align="center"
                                    >

                                        {vehicle.Jobs}

                                    </TableCell>

                                    <TableCell
                                        align="center"
                                    >

                                        {vehicle.Downtime}

                                    </TableCell>

                                    <TableCell
                                        align="center"
                                    >

                                        <Chip

                                            label={vehicle.Status}

                                            color={

                                                vehicle.Status==="Critical"

                                                ? "error"

                                                : vehicle.Status==="Warning"

                                                ? "warning"

                                                : "success"

                                            }

                                        />

                                    </TableCell>

                                </TableRow>

                            ))

                        }

                    </TableBody>

                </Table>

            </TableContainer>

        </Paper>

    );

}

export default TopVehiclesTable;