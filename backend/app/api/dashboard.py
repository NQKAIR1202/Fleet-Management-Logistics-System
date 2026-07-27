from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.crud.dashboard import get_summary

from app.schemas.dashboard import DashboardSummary
from app.crud.dashboard import get_summary, get_charts
from app.schemas.dashboard import (
    DashboardSummary,
    DashboardCharts,
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get(
    "/summary",
    response_model=DashboardSummary
)
def dashboard_summary(
    db: Session = Depends(get_db)
):

    return get_summary(db)


@router.get(
    "/charts",
    response_model=DashboardCharts
)
def dashboard_charts(
    db: Session = Depends(get_db)
):

    return get_charts(db)

@router.get("/recent-alerts")
def get_recent_alerts(db: Session = Depends(get_db)):

    alerts = (
        db.query(SafetyEvent)
        .order_by(SafetyEvent.EventDate.desc())
        .limit(5)
        .all()
    )

    return [
        {
            "vehicle": alert.VIN,
            "type": alert.EventType,
            "severity": alert.Severity,
        }
        for alert in alerts
    ]