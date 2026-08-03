from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from app.database.connection import engine
from app.api.vehicle import router as vehicle_router
from app.api.dashboard import router as dashboard_router
from app.api import depot
from app.api import vehicle_category
from app.api import safety
from app.api import driver
from app.api import auth
from app.api import maintenance
from app.api import reports




app = FastAPI(
    title="Fleet Management API",
    version="1.0.0",
    description="Fleet Management System Backend",
)

app.include_router(dashboard_router)

# origins = [
#     "http://localhost:5173",
# ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(vehicle_router)

app.include_router(driver.router)

app.include_router(depot.router)

app.include_router(vehicle_category.router)

app.include_router(safety.router)

app.include_router(auth.router)

app.include_router(
    maintenance.router
)
app.include_router(reports.router)

@app.get("/")
def root():
    return {
        "message": "Fleet Management API is running."
    }


@app.get("/health")
def health():
    return {
        "status": "OK"
    }
    
    
@app.get("/database")
def database_test():

    with engine.connect() as connection:

        result = connection.execute(
            text("SELECT DATABASE();")
        )

        database = result.scalar()

    return {
        "database": database,
        "status": "Connected Successfully"
    }