import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { ordersAPI } from '../services/api';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

export function OrderForm({ order, loggedInUser, onClose, onSubmit }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    customer_id: loggedInUser?.id || 0,
    pickup_address: order?.pickupAddress || '',
    delivery_address: order?.deliveryAddress || '',
    items: order?.items || '',
    notes: order?.notes || '',
    total_amount: order?.totalAmount || 0,
    status: order?.status || 'pending',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const orderData = { ...formData };

      let result;
      if (order) {
        result = await ordersAPI.update(order.id, orderData);
      } else {
        result = await ordersAPI.create(orderData);
      }

      onSubmit(result);
    } catch (error) {
      console.error('Error saving order:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl">{order ? 'Edit Order' : 'Create New Order'}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Customer (readonly) */}
          <div className="space-y-2">
            <Label htmlFor="customerName">Customer *</Label>
            <Input
              id="customerName"
              value={loggedInUser?.name}
              readOnly
              className="bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Pickup Address */}
          <div className="space-y-2">
            <Label htmlFor="pickupAddress">Pickup Address *</Label>
            <Input
              id="pickupAddress"
              value={formData.pickup_address}
              onChange={(e) => setFormData({ ...formData, pickup_address: e.target.value })}
              placeholder="Enter pickup address"
              required
            />
          </div>

          {/* Delivery Address */}
          <div className="space-y-2">
            <Label htmlFor="deliveryAddress">Delivery Address *</Label>
            <Input
              id="deliveryAddress"
              value={formData.delivery_address}
              onChange={(e) => setFormData({ ...formData, delivery_address: e.target.value })}
              placeholder="Enter delivery address"
              required
            />
          </div>

          {/* Items */}
          <div className="space-y-2">
            <Label htmlFor="items">Items *</Label>
            <Textarea
              id="items"
              value={formData.items}
              onChange={(e) => setFormData({ ...formData, items: e.target.value })}
              placeholder="e.g., 2x Burger, 1x Fries"
              required
              rows={3}
            />
          </div>

          {/* Total Amount */}
          <div className="space-y-2">
            <Label htmlFor="totalAmount">Total Amount ($) *</Label>
            <Input
              id="totalAmount"
              type="number"
              step="0.01"
              min="0"
              value={formData.total_amount}
              onChange={(e) =>
                setFormData({ ...formData, total_amount: parseFloat(e.target.value) || 0 })
              }
              placeholder="0.00"
              required
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional notes or instructions"
              rows={2}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : order ? 'Update Order' : 'Create Order'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
