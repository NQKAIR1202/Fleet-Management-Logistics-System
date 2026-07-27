import { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

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
} from "../../services/vehicleService";

function Vehicles() {

    const [vehicles, setVehicles] = useState([]);
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const [formOpen, setFormOpen] = useState(false);
    const [mode, setMode] = useState("add");
    const [editingVehicle, setEditingVehicle] = useState(null);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deletingVehicle, setDeletingVehicle] = useState(null);

    useEffect(() => {
        loadVehicles();
    }, []);

    useEffect(() => {
        filterVehicles();
    }, [search, vehicles]);

    async function loadVehicles() {

        try {

            const data = await getVehicles();

            // Soft Delete: ẩn xe đã Retired
            const activeVehicles = data.filter(
                vehicle => vehicle.OperationalStatus !== "Retired"
            );

            setVehicles(activeVehicles);
            setFilteredVehicles(activeVehicles);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }
    }

    function filterVehicles() {

        const keyword = search.toLowerCase();

        const result = vehicles.filter(vehicle =>

            vehicle.VIN.toLowerCase().includes(keyword) ||

            vehicle.RegistrationNumber.toLowerCase().includes(keyword) ||

            (vehicle.Manufacturer ?? "").toLowerCase().includes(keyword) ||

            (vehicle.Model ?? "").toLowerCase().includes(keyword)

        );

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

    if (loading) {

        return (

            <Box
                display="flex"
                justifyContent="center"
                mt={10}
            >
                <CircularProgress />
            </Box>

        );

    }

    return (

        <>

            <Typography
                variant="h4"
                fontWeight="bold"
            >
                Vehicles
            </Typography>

            <Typography
                color="text.secondary"
                mb={3}
            >
                Manage all fleet vehicles.
            </Typography>

            <VehicleToolbar
                search={search}
                setSearch={setSearch}
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

        </>

    );

}

export default Vehicles;