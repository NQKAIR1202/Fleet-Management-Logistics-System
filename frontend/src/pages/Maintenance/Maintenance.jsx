import { useEffect, useState } from "react";

import {
    Typography,
    Box,
    CircularProgress,
    Stack,
} from "@mui/material";

import MaintenanceToolbar from "../../components/maintenance/MaintenanceToolbar";
import MaintenanceTable from "../../components/maintenance/MaintenanceTable";
import MaintenanceDetailsDialog from "../../components/maintenance/MaintenanceDetailsDialog";
import MaintenanceFormDialog from "../../components/maintenance/MaintenanceFormDialog";
import DeleteMaintenanceDialog from "../../components/maintenance/DeleteMaintenanceDialog";

import {

    getMaintenanceJobs,

    createMaintenanceJob,

    updateMaintenanceJob,

    deleteMaintenanceJob,

    getJobActivities,

    getActivityParts,

    getActivityMechanics,

} from "../../services/maintenanceService";

import { useAuth } from "../../context/AuthContext";

import {

    canCreate,

    canEdit,

    canDelete,

} from "../../utils/permissions";

function Maintenance() {

    const [jobs, setJobs] = useState([]);

    const [filteredJobs, setFilteredJobs] = useState([]);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    const [loading, setLoading] = useState(true);

    const [selectedJob, setSelectedJob] = useState(null);

    const [dialogOpen, setDialogOpen] = useState(false);

    const [activities, setActivities] = useState([]);

    const [formOpen, setFormOpen] = useState(false);

    const [mode, setMode] = useState("add");

    const [editingJob, setEditingJob] = useState(null);

    const [deleteOpen, setDeleteOpen] = useState(false);

    const [deletingJob, setDeletingJob] = useState(null);

    const { user } = useAuth();

    useEffect(() => {

        loadData();

    }, []);

    useEffect(() => {

      filterJobs();

  }, [

      jobs,

      search,

      statusFilter,

  ]);

    async function loadData() {

    try {

        const data = await getMaintenanceJobs();

        setJobs(data);

        setFilteredJobs(data);

    }

    catch (err) {

        console.error(err);

    }

    finally {

        setLoading(false);

    }

}

    function filterJobs() {

    const keyword = search.toLowerCase();

    const result = jobs.filter(job => {

        const matchSearch =

            String(job.JobID).includes(keyword) ||

            job.VIN.toLowerCase().includes(keyword);

        const matchStatus =

            statusFilter === "All" ||

            job.JobStatus === statusFilter;

        return matchSearch && matchStatus;

    });

    setFilteredJobs(result);

}   

    async function handleView(job) {

        try {

            const activityData = await getJobActivities(
                job.JobID
            );

            console.log(
                  "JOB:",
                  job.JobID
              );

              console.log(
                  activityData
              );

            for (const activity of activityData) {

                activity.parts =
                    await getActivityParts(
                        activity.ActivityID
                    );

                activity.mechanics =
                    await getActivityMechanics(
                        activity.ActivityID
                    );

            }

            setActivities(activityData);

            setSelectedJob(job);

            setDialogOpen(true);

        }

        catch (err) {

            console.error(err);

        }

    }

    function handleClose() {

    setDialogOpen(false);

    setSelectedJob(null);

}

    function handleAdd() {

        setMode("add");
        setEditingJob(null);
        setFormOpen(true);

    }

    function handleEdit(job) {

        setMode("edit");
        setEditingJob(job);
        setFormOpen(true);

    }

    function handleDelete(job) {

        setDeletingJob(job);
        setDeleteOpen(true);

    }

    async function confirmDelete() {

        try {

            await deleteMaintenanceJob(

    deletingJob.JobID

);

            setDeleteOpen(false);
            setDeletingJob(null);

            await loadData();

        } catch (err) {

            console.error(err);

        }

    }

    function handleFormClose() {

        setFormOpen(false);
        setEditingJob(null);

    }

    async function handleSave(job) {

    try {

        if (mode === "add") {

            await createMaintenanceJob(job);

        }

        else {

            await updateMaintenanceJob(

                editingJob.JobID,

                job,

            );

        }

        handleFormClose();

        await loadData();

    }

    catch (err) {

        console.error(err);

    }

}

    function handleResetFilters() {

    setSearch("");

    setStatusFilter("All");


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
                Maintenance
            </Typography>

            <Typography
                variant="h6"
                color="text.secondary"
            >
                Manage maintenance jobs.
            </Typography>

        </Box>

        <MaintenanceToolbar

            search={search}
            setSearch={setSearch}

            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}

            onReset={handleResetFilters}

            onAdd={handleAdd}

            canCreate={canCreate(user)}

        />

        <MaintenanceTable

            jobs={filteredJobs}

            onView={handleView}

            onEdit={handleEdit}

            onDelete={handleDelete}

            canEdit={canEdit(user)}

            canDelete={canDelete(user)}

        />

        <MaintenanceDetailsDialog
            open={dialogOpen}
            job={selectedJob}
            activities={activities}
            onClose={handleClose}
        />

        <MaintenanceFormDialog

            open={formOpen}

            mode={mode}

            job={editingJob}

            onClose={handleFormClose}

            onSubmit={handleSave}

        />

        <DeleteMaintenanceDialog

            open={deleteOpen}

            job={deletingJob}

            onClose={() => {

                setDeleteOpen(false);

                setDeletingJob(null);

            }}

            onConfirm={confirmDelete}

        />

    </Stack>

);

}

export default Maintenance;