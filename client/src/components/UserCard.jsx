import React from 'react';
import { dummyUserData } from '../assets/assets';
import { MapPin, UserPlus } from 'lucide-react';

const UserCard = ({ user }) => {
  const currentUser = dummyUserData;

  const handelFollow = async () => {};
  const handelConnectionRequest = async () => {};

  return (
    <div
      key={user._id}
      className="p-4 pt-6 flex flex-col justify-between w-72 shadow border border-gray-200 rounded-md"
    >
      <div className="text-center">
        <img
          src={user.profile_picture}
          alt=""
          className="rounded-full w-16 shadow-md mx-auto"
        />
        <p className="mt-4 font-semibold">{user.full_name}</p>
        {user.username && (
          <p className="text-gray-500 font-light">@{user.username}</p>
        )}
        {user.bio && <p className="text-gray-500 font-light">{user.bio}</p>}
      </div>

      <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-600">
        <div className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1">
          <MapPin className="w-4 h-4" />
          {user.location}
        </div>
        <div className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1">
          <span>{user.followers.length}</span> Followers
        </div>
      </div>
    </div>
  );
};

export default UserCard;
