from generators.utils import title

# ==========================================================
# Package 1
# ==========================================================
from generators.depot_generator import generate as depot
from generators.vehicle_category_generator import generate as vehicle_category
from generators.certification_generator import generate as certification
from generators.severity_generator import generate as severity
from generators.event_type_generator import generate as event_type

# ==========================================================
# Package 2
# ==========================================================
from generators.activity_type_generator import generate as activity_type
from generators.supplier_generator import generate as supplier
from generators.workshop_generator import generate as workshop
from generators.staff_generator import generate as staff

# ==========================================================
# Package 3
# ==========================================================
from generators.vehicle_generator import generate as vehicle
from generators.driver_generator import generate as driver
from generators.driver_certification_generator import generate as driver_certification
from generators.vehicle_assignment_generator import export as generate_vehicle_assignment

# ==========================================================
# Package 4
# ==========================================================
from generators.safety_event_generator import generate as generate_safety_event
from generators.safety_review_generator import generate as generate_safety_review
from generators.driver_safety_score_generator import generate as generate_driver_safety_score
from generators.driver_coaching_generator import generate as generate_driver_coaching

# ==========================================================
# Package 5
# ==========================================================
from generators.part_generator import generate as generate_part
from generators.maintenance_job_generator import generate as generate_maintenance_job
from generators.maintenance_activity_generator import generate as generate_maintenance_activity
from generators.activity_mechanic_generator import generate as generate_activity_mechanic
from generators.activity_part_generator import generate as generate_activity_part
from generators.maintenance_cost_updater import generate as update_maintenance_cost

# ==========================================================
# Package 7
# ==========================================================
from generators.mechanic_generator import generate as generate_mechanic
from generators.mechanic_certification_generator import generate as generate_mechanic_certification
from generators.vehicle_category_certification_generator import generate as generate_vehicle_category_certification
from generators.activity_type_certification_generator import generate as generate_activity_type_certification
from generators.warranty_claim_generator import generate as generate_warranty_claim

# ==========================================================
# Package 6
# ==========================================================
from generators.predictive_alert_generator import generate as generate_predictive_alert


def main():

    title("Fleet Management Database Generator")

    # ======================================================
    # Package 1
    # ======================================================

    depot()
    vehicle_category()
    certification()
    severity()
    event_type()

    print()
    print("Package 1 Completed Successfully!")

    # ======================================================
    # Package 2
    # ======================================================

    activity_type()
    supplier()
    workshop()
    staff()

    print()
    print("Package 2 Completed Successfully!")

    # ======================================================
    # Package 3
    # ======================================================

    vehicle()
    driver()
    driver_certification()
    generate_vehicle_assignment()

    print()
    print("Package 3 Completed Successfully!")

    # ======================================================
    # Package 4
    # ======================================================

    generate_safety_event()
    generate_safety_review()
    generate_driver_safety_score()
    generate_driver_coaching()

    print()
    print("Package 4 Completed Successfully!")

    # ======================================================
    # Package 5
    # ======================================================

    generate_part()
    generate_maintenance_job()
    generate_maintenance_activity()

    # ======================================================
    # Package 7 (Mechanic trước)
    # ======================================================

    generate_mechanic()
    generate_mechanic_certification()

    # ======================================================
    # Quay lại Package 5
    # ======================================================

    generate_activity_mechanic()
    generate_activity_part()
    update_maintenance_cost()

    print()
    print("Package 5 Completed Successfully!")

    # ======================================================
    # Package 7 (Bridge Tables)
    # ======================================================

    generate_vehicle_category_certification()
    generate_activity_type_certification()
    generate_warranty_claim()

    print()
    print("Package 7 Completed Successfully!")

    # ======================================================
    # Package 6
    # ======================================================

    generate_predictive_alert()

    print()
    print("Package 6 Completed Successfully!")

    print()
    print("=" * 70)
    print("ALL 28 TABLES GENERATED SUCCESSFULLY")
    print("=" * 70)


if __name__ == "__main__":
    main()