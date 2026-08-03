from pydantic import BaseModel
from datetime import date
from pydantic import BaseModel
from datetime import datetime, date


class DashboardSummary(BaseModel):

    totalVehicles: int

    totalDrivers: int

    openJobs: int

    totalSafetyEvents: int

    totalDowntimeHours: float

    totalMaintenanceCost: float
    
class DashboardResponse(BaseModel):
    totalVehicles: int
    totalDrivers: int
    openJobs: int
    totalSafetyEvents: int
    totalDowntimeHours: float
    totalMaintenanceCost: float


class MonthlyTrendResponse(BaseModel):
    Month: str
    Jobs: int
    
class JobStatusResponse(BaseModel):
    
    Status: str

    Count: int
    
class TopVehicleResponse(BaseModel):
    VIN: str
    Depot: str
    Jobs: int
    Downtime: float
    Status: str

    class Config:
        from_attributes = True
        
class CostByModelResponse(BaseModel):
    
    Model: str

    Cost: float

    class Config:

        from_attributes = True
        
class PredictiveAlertResponse(BaseModel):
    
    AlertID: int

    VIN: str

    AlertType: str

    AlertTimestamp: datetime

    Severity: str

    AlertStatus: str

    ActionTaken: str | None

    ResolvedDate: date | None

    class Config:

        from_attributes = True
        
class WorkshopWorkload(BaseModel):
    
    Mechanic: str

    Workshop: str

    Jobs: int
    
class HighRiskDriver(BaseModel):
    
    DriverID: int
    FullName: str
    FinalScore: float
    TotalPenalty: int
    CriticalEventCount: int
    RequiresCoaching: int

    class Config:

        from_attributes = True
        
class LicenceExpiry(BaseModel):
    
    DriverID: int

    FullName: str

    Licence: str

    ExpiryDate: date

    class Config:

        from_attributes = True
        
        
from pydantic import BaseModel
from datetime import datetime, date

class WorkshopWorkloadSchema(BaseModel):
    Mechanic: str
    Workshop: str
    Jobs: int

class VehicleDowntimeSchema(BaseModel):
    VIN: str
    Model: str
    Downtime: float
    Status: str

class PartsThresholdSchema(BaseModel):
    Part: str
    Stock: int
    Threshold: int

class SupplierPerformanceSchema(BaseModel):
    Supplier: str
    LeadTime: int
    Parts: int

class HighRiskDriverSchema(BaseModel):
    DriverID: int
    FullName: str
    FinalScore: float
    TotalPenalty: int
    CriticalEventCount: int
    RequiresCoaching: bool

class LicenceExpirySchema(BaseModel):
    DriverID: int
    FullName: str
    Licence: str
    ExpiryDate: date