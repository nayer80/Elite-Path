import React from 'react';

interface Hotel {
  id: number;
  name: string;
  location: string;
  rating: number;
  pricePerNight: number;
  image: string;
  amenities: string[];
}

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
      <div className="relative h-48 bg-gray-300 flex items-center justify-center text-6xl">
        {hotel.image}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{hotel.name}</h3>
        <p className="text-gray-600 text-sm mb-2">📍 {hotel.location}</p>
        <div className="flex justify-between items-center mb-3">
          <span className="text-yellow-500">⭐ {hotel.rating}/5</span>
          <span className="text-primary font-bold">${hotel.pricePerNight}/night</span>
        </div>
        <div className="mb-4">
          <p className="text-sm font-semibold mb-2">Amenities:</p>
          <div className="flex flex-wrap gap-2">
            {hotel.amenities.map((amenity, idx) => (
              <span key={idx} className="bg-gray-200 text-xs px-2 py-1 rounded">
                {amenity}
              </span>
            ))}
          </div>
        </div>
        <button className="w-full btn-primary">Book Now</button>
      </div>
    </div>
  );
}
