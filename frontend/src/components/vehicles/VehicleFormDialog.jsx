import { useEffect, useState } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    MenuItem,
} from "@mui/material";

import {
    getDepots,
    getVehicleCategories,
} from "../../services/vehicleService";

function VehicleFormDialog({

    open,

    onClose,

    onSubmit,

    mode,

    vehicle,

}) {

    const [depots, setDepots] = useState([]);

    const [categories, setCategories] = useState([]);

    const [form, setForm] = useState({

        VIN: "",

        RegistrationNumber: "",

        Manufacturer: "",

        Model: "",

        ManufactureYear: "",

        CurrentOdometer: 0,

        OperationalStatus: "Available",

        DepotID: "",

        VehicleCategoryID: "",

    });

    useEffect(() => {

        loadDropdowns();

    }, []);

    useEffect(() => {

        if (vehicle) {

            setForm({

                ...vehicle,

            });

        }

    }, [vehicle]);

    async function loadDropdowns() {

        const depotData = await getDepots();

        const categoryData = await getVehicleCategories();

        setDepots(depotData);

        setCategories(categoryData);

    }

    function handleChange(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value,

        });

    }

    return (

        <Dialog

            open={open}

            onClose={onClose}

            maxWidth="md"

            fullWidth

        >

            <DialogTitle>

                {

                    mode === "add"

                        ? "Add Vehicle"

                        : "Edit Vehicle"

                }

            </DialogTitle>

            <DialogContent>

                <Grid

                    container

                    spacing={2}

                    mt={1}

                >

                    <Grid size={6}>

                        <TextField

                            fullWidth

                            label="VIN"

                            name="VIN"

                            value={form.VIN}

                            onChange={handleChange}

                            disabled={mode === "edit"}

                        />

                    </Grid>

                    <Grid size={6}>

                        <TextField

                            fullWidth

                            label="Registration"

                            name="RegistrationNumber"

                            value={form.RegistrationNumber}

                            onChange={handleChange}

                        />

                    </Grid>

                    <Grid size={6}>

                        <TextField

                            fullWidth

                            label="Manufacturer"

                            name="Manufacturer"

                            value={form.Manufacturer}

                            onChange={handleChange}

                        />

                    </Grid>

                    <Grid size={6}>

                        <TextField

                            fullWidth

                            label="Model"

                            name="Model"

                            value={form.Model}

                            onChange={handleChange}

                        />

                    </Grid>

                    <Grid size={4}>

                        <TextField

                            fullWidth

                            label="Year"

                            name="ManufactureYear"

                            value={form.ManufactureYear}

                            onChange={handleChange}

                        />

                    </Grid>

                    <Grid size={4}>

                        <TextField

                            fullWidth

                            label="Odometer"

                            name="CurrentOdometer"

                            value={form.CurrentOdometer}

                            onChange={handleChange}

                        />

                    </Grid>

                    <Grid size={4}>

                        <TextField

                            select

                            fullWidth

                            label="Status"

                            name="OperationalStatus"

                            value={form.OperationalStatus}

                            onChange={handleChange}

                        >

                            <MenuItem value="Available">

                                Available

                            </MenuItem>

                            <MenuItem value="Assigned">

                                Assigned

                            </MenuItem>

                            <MenuItem value="Maintenance">

                                Maintenance

                            </MenuItem>

                            <MenuItem value="OutOfService">

                                Out Of Service

                            </MenuItem>

                        </TextField>

                    </Grid>

                    <Grid size={6}>

                        <TextField

                            select

                            fullWidth

                            label="Depot"

                            name="DepotID"

                            value={form.DepotID}

                            onChange={handleChange}

                        >

                            {

                                depots.map(depot => (

                                    <MenuItem

                                        key={depot.DepotID}

                                        value={depot.DepotID}

                                    >

                                        {depot.DepotName}

                                    </MenuItem>

                                ))

                            }

                        </TextField>

                    </Grid>

                    <Grid size={6}>

                        <TextField

                            select

                            fullWidth

                            label="Vehicle Category"

                            name="VehicleCategoryID"

                            value={form.VehicleCategoryID}

                            onChange={handleChange}

                        >

                            {

                                categories.map(category => (

                                    <MenuItem

                                        key={category.VehicleCategoryID}

                                        value={category.VehicleCategoryID}

                                    >

                                        {category.CategoryName}

                                    </MenuItem>

                                ))

                            }

                        </TextField>

                    </Grid>

                </Grid>

            </DialogContent>

            <DialogActions>

                <Button

                    onClick={onClose}

                >

                    Cancel

                </Button>

                <Button

                    variant="contained"

                    onClick={() => onSubmit(form)}

                >

                    Save

                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default VehicleFormDialog;