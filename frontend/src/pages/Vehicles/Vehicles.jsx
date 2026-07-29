import { useEffect, useState } from "react";

import {
    Typography,
    Box,
    CircularProgress,
    Stack,
} from "@mui/material";

import VehicleToolbar from "../../components/vehicles/VehicleToolbar";
import VehicleTable from "../../components/vehicles/VehicleTable";
import VehicleDetailsDialog from "../../components/vehicles/VehicleDetailsDialog";
import VehicleFormDialog from "../../components/vehicles/VehicleFormDialog";
import DeleteVehicleDialog from "../../components/vehicles/DeleteVehicleDialog";

import {
    getVehicles,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    getDepots,
    getVehicleCategories,
} from "../../services/vehicleService";

function Vehicles() {

    const [vehicles, setVehicles] = useState([]);
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [depotFilter, setDepotFilter] = useState("All");

    const [categoryFilter, setCategoryFilter] = useState("All");

    const [manufacturerFilter, setManufacturerFilter] = useState("All");

    const [depots, setDepots] = useState([]);

    const [categories, setCategories] = useState([]);

    const [manufacturers, setManufacturers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [formOpen, setFormOpen] = useState(false);
    const [mode, setMode] = useState("add");
    const [editingVehicle, setEditingVehicle] = useState(null);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deletingVehicle, setDeletingVehicle] = useState(null);

    useEffect(() => {

        loadData();

    }, []);

    useEffect(() => {

        filterVehicles();

   }, [

    search,

    statusFilter,

    depotFilter,

    categoryFilter,

    manufacturerFilter,

    vehicles,

]);

    async function loadData() {

    try {

        const [

            vehicleData,

            depotData,

            categoryData,

        ] = await Promise.all([

            getVehicles(),

            getDepots(),

            getVehicleCategories(),

        ]);

        const activeVehicles = vehicleData.filter(

            vehicle =>

                vehicle.OperationalStatus !== "Retired"

        );

        setVehicles(activeVehicles);

        setFilteredVehicles(activeVehicles);

        setDepots(depotData);

        setCategories(categoryData);

        setManufacturers(

            [

                ...new Set(

                    activeVehicles

                        .map(v => v.Manufacturer)

                        .filter(Boolean)

                ),

            ].sort()

        );

    }

    catch (err) {

        console.error(err);

    }

    finally {

        setLoading(false);

    }

}

    function filterVehicles() {

    const keyword = search.toLowerCase();

    const result = vehicles.filter(vehicle => {

        const matchSearch =

            vehicle.VIN.toLowerCase().includes(keyword) ||

            vehicle.RegistrationNumber.toLowerCase().includes(keyword) ||

            (vehicle.Manufacturer ?? "")

                .toLowerCase()

                .includes(keyword) ||

            (vehicle.Model ?? "")

                .toLowerCase()

                .includes(keyword);

        const matchStatus =

            statusFilter === "All" ||

            vehicle.OperationalStatus === statusFilter;

        const matchDepot =

            depotFilter === "All" ||

            vehicle.DepotID === Number(depotFilter);

        const matchCategory =

            categoryFilter === "All" ||

            vehicle.VehicleCategoryID === Number(categoryFilter);

        const matchManufacturer =

            manufacturerFilter === "All" ||

            vehicle.Manufacturer === manufacturerFilter;

        return (

            matchSearch &&

            matchStatus &&

            matchDepot &&

            matchCategory &&

            matchManufacturer

        );

    });

    setFilteredVehicles(result);

}   

    function handleView(vehicle) {

        setSelectedVehicle(vehicle);
        setDialogOpen(true);

    }

    function handleClose() {

        setDialogOpen(false);
        setSelectedVehicle(null);

    }

    function handleAdd() {

        setMode("add");
        setEditingVehicle(null);
        setFormOpen(true);

    }

    function handleEdit(vehicle) {

        setMode("edit");
        setEditingVehicle(vehicle);
        setFormOpen(true);

    }

    function handleDelete(vehicle) {

        setDeletingVehicle(vehicle);
        setDeleteOpen(true);

    }

    async function confirmDelete() {

        try {

            await deleteVehicle(deletingVehicle.VIN);

            setDeleteOpen(false);
            setDeletingVehicle(null);

            await loadVehicles();

        } catch (err) {

            console.error(err);

        }

    }

    function handleFormClose() {

        setFormOpen(false);
        setEditingVehicle(null);

    }

    async function handleSave(vehicle) {

        try {

            if (mode === "add") {

                await createVehicle(vehicle);

            } else {

                await updateVehicle(
                    editingVehicle.VIN,
                    vehicle
                );

            }

            handleFormClose();

            await loadVehicles();

        } catch (err) {

            console.error(err);

        }

    }

    function handleResetFilters() {

    setSearch("");

    setStatusFilter("All");

    setDepotFilter("All");

    setCategoryFilter("All");

    setManufacturerFilter("All");

}

    if (loading) {

        return (

            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="70vh"
            >
                <CircularProgress />
            </Box>

        );

    }

    return (

        <Stack spacing={4}>

            <Box>

                <Typography
                    variant="h3"
                    fontWeight={700}
                    gutterBottom
                >
                    Vehicles
                </Typography>

                <Typography
                    variant="h6"
                    color="text.secondary"
                >
                    Manage all fleet vehicles.
                </Typography>

            </Box>

            <VehicleToolbar
                search={search}
                setSearch={setSearch}

                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}

                depotFilter={depotFilter}
                setDepotFilter={setDepotFilter}

                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}

                manufacturerFilter={manufacturerFilter}
                setManufacturerFilter={setManufacturerFilter}

                depots={depots}
                categories={categories}
                manufacturers={manufacturers}

                onReset={handleResetFilters}

                onAdd={handleAdd}
            />

            <VehicleTable
                vehicles={filteredVehicles}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <VehicleDetailsDialog
                open={dialogOpen}
                vehicle={selectedVehicle}
                onClose={handleClose}
            />

            <VehicleFormDialog
                open={formOpen}
                mode={mode}
                vehicle={editingVehicle}
                onClose={handleFormClose}
                onSubmit={handleSave}
            />

            <DeleteVehicleDialog
                open={deleteOpen}
                vehicle={deletingVehicle}
                onClose={() => {

                    setDeleteOpen(false);
                    setDeletingVehicle(null);

                }}
                onConfirm={confirmDelete}
            />

        </Stack>

    );

}

export default Vehicles;