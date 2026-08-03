  import { useEffect, useMemo, useState } from "react";

  import {
      Box,
      CircularProgress,
      Paper,
      Stack,
      Typography,
  } from "@mui/material";

  import { useAuth } from "../../context/AuthContext";

import {

    canCreate,

    canEdit,

    canDelete,

} from "../../utils/permissions";

import DriverToolbar from "../../components/driver/DriverToolbar";
import DriverTable from "../../components/driver/DriverTable";
import DriverStatistics from "../../components/driver/DriverStatistics";
import AddDriverDialog from "../../components/driver/AddDriverDialog";
import ViewDriverDialog from "../../components/driver/ViewDriverDialog";
import EditDriverDialog from "../../components/driver/EditDriverDialog";
import DeleteDriverDialog from "../../components/driver/DeleteDriverDialog";

import { getDrivers, deleteDriver, } from "../../services/driverService";

  function Driver() {

      const [drivers, setDrivers] = useState([]);
      const [loading, setLoading] = useState(true);

      const [search, setSearch] = useState("");

      const [status, setStatus] = useState("");

      const [depot, setDepot] = useState("");

      const [licence, setLicence] = useState("");

      const [openAdd, setOpenAdd] = useState(false);

      const [openView, setOpenView] = useState(false);

      const [openEdit, setOpenEdit] = useState(false);

      const [selectedDriverId, setSelectedDriverId] = useState(null);

      const [openDelete, setOpenDelete] = useState(false);

      const [deleteLoading, setDeleteLoading] = useState(false);

      const [selectedDriver, setSelectedDriver] = useState(null);

      const { user } = useAuth();


      useEffect(() => {

          loadDrivers();

      }, []);

      async function loadDrivers() {

          try {

              const data = await getDrivers();

              setDrivers(data);

          }

          catch (err) {

              console.error(err);

          }

          finally {

              setLoading(false);

          }

      }

      async function handleDeleteDriver() {

        if (!selectedDriver) return;

        try {

            setDeleteLoading(true);

            await deleteDriver(selectedDriver.DriverID);

            setOpenDelete(false);

            setSelectedDriver(null);

            await loadDrivers();

        }

        catch (error) {

            console.error(error);

            alert("Delete failed.");

        }

        finally {

            setDeleteLoading(false);

        }

    }

      const depots = useMemo(() => {

          return [...new Set(drivers.map(driver => driver.Depot))].sort();

      }, [drivers]);

      const filteredDrivers = useMemo(() => {

          const keyword = search.trim().toLowerCase();

          return drivers.filter(driver => {

              const phone =
                  driver.ContactInfo?.split("|")[0]?.trim().toLowerCase() || "";

              const email =
                  driver.ContactInfo?.split("|")[1]?.trim().toLowerCase() || "";

              const matchSearch =

                  keyword === "" ||

                  driver.FullName.toLowerCase().includes(keyword) ||

                  phone.includes(keyword) ||

                  email.includes(keyword);

              const matchStatus =

                  status === "" ||

                  driver.EmploymentStatus === status;

              const matchDepot =

                  depot === "" ||

                  driver.Depot === depot;

              const matchLicence =

                  licence === "" ||

                  driver.LicenceType === licence;

              return (

                  matchSearch &&

                  matchStatus &&

                  matchDepot &&

                  matchLicence

              );

          });

      }, [

          drivers,

          search,

          status,

          depot,

          licence,

      ]);

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
        <>

          <Stack spacing={4}>

              <Box>

                  <Typography
                      variant="h3"
                      fontWeight={700}
                      gutterBottom
                  >

                      Drivers

                  </Typography>

                  <Typography
                      variant="h6"
                      color="text.secondary"
                  >

                      Manage all company drivers.

                  </Typography>

              </Box>

              <Paper
                  elevation={2}
                  sx={{
                      p: 3,
                      borderRadius: 2,
                  }}
              >

                  <DriverToolbar

                      search={search}
                      setSearch={setSearch}

                      status={status}
                      setStatus={setStatus}

                      depot={depot}
                      setDepot={setDepot}

                      licence={licence}
                      setLicence={setLicence}

                      depots={depots}

                      onAddClick={() => setOpenAdd(true)}
                      
                      canCreate={canCreate(user)}

                  />

              </Paper>

              <DriverStatistics drivers={filteredDrivers} />

              <Paper
                  elevation={2}
                  sx={{
                      p: 3,
                      borderRadius: 1,
                  }}
              >

                  <Typography
                      variant="h6"
                      fontWeight={600}
                      mb={2}
                  >

                      Drivers ({filteredDrivers.length})

                  </Typography>

                  <DriverTable
                    drivers={filteredDrivers}

                    onView={(driverId) => {

                        setSelectedDriverId(driverId);

                        setOpenView(true);

                    }}

                    onEdit={(driverId) => {

                        setSelectedDriverId(driverId);

                        setOpenEdit(true);

                    }}

                    onDelete={(driver) => {

                        setSelectedDriver(driver);

                        setOpenDelete(true);

                    }}

                    canEdit={canEdit(user)}

                    canDelete={canDelete(user)}   
                />

              </Paper>

          </Stack>

          <AddDriverDialog
              open={openAdd}
              onClose={() => setOpenAdd(false)}
              onSuccess={loadDrivers}
          />
          <ViewDriverDialog
              open={openView}
              driverId={selectedDriverId}
              onClose={() => setOpenView(false)}
          />
          <EditDriverDialog
              open={openEdit}
              driverId={selectedDriverId}
              onClose={() => setOpenEdit(false)}
              onSuccess={loadDrivers}
          />
          <DeleteDriverDialog
              open={openDelete}
              onClose={() => setOpenDelete(false)}
              loading={deleteLoading}
              driverName={selectedDriver?.FullName}
              onConfirm={handleDeleteDriver}
          />
        </>

      );

  }

  export default Driver;