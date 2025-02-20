const MetricSummary = ({ title, value, icon }) => (
  <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow">
      <div className="text-3xl mr-4">{icon}</div>
      <div>
          <h4 className="text-lg font-semibold">{title}</h4>
          <p className="text-2xl font-bold text-midnight">{value}</p>
      </div>
  </div>
);
export default MetricSummary
