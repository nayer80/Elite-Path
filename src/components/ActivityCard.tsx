import React from 'react';

interface Activity {
  id: number;
  title: string;
  location: string;
  image: string;
  rating: number;
  price: number;
  description: string;
}

export default function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
      <div className="relative h-48 bg-gray-300 flex items-center justify-center">
        <div className="text-6xl">{activity.image}</div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{activity.title}</h3>
        <p className="text-gray-600 text-sm mb-2">📍 {activity.location}</p>
        <div className="flex justify-between items-center mb-3">
          <span className="text-yellow-500">⭐ {activity.rating}/5</span>
          <span className="text-primary font-bold">${activity.price}</span>
        </div>
        <p className="text-gray-700 text-sm mb-4">{activity.description}</p>
        <button className="w-full btn-primary">Book Now</button>
      </div>
    </div>
  );
}
