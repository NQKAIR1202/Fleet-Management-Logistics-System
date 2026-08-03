import {
    Card,
    CardActionArea,
    CardContent,
    Typography,
    Box,
    Stack,
} from "@mui/material";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useNavigate } from "react-router-dom";



function ReportItem({

    title,

    description,

    icon,

    link,

}) {

    const navigate = useNavigate();

    return (

        <Card


            sx={{

            cursor:"pointer",

            transition:"0.25s",

            "&:hover":{

            transform:"translateY(-6px)",

            boxShadow:8

            }

            }}
            

            >
            

            <CardActionArea

                onClick={() => navigate(link)}

            >

                <CardContent>

                    <Stack spacing={2}>

                        <Box
                            color="primary.main"
                        >

                            {icon}

                        </Box>

                        <Typography
                            variant="h6"
                            fontWeight={700}
                        >

                            {title}

                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >

                            {description}

                        </Typography>

                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            color="primary.main"
                        >

                            <Typography
                                fontWeight={600}
                            >

                                View Report

                            </Typography>

                            <ArrowForwardRoundedIcon />

                        </Stack>

                    </Stack>

                </CardContent>

            </CardActionArea>

        </Card>

    );

}

export default ReportItem;