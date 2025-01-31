import { useState } from "react";
import { fetchAPI } from "../../utils/api";

function EventRequestForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    type: '',
    description: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchAPI("/api/event-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      if (response.success) {
        alert('Request submitted successfully!');
        onClose();
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Failed to submit request. Please try again.');
    }
  };


  return (
    <div className="fixed inset-0 bg-midnight/50 flex items-center justify-center p-4">
      <div className="bg-ivory rounded-xl p-8 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-midnight">Request Our Help</h2>
          <button onClick={onClose} className="text-charcoal hover:text-midnight">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Name
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Organization
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.organization}
              onChange={(e) => setFormData({...formData, organization: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Service Type
            </label>
            <select
              required
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option value="portfolio">Portfolio Creation</option>
              <option value="community">Event & Community</option>
              <option value="data">Data Innovation</option>
              <option value="influencer">Influencer Agency</option>
              <option value="celebrity">Celebrity Agency</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Project Description
            </label>
            <textarea
              required
              rows="4"
              className="w-full px-4 py-2 border rounded-lg"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Please describe your project or how we can help..."
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-midnight text-midnight rounded-lg hover:bg-midnight/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-midnight text-ivory rounded-lg hover:bg-midnight/90"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventRequestForm;
