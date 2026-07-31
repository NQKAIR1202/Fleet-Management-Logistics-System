from typing import Any, Optional
import datetime
import decimal
import enum

from sqlalchemy import Column, DECIMAL, Date, DateTime, Enum, ForeignKeyConstraint, Index, Integer, String, Table, Text, text
from sqlalchemy.dialects.mysql import ENUM, TINYINT, YEAR
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

class Base(DeclarativeBase):
    pass


class DriverEmploymentstatus(str, enum.Enum):
    ACTIVE = 'Active'
    INACTIVE = 'Inactive'
    ON_LEAVE = 'On Leave'
    SUSPENDED = 'Suspended'


class DrivercertificationStatus(str, enum.Enum):
    VALID = 'Valid'
    EXPIRED = 'Expired'
    SUSPENDED = 'Suspended'


class DrivercoachingStatus(str, enum.Enum):
    SCHEDULED = 'Scheduled'
    COMPLETED = 'Completed'
    CANCELLED = 'Cancelled'


class MaintenanceactivityActivitystatus(str, enum.Enum):
    PENDING = 'Pending'
    IN_PROGRESS = 'In Progress'
    COMPLETED = 'Completed'


class MaintenancejobJobstatus(str, enum.Enum):
    OPEN = 'Open'
    IN_PROGRESS = 'In Progress'
    COMPLETED = 'Completed'
    CANCELLED = 'Cancelled'


class MechanicEmploymentstatus(str, enum.Enum):
    ACTIVE = 'Active'
    INACTIVE = 'Inactive'


class PredictivealertAlertstatus(str, enum.Enum):
    OPEN = 'Open'
    IN_PROGRESS = 'In Progress'
    RESOLVED = 'Resolved'


class SafetyeventReviewstatus(str, enum.Enum):
    PENDING = 'Pending'
    REVIEWED = 'Reviewed'


class VehicleOperationalstatus(str, enum.Enum):
    AVAILABLE = 'Available'
    ASSIGNED = 'Assigned'
    MAINTENANCE = 'Maintenance'
    OUTOFSERVICE = 'OutOfService'
    RETIRED = 'Retired'


class VehicleassignmentAssignmentstatus(str, enum.Enum):
    ACTIVE = 'Active'
    COMPLETED = 'Completed'
    CANCELLED = 'Cancelled'


class WarrantyclaimClaimstatus(str, enum.Enum):
    SUBMITTED = 'Submitted'
    APPROVED = 'Approved'
    REJECTED = 'Rejected'
    PAID = 'Paid'


class Activitytype(Base):
    __tablename__ = 'activitytype'

    ActivityTypeID: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    ActivityTypeName: Mapped[str] = mapped_column(String(100, 'utf8mb4_0900_ai_ci'), nullable=False)
    Description: Mapped[Optional[str]] = mapped_column(Text(collation='utf8mb4_0900_ai_ci'))

    certification: Mapped[list['Certification']] = relationship('Certification', secondary='activitytypecertification', back_populates='activitytype')
    maintenanceactivity: Mapped[list['Maintenanceactivity']] = relationship('Maintenanceactivity', back_populates='activitytype')


class Certification(Base):
    __tablename__ = 'certification'

    CertificationID: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    CertificationName: Mapped[str] = mapped_column(String(100, 'utf8mb4_0900_ai_ci'), nullable=False)
    CertificationType: Mapped[Optional[str]] = mapped_column(String(100, 'utf8mb4_0900_ai_ci'))
    Description: Mapped[Optional[str]] = mapped_column(Text(collation='utf8mb4_0900_ai_ci'))

    activitytype: Mapped[list['Activitytype']] = relationship('Activitytype', secondary='activitytypecertification', back_populates='certification')
    vehiclecategory: Mapped[list['Vehiclecategory']] = relationship('Vehiclecategory', secondary='vehiclecategorycertification', back_populates='certification')
    drivercertification: Mapped[list['Drivercertification']] = relationship('Drivercertification', back_populates='certification')
    mechaniccertification: Mapped[list['Mechaniccertification']] = relationship('Mechaniccertification', back_populates='certification')


class Depot(Base):
    __tablename__ = 'depot'

    DepotID: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    DepotName: Mapped[str] = mapped_column(String(100, 'utf8mb4_0900_ai_ci'), nullable=False)
    City: Mapped[str] = mapped_column(String(100, 'utf8mb4_0900_ai_ci'), nullable=False)
    Address: Mapped[Optional[str]] = mapped_column(String(255, 'utf8mb4_0900_ai_ci'))

    driver: Mapped[list['Driver']] = relationship('Driver', back_populates='depot')
    staff: Mapped[list['Staff']] = relationship('Staff', back_populates='depot')
    vehicle: Mapped[list['Vehicle']] = relationship('Vehicle', back_populates='depot')
    workshop: Mapped[list['Workshop']] = relationship('Workshop', back_populates='depot')
    safetyevent: Mapped[list['Safetyevent']] = relationship('Safetyevent', back_populates='depot')
    vehicleassignment: Mapped[list['Vehicleassignment']] = relationship('Vehicleassignment', back_populates='depot')


class Eventtype(Base):
    __tablename__ = 'eventtype'

    EventTypeID: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    EventTypeName: Mapped[str] = mapped_column(String(100, 'utf8mb4_0900_ai_ci'), nullable=False)
    Description: Mapped[Optional[str]] = mapped_column(Text(collation='utf8mb4_0900_ai_ci'))

    safetyevent: Mapped[list['Safetyevent']] = relationship('Safetyevent', back_populates='eventtype')


class Severity(Base):
    __tablename__ = 'severity'

    SeverityID: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    SeverityName: Mapped[str] = mapped_column(String(50, 'utf8mb4_0900_ai_ci'), nullable=False)
    PenaltyPoints: Mapped[int] = mapped_column(Integer, nullable=False)
    ReviewRequired: Mapped[Optional[int]] = mapped_column(TINYINT(1), server_default=text("'0'"))

    predictivealert: Mapped[list['Predictivealert']] = relationship('Predictivealert', back_populates='severity')
    safetyevent: Mapped[list['Safetyevent']] = relationship('Safetyevent', back_populates='severity')


class Supplier(Base):
    __tablename__ = 'supplier'

    SupplierID: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    SupplierName: Mapped[str] = mapped_column(String(100, 'utf8mb4_0900_ai_ci'), nullable=False)
    ContactInfo: Mapped[Optional[str]] = mapped_column(String(255, 'utf8mb4_0900_ai_ci'))
    Address: Mapped[Optional[str]] = mapped_column(String(255, 'utf8mb4_0900_ai_ci'))
    DeliveryLeadTimeDays: Mapped[Optional[int]] = mapped_column(Integer)

    part_BackupSupplierID: Mapped[list['Part']] = relationship('Part', foreign_keys='[Part.BackupSupplierID]', back_populates='supplier')
    part_PrimarySupplierID: Mapped[list['Part']] = relationship('Part', foreign_keys='[Part.PrimarySupplierID]', back_populates='supplier_')
    warrantyclaim: Mapped[list['Warrantyclaim']] = relationship('Warrantyclaim', back_populates='supplier')


class User(Base):
    __tablename__ = 'user'
    __table_args__ = (
        Index('UQ_User_Email', 'Email', unique=True),
    )

    UserID: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    FullName: Mapped[str] = mapped_column(String(100, 'utf8mb4_0900_ai_ci'), nullable=False)
    Email: Mapped[str] = mapped_column(String(255, 'utf8mb4_0900_ai_ci'), nullable=False)
    PasswordHash: Mapped[str] = mapped_column(String(255, 'utf8mb4_0900_ai_ci'), nullable=False)
    Role: Mapped[str] = mapped_column(String(50, 'utf8mb4_0900_ai_ci'), nullable=False, server_default=text("'Administrator'"))
    CreatedAt: Mapped[datetime.datetime] = mapped_column(DateTime, nullable=False, server_default=text('CURRENT_TIMESTAMP'))


class Vehiclecategory(Base):
    __tablename__ = 'vehiclecategory'

    VehicleCategoryID: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    CategoryName: Mapped[str] = mapped_column(String(100, 'utf8mb4_0900_ai_ci'), nullable=False)
    Description: Mapped[Optional[str]] = mapped_column(Text(collation='utf8mb4_0900_ai_ci'))

    certification: Mapped[list['Certification']] = relationship('Certification', secondary='vehiclecategorycertification', back_populates='vehiclecategory')
    vehicle: Mapped[list['Vehicle']] = relationship('Vehicle', back_populates='vehiclecategory')


t_activitytypecertification = Table(
    'activitytypecertification', Base.metadata,
    Column('ActivityTypeID', Integer, primary_key=True),
    Column('CertificationID', Integer, primary_key=True),
    ForeignKeyConstraint(['ActivityTypeID'], ['activitytype.ActivityTypeID'], name='FK_ATC_ActivityType'),
    ForeignKeyConstraint(['CertificationID'], ['certification.CertificationID'], name='FK_ATC_Certification'),
    Index('FK_ATC_Certification', 'CertificationID')
)


class Driver(Base):
    __tablename__ = 'driver'
    __table_args__ = (
        ForeignKeyConstraint(['DepotID'], ['depot.DepotID'], name='FK_Driver_Depot'),
        Index('FK_Driver_Depot', 'DepotID')
    )

    DriverID: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    FullName: Mapped[str] = mapped_column(String(100, 'utf8mb4_0900_ai_ci'), nullable=False)
    DepotID: Mapped[int] = mapped_column(Integer, nullable=False)
    LicenceType: Mapped[str] = mapped_column(String(50, 'utf8mb4_0900_ai_ci'), nullable=False)
    ContactInfo: Mapped[Optional[str]] = mapped_column(String(255, 'utf8mb4_0900_ai_ci'))
    LicenceExpiryDate: Mapped[Optional[datetime.date]] = mapped_column(Date)
    EmploymentStatus: Mapped[Optional[DriverEmploymentstatus]] = mapped_column(Enum(DriverEmploymentstatus, values_callable=lambda cls: [member.value for member in cls]))
    EmergencyContact: Mapped[Optional[str]] = mapped_column(String(255, 'utf8mb4_0900_ai_ci'))

    depot: Mapped['Depot'] = relationship('Depot', back_populates='driver')
    drivercertification: Mapped[list['Drivercertification']] = relationship('Drivercertification', back_populates='driver')
    driversafetyscore: Mapped[list['Driversafetyscore']] = relationship('Driversafetyscore', back_populates='driver')
    safetyevent: Mapped[list['Safetyevent']] = relationship('Safetyevent', back_populates='driver')
    vehicleassignment: Mapped[list['Vehicleassignment']] = relationship('Vehicleassignment', back_populates='driver')
    drivercoaching: Mapped[list['Drivercoaching']] = relationship('Drivercoaching', back_populates='driver')


class Part(Base):
    __tablename__ = 'part'
    __table_args__ = (
        ForeignKeyConstraint(['BackupSupplierID'], ['supplier.SupplierID'], name='FK_Part_BackupSupplier'),
        ForeignKeyConstraint(['PrimarySupplierID'], ['supplier.SupplierID'], name='FK_Part_PrimarySupplier'),
        Index('FK_Part_BackupSupplier', 'BackupSupplierID'),
        Index('FK_Part_PrimarySupplier', 'PrimarySupplierID')
    )

    PartID: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    PartName: Mapped[str] = mapped_column(String(100, 'utf8mb4_0900_ai_ci'), nullable=False)
    PrimarySupplierID: Mapped[int] = mapped_column(Integer, nullable=False)
    Description: Mapped[Optional[str]] = mapped_column(Text(collation='utf8mb4_0900_ai_ci'))
    UnitPriceVND: Mapped[Optional[decimal.Decimal]] = mapped_column(DECIMAL(12, 2))
    StockQuantity: Mapped[Optional[int]] = mapped_column(Integer, server_default=text("'0'"))
    ReorderThreshold: Mapped[Optional[int]] = mapped_column(Integer, server_default=text("'5'"))
    BackupSupplierID: Mapped[Optional[int]] = mapped_column(Integer)

    supplier: Mapped[Optional['Supplier']] = relationship('Supplier', foreign_keys=[BackupSupplierID], back_populates='part_BackupSupplierID')
    supplier_: Mapped['Supplier'] = relationship('Supplier', foreign_keys=[PrimarySupplierID], back_populates='part_PrimarySupplierID')
    activitypart: Mapped[list['Activitypart']] = relationship('Activitypart', back_populates='part')


class Staff(Base):
    __tablename__ = 'staff'
    __table_args__ = (
        ForeignKeyConstraint(['DepotID'], ['depot.DepotID'], name='FK_Staff_Depot'),
        Index('FK_Staff_Depot', 'DepotID')
    )

    StaffID: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    FullName: Mapped[str] = mapped_column(String(100, 'utf8mb4_0900_ai_ci'), nullable=False)
    Role: Mapped[str] = mapped_column(String(100, 'utf8mb4_0900_ai_ci'), nullable=False)
    DepotID: Mapped[int] = mapped_column(Integer, nullable=False)
    ContactInfo: Mapped[Optional[str]] = mapped_column(String(255, 'utf8mb4_0900_ai_ci'))

    depot: Mapped['Depot'] = relationship('Depot', back_populates='staff')
    safetyreview: Mapped[list['Safetyreview']] = relationship('Safetyreview', back_populates='staff')


class Vehicle(Base):
    __tablename__ = 'vehicle'
    __table_args__ = (
        ForeignKeyConstraint(['DepotID'], ['depot.DepotID'], name='FK_Vehicle_Depot'),
        ForeignKeyConstraint(['VehicleCategoryID'], ['vehiclecategory.VehicleCategoryID'], name='FK_Vehicle_Category'),
        Index('FK_Vehicle_Category', 'VehicleCategoryID'),
        Index('FK_Vehicle_Depot', 'DepotID'),
        Index('RegistrationNumber', 'RegistrationNumber', unique=True)
    )

    VIN: Mapped[str] = mapped_column(String(17, 'utf8mb4_0900_ai_ci'), primary_key=True)
    RegistrationNumber: Mapped[str] = mapped_column(String(20, 'utf8mb4_0900_ai_ci'), nullable=False)
    VehicleCategoryID: Mapped[int] = mapped_column(Integer, nullable=False)
    DepotID: Mapped[int] = mapped_column(Integer, nullable=False)
    Manufacturer: Mapped[Optional[str]] = mapped_column(String(100, 'utf8mb4_0900_ai_ci'))
    Model: Mapped[Optional[str]] = mapped_column(String(100, 'utf8mb4_0900_ai_ci'))
    ManufactureYear: Mapped[Optional[Any]] = mapped_column(YEAR(4))
    CurrentOdometer: Mapped[Optional[int]] = mapped_column(Integer, server_default=text("'0'"))
    OperationalStatus: Mapped[Optional[VehicleOperationalstatus]] = mapped_column(Enum(VehicleOperationalstatus, values_callable=lambda cls: [member.value for member in cls]), server_default=text("'Available'"))

    depot: Mapped['Depot'] = relationship('Depot', back_populates='vehicle')
    vehiclecategory: Mapped['Vehiclecategory'] = relationship('Vehiclecategory', back_populates='vehicle')
    predictivealert: Mapped[list['Predictivealert']] = relationship('Predictivealert', back_populates='vehicle')
    safetyevent: Mapped[list['Safetyevent']] = relationship('Safetyevent', back_populates='vehicle')
    vehicleassignment: Mapped[list['Vehicleassignment']] = relationship('Vehicleassignment', back_populates='vehicle')
    maintenancejob: Mapped[list['Maintenancejob']] = relationship('Maintenancejob', back_populates='vehicle')


t_vehiclecategorycertification = Table(
    'vehiclecategorycertification', Base.metadata,
    Column('VehicleCategoryID', Integer, primary_key=True),
    Column('CertificationID', Integer, primary_key=True),
    ForeignKeyConstraint(['CertificationID'], ['certification.CertificationID'], name='FK_VCC_Certification'),
    ForeignKeyConstraint(['VehicleCategoryID'], ['vehiclecategory.VehicleCategoryID'], name='FK_VCC_Category'),
    Index('FK_VCC_Certification', 'CertificationID')
)


class Workshop(Base):
    __tablename__ = 'workshop'
    __table_args__ = (
        ForeignKeyConstraint(['DepotID'], ['depot.DepotID'], name='FK_Workshop_Depot'),
        Index('FK_Workshop_Depot', 'DepotID')
    )

    WorkshopID: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    DepotID: Mapped[int] = mapped_column(Integer, nullable=False)
    WorkshopName: Mapped[str] = mapped_column(String(100, 'utf8mb4_0900_ai_ci'), nullable=False)
    ServiceBays: Mapped[Optional[int]] = mapped_column(Integer, server_default=text("'1'"))
    ContactInfo: Mapped[Optional[str]] = mapped_column(String(255, 'utf8mb4_0900_ai_ci'))

    depot: Mapped['Depot'] = relationship('Depot', back_populates='workshop')
    mechanic: Mapped[list['Mechanic']] = relationship('Mechanic', back_populates='workshop')
    maintenancejob: Mapped[list['Maintenancejob']] = relationship('Maintenancejob', back_populates='workshop')


class Drivercertification(Base):
    __tablename__ = 'drivercertification'
    __table_args__ = (
        ForeignKeyConstraint(['CertificationID'], ['certification.CertificationID'], name='FK_DriverCert_Certification'),
        ForeignKeyConstraint(['DriverID'], ['driver.DriverID'], name='FK_DriverCert_Driver'),
        Index('FK_DriverCert_Certification', 'CertificationID'),
        Index('UQ_Driver_Cert', 'DriverID', 'CertificationID', unique=True)
    )

    DriverCertificationID: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    DriverID: Mapped[int] = mapped_column(Integer, nullable=False)
    CertificationID: Mapped[int] = mapped_column(Integer, nullable=False)
    IssueDate: Mapped[datetime.date] = mapped_column(Date, nullable=False)
    ExpiryDate: Mapped[datetime.date] = mapped_column(Date, nullable=False)
    Status: Mapped[Optional[DrivercertificationStatus]] = mapped_column(Enum(DrivercertificationStatus, values_callable=lambda cls: [member.value for member in cls]), server_default=text("'Valid'"))

    certification: Mapped['Certification'] = relationship('Certification', back_populates='drivercertification')
    driver: Mapped['Driver'] = relationship('Driver', back_populates='drivercertification')


class Driversafetyscore(Base):
    __tablename__ = 'driversafetyscore'
    __table_args__ = (
        ForeignKeyConstraint(['DriverID'], ['driver.DriverID'], name='FK_Score_Driver'),
        Index('DriverID', 'DriverID', 'ScoreMonth', 'ScoreYear', unique=True)
    )

    ScoreID: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    DriverID: Mapped[int] = mapped_column(Integer, nullable=False)
    ScoreMonth: Mapped[int] = mapped_column(Integer, nullable=False)
    ScoreYear: Mapped[int] = mapped_column(Integer, nullable=False)
    StartingScore: Mapped[Optional[decimal.Decimal]] = mapped_column(DECIMAL(5, 2), server_default=text("'100.00'"))
    TotalPenalty: Mapped[Optional[int]] = mapped_column(Integer, server_default=text("'0'"))
    HarshBrakingCount: Mapped[Optional[int]] = mapped_column(Integer, server_default=text("'0'"))
    SpeedingCount: Mapped[Optional[int]] = mapped_column(Integer, server_default=text("'0'"))
    FatigueWarningCount: Mapped[Optional[int]] = mapped_column(Integer, server_default=text("'0'"))
    CriticalEventCount: Mapped[Optional[int]] = mapped_column(Integer, server_default=text("'0'"))
    FinalScore: Mapped[Optional[decimal.Decimal]] = mapped_column(DECIMAL(5, 2))
    RequiresCoaching: Mapped[Optional[int]] = mapped_column(TINYINT(1), server_default=text("'0'"))
    AssignmentBlocked: Mapped[Optional[int]] = mapped_column(TINYINT(1), server_default=text("'0'"))

    driver: Mapped['Driver'] = relationship('Driver', back_populates='driversafetyscore')
    drivercoaching: Mapped[list['Drivercoaching']] = relationship('Drivercoaching', back_populates='driversafetyscore')


class Mechanic(Base):
    __tablename__ = 'mechanic'
    __table_args__ = (
        ForeignKeyConstraint(['WorkshopID'], ['workshop.WorkshopID'], name='FK_Mechanic_Workshop'),
        Index('FK_Mechanic_Workshop', 'WorkshopID')
    )

    MechanicID: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    FullName: Mapped[str] = mapped_column(String(100, 'utf8mb4_0900_ai_ci'), nullable=False)
    WorkshopID: Mapped[int] = mapped_column(Integer, nullable=False)
    EmploymentStatus: Mapped[Optional[MechanicEmploymentstatus]] = mapped_column(Enum(MechanicEmploymentstatus, values_callable=lambda cls: [member.value for member in cls]), server_default=text("'Active'"))
    ContactInfo: Mapped[Optional[str]] = mapped_column(String(255, 'utf8mb4_0900_ai_ci'))
    Specialisation: Mapped[Optional[str]] = mapped_column(String(100, 'utf8mb4_0900_ai_ci'))

    workshop: Mapped['Workshop'] = relationship('Workshop', back_populates='mechanic')
    mechaniccertification: Mapped[list['Mechaniccertification']] = relationship('Mechaniccertification', back_populates='mechanic')
    activitymechanic: Mapped[list['Activitymechanic']] = relationship('Activitymechanic', back_populates='mechanic')


class Predictivealert(Base):
    __tablename__ = 'predictivealert'
    __table_args__ = (
        ForeignKeyConstraint(['SeverityID'], ['severity.SeverityID'], name='FK_Alert_Severity'),
        ForeignKeyConstraint(['VIN'], ['vehicle.VIN'], name='FK_Alert_Vehicle'),
        Index('FK_Alert_Severity', 'SeverityID'),
        Index('FK_Alert_Vehicle', 'VIN')
    )

    AlertID: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    VIN: Mapped[str] = mapped_column(String(17, 'utf8mb4_0900_ai_ci'), nullable=False)
    AlertType: Mapped[str] = mapped_column(String(100, 'utf8mb4_0900_ai_ci'), nullable=False)
    AlertTimestamp: Mapped[datetime.datetime] = mapped_column(DateTime, nullable=False)
    SeverityID: Mapped[int] = mapped_column(Integer, nullable=False)
    AlertStatus: Mapped[Optional[PredictivealertAlertstatus]] = mapped_column(Enum(PredictivealertAlertstatus, values_callable=lambda cls: [member.value for member in cls]), server_default=text("'Open'"))
    ActionTaken: Mapped[Optional[str]] = mapped_column(Text(collation='utf8mb4_0900_ai_ci'))
    ResolvedDate: Mapped[Optional[datetime.date]] = mapped_column(Date)

    severity: Mapped['Severity'] = relationship('Severity', back_populates='predictivealert')
    vehicle: Mapped['Vehicle'] = relationship('Vehicle', back_populates='predictivealert')
    maintenancejob: Mapped[list['Maintenancejob']] = relationship('Maintenancejob', back_populates='predictivealert')


class Safetyevent(Base):
    __tablename__ = 'safetyevent'
    __table_args__ = (
        ForeignKeyConstraint(['DepotID'], ['depot.DepotID'], name='FK_Event_Depot'),
        ForeignKeyConstraint(['DriverID'], ['driver.DriverID'], name='FK_Event_Driver'),
        ForeignKeyConstraint(['EventTypeID'], ['eventtype.EventTypeID'], name='FK_Event_Type'),
        ForeignKeyConstraint(['SeverityID'], ['severity.SeverityID'], name='FK_Event_Severity'),
        ForeignKeyConstraint(['VIN'], ['vehicle.VIN'], name='FK_Event_Vehicle'),
        Index('FK_Event_Depot', 'DepotID'),
        Index('FK_Event_Driver', 'DriverID'),
        Index('FK_Event_Severity', 'SeverityID'),
        Index('FK_Event_Type', 'EventTypeID'),
        Index('FK_Event_Vehicle', 'VIN')
    )

    EventID: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    EventTimestamp: Mapped[datetime.datetime] = mapped_column(DateTime, nullable=False)
    VIN: Mapped[str] = mapped_column(String(17, 'utf8mb4_0900_ai_ci'), nullable=False)
    DriverID: Mapped[int] = mapped_column(Integer, nullable=False)
    DepotID: Mapped[int] = mapped_column(Integer, nullable=False)
    EventTypeID: Mapped[int] = mapped_column(Integer, nullable=False)
    SeverityID: Mapped[int] = mapped_column(Integer, nullable=False)
    Odometer: Mapped[Optional[int]] = mapped_column(Integer)
    ReviewStatus: Mapped[Optional[SafetyeventReviewstatus]] = mapped_column(Enum(SafetyeventReviewstatus, values_callable=lambda cls: [member.value for member in cls]), server_default=text("'Pending'"))

    depot: Mapped['Depot'] = relationship('Depot', back_populates='safetyevent')
    driver: Mapped['Driver'] = relationship('Driver', back_populates='safetyevent')
    eventtype: Mapped['Eventtype'] = relationship('Eventtype', back_populates='safetyevent')
    severity: Mapped['Severity'] = relationship('Severity', back_populates='safetyevent')
    vehicle: Mapped['Vehicle'] = relationship('Vehicle', back_populates='safetyevent')
    safetyreview: Mapped[list['Safetyreview']] = relationship('Safetyreview', back_populates='safetyevent')


class Vehicleassignment(Base):
    __tablename__ = 'vehicleassignment'
    __table_args__ = (
        ForeignKeyConstraint(['DepotID'], ['depot.DepotID'], name='FK_Assignment_Depot'),
        ForeignKeyConstraint(['DriverID'], ['driver.DriverID'], name='FK_Assignment_Driver'),
        ForeignKeyConstraint(['VIN'], ['vehicle.VIN'], name='FK_Assignment_Vehicle'),
        Index('FK_Assignment_Depot', 'DepotID'),
        Index('FK_Assignment_Driver', 'DriverID'),
        Index('UQ_Vehicle_StartDate', 'VIN', 'StartDate', unique=True)
    )

    AssignmentID: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    VIN: Mapped[str] = mapped_column(String(17, 'utf8mb4_0900_ai_ci'), nullable=False)
    DriverID: Mapped[int] = mapped_column(Integer, nullable=False)
    DepotID: Mapped[int] = mapped_column(Integer, nullable=False)
    StartDate: Mapped[datetime.date] = mapped_column(Date, nullable=False)
    EndDate: Mapped[Optional[datetime.date]] = mapped_column(Date)
    AssignmentStatus: Mapped[Optional[VehicleassignmentAssignmentstatus]] = mapped_column(Enum(VehicleassignmentAssignmentstatus, values_callable=lambda cls: [member.value for member in cls]), server_default=text("'Active'"))

    depot: Mapped['Depot'] = relationship('Depot', back_populates='vehicleassignment')
    driver: Mapped['Driver'] = relationship('Driver', back_populates='vehicleassignment')
    vehicle: Mapped['Vehicle'] = relationship('Vehicle', back_populates='vehicleassignment')


class Drivercoaching(Base):
    __tablename__ = 'drivercoaching'
    __table_args__ = (
        ForeignKeyConstraint(['DriverID'], ['driver.DriverID'], name='FK_Coaching_Driver'),
        ForeignKeyConstraint(['ScoreID'], ['driversafetyscore.ScoreID'], name='FK_Coaching_Score'),
        Index('FK_Coaching_Driver', 'DriverID'),
        Index('FK_Coaching_Score', 'ScoreID')
    )

    CoachingID: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    DriverID: Mapped[int] = mapped_column(Integer, nullable=False)
    ScoreID: Mapped[int] = mapped_column(Integer, nullable=False)
    CoachingDate: Mapped[datetime.date] = mapped_column(Date, nullable=False)
    Outcome: Mapped[Optional[str]] = mapped_column(Text(collation='utf8mb4_0900_ai_ci'))
    Status: Mapped[Optional[DrivercoachingStatus]] = mapped_column(Enum(DrivercoachingStatus, values_callable=lambda cls: [member.value for member in cls]), server_default=text("'Scheduled'"))

    driver: Mapped['Driver'] = relationship('Driver', back_populates='drivercoaching')
    driversafetyscore: Mapped['Driversafetyscore'] = relationship('Driversafetyscore', back_populates='drivercoaching')


class Maintenancejob(Base):
    __tablename__ = 'maintenancejob'
    __table_args__ = (
        ForeignKeyConstraint(['AlertID'], ['predictivealert.AlertID'], name='FK_Job_Alert'),
        ForeignKeyConstraint(['VIN'], ['vehicle.VIN'], name='FK_Job_Vehicle'),
        ForeignKeyConstraint(['WorkshopID'], ['workshop.WorkshopID'], name='FK_Job_Workshop'),
        Index('FK_Job_Alert', 'AlertID'),
        Index('FK_Job_Vehicle', 'VIN'),
        Index('FK_Job_Workshop', 'WorkshopID')
    )

    JobID: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    VIN: Mapped[str] = mapped_column(String(17, 'utf8mb4_0900_ai_ci'), nullable=False)
    WorkshopID: Mapped[int] = mapped_column(Integer, nullable=False)
    DateOpened: Mapped[datetime.datetime] = mapped_column(DateTime, nullable=False)
    AlertID: Mapped[Optional[int]] = mapped_column(Integer)
    DateClosed: Mapped[Optional[datetime.datetime]] = mapped_column(DateTime)
    DowntimeHours: Mapped[Optional[decimal.Decimal]] = mapped_column(DECIMAL(6, 2), server_default=text("'0.00'"))
    TotalCostVND: Mapped[Optional[decimal.Decimal]] = mapped_column(DECIMAL(15, 2), server_default=text("'0.00'"))
    JobStatus: Mapped[Optional[MaintenancejobJobstatus]] = mapped_column(Enum(MaintenancejobJobstatus, values_callable=lambda cls: [member.value for member in cls]), server_default=text("'Open'"))

    predictivealert: Mapped[Optional['Predictivealert']] = relationship('Predictivealert', back_populates='maintenancejob')
    vehicle: Mapped['Vehicle'] = relationship('Vehicle', back_populates='maintenancejob')
    workshop: Mapped['Workshop'] = relationship('Workshop', back_populates='maintenancejob')
    maintenanceactivity: Mapped[list['Maintenanceactivity']] = relationship('Maintenanceactivity', back_populates='maintenancejob')


class Mechaniccertification(Base):
    __tablename__ = 'mechaniccertification'
    __table_args__ = (
        ForeignKeyConstraint(['CertificationID'], ['certification.CertificationID'], name='FK_MechCert_Certification'),
        ForeignKeyConstraint(['MechanicID'], ['mechanic.MechanicID'], name='FK_MechCert_Mechanic'),
        Index('FK_MechCert_Certification', 'CertificationID'),
        Index('FK_MechCert_Mechanic', 'MechanicID')
    )

    MechanicCertificationID: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    MechanicID: Mapped[int] = mapped_column(Integer, nullable=False)
    CertificationID: Mapped[int] = mapped_column(Integer, nullable=False)
    IssueDate: Mapped[datetime.date] = mapped_column(Date, nullable=False)
    ExpiryDate: Mapped[datetime.date] = mapped_column(Date, nullable=False)

    certification: Mapped['Certification'] = relationship('Certification', back_populates='mechaniccertification')
    mechanic: Mapped['Mechanic'] = relationship('Mechanic', back_populates='mechaniccertification')


class Safetyreview(Base):
    __tablename__ = 'safetyreview'
    __table_args__ = (
        ForeignKeyConstraint(['EventID'], ['safetyevent.EventID'], name='FK_Review_Event'),
        ForeignKeyConstraint(['StaffID'], ['staff.StaffID'], name='FK_Review_Staff'),
        Index('FK_Review_Event', 'EventID'),
        Index('FK_Review_Staff', 'StaffID')
    )

    ReviewID: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    EventID: Mapped[int] = mapped_column(Integer, nullable=False)
    StaffID: Mapped[int] = mapped_column(Integer, nullable=False)
    ReviewDate: Mapped[datetime.date] = mapped_column(Date, nullable=False)
    Comment: Mapped[Optional[str]] = mapped_column(Text(collation='utf8mb4_0900_ai_ci'))
    Recommendation: Mapped[Optional[str]] = mapped_column(Text(collation='utf8mb4_0900_ai_ci'))
    Outcome: Mapped[Optional[str]] = mapped_column(String(100, 'utf8mb4_0900_ai_ci'))

    safetyevent: Mapped['Safetyevent'] = relationship('Safetyevent', back_populates='safetyreview')
    staff: Mapped['Staff'] = relationship('Staff', back_populates='safetyreview')


class Maintenanceactivity(Base):
    __tablename__ = 'maintenanceactivity'
    __table_args__ = (
        ForeignKeyConstraint(['ActivityTypeID'], ['activitytype.ActivityTypeID'], name='FK_Activity_Type'),
        ForeignKeyConstraint(['JobID'], ['maintenancejob.JobID'], name='FK_Activity_Job'),
        Index('FK_Activity_Type', 'ActivityTypeID'),
        Index('UQ_Job_Activity', 'JobID', 'ActivityNo', unique=True)
    )

    ActivityID: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    JobID: Mapped[int] = mapped_column(Integer, nullable=False)
    ActivityNo: Mapped[int] = mapped_column(Integer, nullable=False)
    ActivityTypeID: Mapped[int] = mapped_column(Integer, nullable=False)
    DiagnosticResult: Mapped[Optional[str]] = mapped_column(Text(collation='utf8mb4_0900_ai_ci'))
    RepeatFault: Mapped[Optional[int]] = mapped_column(TINYINT(1), server_default=text("'0'"))
    WarrantyIndicator: Mapped[Optional[int]] = mapped_column(TINYINT(1), server_default=text("'0'"))
    ActivityStatus: Mapped[Optional[MaintenanceactivityActivitystatus]] = mapped_column(Enum(MaintenanceactivityActivitystatus, values_callable=lambda cls: [member.value for member in cls]), server_default=text("'Pending'"))

    activitytype: Mapped['Activitytype'] = relationship('Activitytype', back_populates='maintenanceactivity')
    maintenancejob: Mapped['Maintenancejob'] = relationship('Maintenancejob', back_populates='maintenanceactivity')
    activitymechanic: Mapped[list['Activitymechanic']] = relationship('Activitymechanic', back_populates='maintenanceactivity')
    activitypart: Mapped[list['Activitypart']] = relationship('Activitypart', back_populates='maintenanceactivity')
    warrantyclaim: Mapped[list['Warrantyclaim']] = relationship('Warrantyclaim', back_populates='maintenanceactivity')


class Activitymechanic(Base):
    __tablename__ = 'activitymechanic'
    __table_args__ = (
        ForeignKeyConstraint(['ActivityID'], ['maintenanceactivity.ActivityID'], name='FK_AM_Activity'),
        ForeignKeyConstraint(['MechanicID'], ['mechanic.MechanicID'], name='FK_AM_Mechanic'),
        Index('FK_AM_Mechanic', 'MechanicID')
    )

    ActivityID: Mapped[int] = mapped_column(Integer, primary_key=True)
    MechanicID: Mapped[int] = mapped_column(Integer, primary_key=True)
    LabourHours: Mapped[Optional[decimal.Decimal]] = mapped_column(DECIMAL(5, 2), server_default=text("'0.00'"))
    RoleInActivity: Mapped[Optional[str]] = mapped_column(String(100, 'utf8mb4_0900_ai_ci'))

    maintenanceactivity: Mapped['Maintenanceactivity'] = relationship('Maintenanceactivity', back_populates='activitymechanic')
    mechanic: Mapped['Mechanic'] = relationship('Mechanic', back_populates='activitymechanic')


class Activitypart(Base):
    __tablename__ = 'activitypart'
    __table_args__ = (
        ForeignKeyConstraint(['ActivityID'], ['maintenanceactivity.ActivityID'], name='FK_AP_Activity'),
        ForeignKeyConstraint(['PartID'], ['part.PartID'], name='FK_AP_Part'),
        Index('FK_AP_Part', 'PartID')
    )

    ActivityID: Mapped[int] = mapped_column(Integer, primary_key=True)
    PartID: Mapped[int] = mapped_column(Integer, primary_key=True)
    QuantityUsed: Mapped[int] = mapped_column(Integer, nullable=False)
    UnitCostAtTime: Mapped[Optional[decimal.Decimal]] = mapped_column(DECIMAL(15, 2))

    maintenanceactivity: Mapped['Maintenanceactivity'] = relationship('Maintenanceactivity', back_populates='activitypart')
    part: Mapped['Part'] = relationship('Part', back_populates='activitypart')


class Warrantyclaim(Base):
    __tablename__ = 'warrantyclaim'
    __table_args__ = (
        ForeignKeyConstraint(['ActivityID'], ['maintenanceactivity.ActivityID'], name='FK_Warranty_Activity'),
        ForeignKeyConstraint(['SupplierID'], ['supplier.SupplierID'], name='FK_Warranty_Supplier'),
        Index('FK_Warranty_Activity', 'ActivityID'),
        Index('FK_Warranty_Supplier', 'SupplierID')
    )

    WarrantyClaimID: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    ActivityID: Mapped[int] = mapped_column(Integer, nullable=False)
    SupplierID: Mapped[int] = mapped_column(Integer, nullable=False)
    ClaimDate: Mapped[datetime.date] = mapped_column(Date, nullable=False)
    ClaimStatus: Mapped[Optional[WarrantyclaimClaimstatus]] = mapped_column(Enum(WarrantyclaimClaimstatus, values_callable=lambda cls: [member.value for member in cls]), server_default=text("'Submitted'"))
    ClaimAmountVND: Mapped[Optional[decimal.Decimal]] = mapped_column(DECIMAL(15, 2), server_default=text("'0.00'"))

    maintenanceactivity: Mapped['Maintenanceactivity'] = relationship('Maintenanceactivity', back_populates='warrantyclaim')
    supplier: Mapped['Supplier'] = relationship('Supplier', back_populates='warrantyclaim')
