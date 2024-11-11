export default function SubscriptionCard({ subscription, onDelete }) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800">{subscription.name}</h2>
        <p className="text-gray-700">Price: ${subscription.price.toFixed(2)}</p>
        <p className="text-gray-700">Next Due Date: {subscription.dueDate}</p>
        <button
          onClick={() => onDelete(subscription.id)}
          className="mt-4 bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    );
  }
  