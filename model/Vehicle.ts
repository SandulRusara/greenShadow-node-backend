// models/Vehicle.ts
export default class Vehicle {
    id?: number;
    licensePlateNumber!: string;  // Unique identifier for the vehicle
    category!: string;  // Category (sedan, truck, etc.)
    fuelType!: string;  // FuelType should be passed as a string value (e.g., "PETROL", "DIESEL")
    status!: string;     // Status (e.g., "ACTIVE", "INACTIVE")
    remarks?: string;    // Optional remarks
    staffId?: number;    // Optional staffId, if assigned to a staff member
}
