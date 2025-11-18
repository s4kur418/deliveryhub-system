import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { ridersAPI } from "../services/api";
import { ordersAPI } from "../services/api";

export function AssignRiderModal({ order, onClose, onAssigned }) {
  const [riders, setRiders] = useState([]);
  const [selectedRider, setSelectedRider] = useState("");

  useEffect(() => {
    const fetchRiders = async () => {
      try {
        const data = await ridersAPI.getAll();
        setRiders(data);
      } catch (error) {
        console.error("Error fetching riders:", error);
      }
    };

    fetchRiders();
  }, []);

  const handleAssign = async () => {
    if (!selectedRider) return;

    try {
      const result = await ordersAPI.assignRider(order.id, selectedRider);
      onAssigned(result);
    } catch (error) {
      console.error("Error assigning rider:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4 shadow-lg">
        <h2 className="text-xl font-semibold">Assign Rider</h2>

        <div>
          <Label>Choose Rider</Label>
          <select
            className="w-full border rounded p-2"
            value={selectedRider}
            onChange={(e) => setSelectedRider(e.target.value)}
          >
            <option value="">-- Select Rider --</option>

            {riders.map((rider) => (
              <option key={rider.id} value={rider.id}>
                {rider.rider_name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button disabled={!selectedRider} onClick={handleAssign}>
            Assign
          </Button>
        </div>
      </div>
    </div>
  );
}
