export default function QuickStats({ subscriptions = [] }) {
  const totalCost = subscriptions.reduce(
    (sum, sub) => sum + (parseFloat(sub.price) || 0),
    0
  );

  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800">Quick Stats</h3>
      <p className="text-gray-700">
        Total Subscriptions: {subscriptions.length}
      </p>
      <p className="text-gray-700">
        Total Monthly Cost: ${totalCost.toFixed(2)}
      </p>
    </div>
  );
}
