from pydantic import BaseModel


class DashboardSummary(BaseModel):

    totalVehicles: int

    availableVehicles: int

    assignedVehicles: int

    maintenanceVehicles: int

    totalDrivers: int

    openMaintenanceJobs: int

    openAlerts: int
    
from pydantic import BaseModel


class VehicleStatusChart(BaseModel):

    status: str

    count: int


class ManufacturerChart(BaseModel):

    manufacturer: str

    count: int


class DashboardCharts(BaseModel):

    vehicleStatus: list[VehicleStatusChart]

    manufacturerDistribution: list[ManufacturerChart]