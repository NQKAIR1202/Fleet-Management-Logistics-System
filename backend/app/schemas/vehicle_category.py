from pydantic import BaseModel, ConfigDict


class VehicleCategoryResponse(BaseModel):

    VehicleCategoryID: int
    CategoryName: str

    model_config = ConfigDict(from_attributes=True)