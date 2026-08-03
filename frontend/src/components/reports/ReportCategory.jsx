import {

    Typography,

    Box,

} from "@mui/material";

function ReportCategory({

    title,

    children,

}) {

    return (

        <Box>

            <Typography

                variant="h4"

                fontWeight={700}

                mb={3}

            >

                {title}

            </Typography>

            <Box

                sx={{

                    display: "grid",

                    gridTemplateColumns:

                        "repeat(auto-fit,minmax(300px,1fr))",

                    gap: 3,

                }}

            >

                {children}

            </Box>

        </Box>

    );

}

export default ReportCategory;