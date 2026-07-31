from datetime import datetime
from pydantic import BaseModel


class SafetyEventResponse(BaseModel):
    EventID: int
    EventTimestamp: datetime

    VIN: str

    Driver: str

    EventType: str

    Severity: str

    Status: str

    class Config:
        from_attributes = True