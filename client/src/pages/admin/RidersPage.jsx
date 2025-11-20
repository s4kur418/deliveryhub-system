import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Mail, Phone, Car } from 'lucide-react';
import setDocumentTitle from "../../hooks/set-document-title";
import { ridersAPI } from '../../services/api';
import { RiderForm } from '../../components/RiderForm';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../components/ui/alert-dialog';

export function RidersPage() {
  setDocumentTitle("Riders | Delivery Hub");

  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRider, setEditingRider] = useState(null);
  const [deleteRiderId, setDeleteRiderId] = useState(null);

  useEffect(() => {
    loadRiders();
  }, []);

  const loadRiders = async () => {
    try {
      const data = await ridersAPI.getAll();
      setRiders(data);
    } catch (error) {
      console.error('Error loading Riders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (deleteRiderId === null) return;

    try {
      await ridersAPI.delete(deleteRiderId);
      setRiders(riders.filter((d) => d.id !== deleteRiderId));
      setDeleteRiderId(null);
    } catch (error) {
      console.error('Error deleting Rider:', error);
    }
  };

  const handleFormSubmit = () => {
    loadRiders();
    setShowForm(false);
    setEditingRider(null);
  };

  const getStatusColor = (status) => {
    const colors = {
      online: 'bg-green-100 text-green-800 border-green-200',
      on_delivery: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      offline: 'bg-gray-100 text-gray-800 border-gray-200',
    };
    return colors[status];
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl mb-1">Riders Management</h2>
          <p className="text-gray-600">Manage delivery riders</p>
        </div>
        <Button
          onClick={() => {
            setEditingRider(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Rider
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {riders.map((rider) => (
            <div
              key={rider.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg">{rider.rider_name}</h3>
                    <Badge className={getStatusColor(rider.status)}>
                      {getStatusLabel(rider.status)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">Rider #{rider.id}</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{rider.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{rider.phone_number}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Car className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">
                    {rider.vehicle_type} - {rider.vehicle_number}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setEditingRider(rider);
                    setShowForm(true);
                  }}
                  className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeleteRiderId(rider.id)}
                  className="px-4 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && riders.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No Riders found. Add your first rider!</p>
        </div>
      )}

      {showForm && (
        <RiderForm
          rider={editingRider}
          onClose={() => {
            setShowForm(false);
            setEditingRider(null);
          }}
          onSubmit={handleFormSubmit}
        />
      )}

      <AlertDialog open={deleteRiderId !== null} onOpenChange={() => setDeleteRiderId(null)}>
        <AlertDialogContent className="max-w-md mx-auto rounded-xl bg-white shadow-lg border border-gray-200 p-6">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold text-gray-800">
              Delete Rider
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 mt-1">
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6 flex justify-end gap-3">
            <AlertDialogCancel className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-all">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-all"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
