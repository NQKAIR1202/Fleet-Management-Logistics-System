from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.schemas.reports import *
# (
#     DashboardResponse,
#     MonthlyTrendResponse,
#     JobStatusResponse,
#     TopVehicleResponse,
#     CostByModelResponse,
#     PredictiveAlertResponse,
#     WorkshopWorkload,
#     HighRiskDriver,
#     LicenceExpiry,
# )

from app.crud.reports import (
    get_dashboard_summary,
    get_monthly_trend,
    get_job_status_summary,
    get_top_vehicles,
    get_cost_by_model,
    get_predictive_alerts,
    get_workshop_workload,
    get_high_risk_drivers,
    get_licence_expiry,
    get_vehicle_downtime,
    get_parts_threshold,
    get_supplier_performance,
    get_high_risk_drivers,
    get_licence_expiry,
    get_driver_incidents,
    get_unresolved_incidents,
    get_retraining_required,
    get_depot_safety_trends,
)

from sqlalchemy.orm import Session
from fastapi import Depends



router = APIRouter(
    prefix="/reports",
    tags=["Reports"],
)


@router.get(
    "/dashboard",
    response_model=DashboardResponse,
)
def dashboard(
    db: Session = Depends(get_db),
):
    return get_dashboard_summary(db)


@router.get(
    "/monthly-trend",
    response_model=list[MonthlyTrendResponse],
)
def monthly_trend(
    db: Session = Depends(get_db),
):
    return get_monthly_trend(db)

@router.get(

    "/job-status",

    response_model=list[JobStatusResponse]

)

def job_status(

    db: Session = Depends(get_db)

):

    return get_job_status_summary(db)

@router.get(

    "/top-vehicles",

    response_model=list[TopVehicleResponse]

)

def top_vehicles(

    db: Session = Depends(get_db)

):

    return get_top_vehicles(db)

@router.get(

    "/cost-by-model",

    response_model=list[CostByModelResponse]

)

def cost_by_model(

    db: Session = Depends(get_db)

):

    return get_cost_by_model(db)

@router.get(
    "/predictive-alerts",
    response_model=list[PredictiveAlertResponse]
)
def predictive_alerts(
    db: Session = Depends(get_db)
):
    return get_predictive_alerts(db)


@router.get(

    "/workshop-workload",

    response_model=list[WorkshopWorkload]

)

def workshop_workload(

    db: Session = Depends(get_db)

):

    return get_workshop_workload(db)

@router.get(
    "/high-risk-drivers",
    response_model=list[HighRiskDriver],
)

def high_risk_drivers(db: Session = Depends(get_db)):

    return get_high_risk_drivers(db)

@router.get(
    "/licence-expiry",
    response_model=list[LicenceExpiry],
)

def licence_expiry(

    db: Session = Depends(get_db)

):

    return get_licence_expiry(db)

@router.get(
    "/workshop-workload",
    response_model=list[WorkshopWorkloadSchema],
)
def workshop_workload(db: Session = Depends(get_db)):
    return get_workshop_workload(db)


@router.get(
    "/vehicle-downtime",
    response_model=list[VehicleDowntimeSchema],
)
def vehicle_downtime(db: Session = Depends(get_db)):
    return get_vehicle_downtime(db)


@router.get(
    "/parts-threshold",
    response_model=list[PartsThresholdSchema],
)
def parts_threshold(db: Session = Depends(get_db)):
    return get_parts_threshold(db)


@router.get(
    "/supplier-performance",
    response_model=list[SupplierPerformanceSchema],
)
def supplier_performance(db: Session = Depends(get_db)):
    return get_supplier_performance(db)


@router.get(
    "/high-risk-drivers",
    response_model=list[HighRiskDriverSchema],
)
def high_risk_drivers(db: Session = Depends(get_db)):
    return get_high_risk_drivers(db)


@router.get(
    "/licence-expiry",
    response_model=list[LicenceExpirySchema],
)
def licence_expiry(db: Session = Depends(get_db)):
    return get_licence_expiry(db)


@router.get("/parts-threshold")
def parts_threshold(db: Session = Depends(get_db)):
    return get_parts_threshold(db)

@router.get("/driver-incidents")
def driver_incidents(db: Session = Depends(get_db)):
    return get_driver_incidents(db)


@router.get("/unresolved-incidents")
def unresolved_incidents(db: Session = Depends(get_db)):
    return get_unresolved_incidents(db)

@router.get("/retraining-required")
def retraining_required(db: Session = Depends(get_db)):
    return get_retraining_required(db)

@router.get("/depot-safety-trends")
def depot_safety_trends(db: Session = Depends(get_db)):
    return get_depot_safety_trends(db)