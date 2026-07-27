from pydantic import BaseModel, ConfigDict


class DepotResponse(BaseModel):

    DepotID: int
    DepotName: str
    City: str

    model_config = ConfigDict(from_attributes=True)