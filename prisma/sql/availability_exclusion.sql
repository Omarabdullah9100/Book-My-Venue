-- Business rule 1: no double bookings, enforced by the database itself.
--
-- Two requests that race past the application-level check still cannot both insert, because
-- Postgres rejects any overlapping [startsAt, endsAt) range for the same space while the slot
-- is active (HELD, BOOKED or BLOCKED). RELEASED rows are ignored, so cancelled or expired
-- slots free the time immediately.
--
-- Expired holds: a HELD row whose holdExpiresAt has passed still occupies the range until the
-- expiry job (or the booking transaction itself, see src/server/booking/hold.ts in M4) flips it
-- to RELEASED. The booking transaction therefore releases expired holds for the target space
-- BEFORE inserting, so an expired hold never blocks a new booking.

CREATE EXTENSION IF NOT EXISTS btree_gist;

ALTER TABLE "AvailabilitySlot"
  ADD CONSTRAINT availability_no_overlap
  EXCLUDE USING gist (
    "spaceId" WITH =,
    tstzrange("startsAt", "endsAt", '[)') WITH &&
  )
  WHERE (status IN ('HELD', 'BOOKED', 'BLOCKED'));

ALTER TABLE "AvailabilitySlot"
  ADD CONSTRAINT availability_valid_range CHECK ("endsAt" > "startsAt");
