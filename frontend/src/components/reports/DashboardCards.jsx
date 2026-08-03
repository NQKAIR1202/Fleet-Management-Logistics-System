import {

    Grid,

    Card,

    CardContent,

    Typography,

} from "@mui/material";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

import EngineeringIcon from "@mui/icons-material/Engineering";

import BuildIcon from "@mui/icons-material/Build";

import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import TimerIcon from "@mui/icons-material/Timer";

const cards = [

    {

        title: "Vehicles",

        key: "totalVehicles",

        icon: DirectionsCarIcon,

    },

    {

        title: "Drivers",

        key: "totalDrivers",

        icon: EngineeringIcon,

    },

    {

        title: "Open Jobs",

        key: "openJobs",

        icon: BuildIcon,

    },

    {

        title: "Safety Events",

        key: "totalSafetyEvents",

        icon: WarningAmberIcon,

    },

    {

        title: "Downtime",

        key: "totalDowntimeHours",

        icon: TimerIcon,

    },

];

function DashboardCards({

    summary,

}) {

    return (

        <Grid

            container

            spacing={5}

        >

            {

                cards.map(card => {

                    const Icon = card.icon;

                    return (

                        <Grid

                            item

                            xs={12}

                            sm={6}

                            md={2.4}

                            key={card.title}

                        >

                            <Card

                                elevation={4}

                            >

                                <CardContent>

                                    <Icon

                                        color="primary"

                                        sx={{

                                            fontSize: 50,

                                        }}

                                    />

                                    <Typography

                                        variant="h4"

                                        fontWeight={700}

                                    >

                                        {

                                            Math.round(

                                                summary[card.key]

                                            )

                                        }

                                    </Typography>

                                    <Typography

                                        color="text.secondary"

                                    >

                                        {card.title}

                                    </Typography>

                                </CardContent>

                            </Card>

                        </Grid>

                    );

                })

            }

        </Grid>

    );

}

export default DashboardCards;