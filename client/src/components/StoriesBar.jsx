import React, { use, useEffect, useState } from 'react';
import { dummyStoriesData } from '../assets/assets';
import { Plus } from 'lucide-react';

const StoriesBar = () => {
  const [stories, setStories] = useState([]);

  const fetchStories = async () => {
    setStories(dummyStoriesData);
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <div className="w-screen sm:w-[calc(100vw-240px)] lg:max-w-2xl no-scrollbar overflow-auto px-4">
      <div>
        {/*Add Story Card*/}
        <div className="rounded-lg shadow-sm min-w-30 max-w-30 max-h40 aspect-3/4 cursor-pointer hover:shadow-lg transistion-all duration-200 border-2 border-dashed border-indigo-300 bg-linear-to-b from-indigo-50 to-white">
          <div className="h-full flex flex-col items-center justify-center p-4">
            <div className="size-10 bg-indigo-500 rounded-full flex items-center justify-center mb-3">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm font-medium text-slate-700 text-center">
              Create Story
            </p>
          </div>
        </div>
        {/*Story cards*/}
      </div>
    </div>
  );
};

export default StoriesBar;
