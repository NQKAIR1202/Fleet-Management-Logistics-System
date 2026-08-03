from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel


class MaintenanceResponse(BaseModel):

    JobID: int

    VIN: str

    WorkshopID: int

    AlertID: int | None

    DateOpened: datetime

    DateClosed: datetime | None

    DowntimeHours: Decimal | None

    TotalCostVND: Decimal | None

    JobStatus: str

    class Config:

        from_attributes = True


class MaintenanceUpdate(BaseModel):

    JobStatus: str


class MaintenanceCreate(BaseModel):

    VIN: str

    WorkshopID: int

    AlertID: int | None = None
    
    DateOpened: datetime    

    JobStatus: str = "Open"