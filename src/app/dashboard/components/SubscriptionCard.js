export default function SubscriptionCard({ subscription, onDelete, onEdit }) {
  const price = parseFloat(subscription.price) || 0;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">{subscription.name}</h2>
      <p>Price: ${price.toFixed(2)}</p>
      <p>Next Due Date: {subscription.dueDate}</p>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onEdit(subscription)}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(subscription.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
