import { useNavigate } from "react-router-dom";

import {
    Paper,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Chip,
    Button,
    Stack,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

export default function GenericReportTable({

    title,

    columns,

    rows,

    renderCell,

}) {

    const navigate = useNavigate();

    return (

        <Paper
            elevation={3}
            sx={{
                p: 3,
                borderRadius: 2,
            }}
        >

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                    width: "100%",
                    mb: 3,
                }}
            >

                <Typography
                    variant="h5"
                    fontWeight={600}
                >
                    {title}
                </Typography>

                <Button
                    variant="outlined"
                    startIcon={<ArrowBackRoundedIcon />}
                    onClick={() => navigate("/reports")}
                    sx={{
                        borderRadius: 2,
                        minWidth: 110,
                    }}
                >
                    Back
                </Button>

            </Stack>

            <TableContainer sx={{ width: "100%" }}>

                <Table
                    sx={{
                        width: "100%",
                    }}
                >

                    <TableHead>

                        <TableRow>

                            {columns.map(col => (

                                <TableCell
                                    key={col.key}
                                >
                                    {col.label}
                                </TableCell>

                            ))}

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {rows.map((row, index) => (

                            <TableRow
                                hover
                                key={index}
                            >

                                {columns.map(col => (

                                    <TableCell
                                        key={col.key}
                                    >

                                        {

                                            renderCell

                                                ? renderCell(col.key, row)

                                                : row[col.key]

                                        }

                                    </TableCell>

                                ))}

                            </TableRow>

                        ))}

                    </TableBody>

                </Table>

            </TableContainer>

        </Paper>

    );

}