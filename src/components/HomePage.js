import React, { useState } from 'react';
import { Search, Menu, Plus, Users, FileText, MessageSquare, User, Filter } from 'lucide-react';

const Dashboard = () => {
  const [activeView, setActiveView] = useState('matches');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [advancedSearch, setAdvancedSearch] = useState({
    interests: '',
    skills: '',
    goals: ''
  });

  // Mock data for profiles
  const profiles = [
    { 
      id: 1,
      name: "Alex Johnson", 
      title: "Software Engineer", 
      rank: "1st",
      interests: ["AI", "Machine Learning", "Hiking"],
      skills: ["Python", "React", "TensorFlow"],
      goals: ["Build an AI startup", "Learn quantum computing"]
    },
    { 
      id: 2,
      name: "Sam Smith", 
      title: "UX Designer", 
      rank: "2nd",
      interests: ["User-centered design", "Psychology", "Travel"],
      skills: ["Figma", "Adobe XD", "User Research"],
      goals: ["Design an award-winning app", "Start a design agency"]
    },
  ];

  // Mock data for posts
  const posts = [
    { id: 1, author: "Alex Johnson", content: "Just finished a fascinating book on AI ethics. Thoughts?", likes: 15, comments: 3 },
    { id: 2, author: "Sam Smith", content: "Working on a new design system. Excited to share soon!", likes: 22, comments: 7 },
  ];

  // Mock data for friends
  const friends = [
    { id: 1, name: "Jordan Lee", title: "Product Manager", lastMessage: "Hey, want to grab coffee?" },
    { id: 2, name: "Casey Taylor", title: "Data Scientist", lastMessage: "Thanks for the intro!" },
  ];

  // Filter profiles based on search term or advanced search
  const filteredProfiles = profiles.filter(profile => {
    const searchInSimple = profile.name.toLowerCase().includes(searchTerm.toLowerCase());
    const searchInAdvanced = 
      profile.interests.some(interest => interest.toLowerCase().includes(advancedSearch.interests.toLowerCase())) ||
      profile.skills.some(skill => skill.toLowerCase().includes(advancedSearch.skills.toLowerCase())) ||
      profile.goals.some(goal => goal.toLowerCase().includes(advancedSearch.goals.toLowerCase()));
      
    return searchTerm ? searchInSimple : searchInAdvanced;
  });

  const renderMatches = () => (
    <div>
      <h2 className="text-lg font-semibold mb-4">Matches related to your interests</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {filteredProfiles.map((profile) => (
          <div key={profile.id} className="bg-white rounded-lg shadow p-4 relative">
            <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-3"></div>
            <h3 className="text-center font-semibold">{profile.name}</h3>
            <p className="text-center text-sm text-gray-500 mb-2">{profile.title}</p>
            <div className="text-sm">
              <p><strong>Interests:</strong> {profile.interests.join(", ")}</p>
              <p><strong>Skills:</strong> {profile.skills.join(", ")}</p>
              <p><strong>Goals:</strong> {profile.goals.join(", ")}</p>
            </div>
            <button 
              className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={() => setActiveView('messages')}
            >
              Start Chat
            </button>
            {profile.rank && (
              <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
                {profile.rank}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderPosts = () => (
    <div>
      <h2 className="text-lg font-semibold mb-4">Recent Posts</h2>
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow p-4 mb-4">
          <h3 className="font-semibold">{post.author}</h3>
          <p className="mt-2">{post.content}</p>
          <div className="mt-2 text-sm text-gray-500">
            <span>{post.likes} likes</span> • <span>{post.comments} comments</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderFriends = () => (
    <div>
      <h2 className="text-lg font-semibold mb-4">Your Friends</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {friends.map((friend) => (
          <div key={friend.id} className="bg-white rounded-lg shadow p-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full mb-2"></div>
            <h3 className="font-semibold">{friend.name}</h3>
            <p className="text-sm text-gray-500">{friend.title}</p>
            <p className="text-sm mt-2">{friend.lastMessage}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Messages</h2>
      <p className="text-gray-500">Select a friend to start chatting</p>
      <div className="mt-4">
        <p><strong>Friend's Name:</strong> You can implement the actual chat here</p>
        {/* Add more detailed chat functionality here */}
      </div>
    </div>
  );

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="w-16 bg-white flex flex-col items-center py-4">
        <Menu className="text-gray-400 mb-6" />
        <div 
          className={`rounded-full p-2 mb-6 cursor-pointer ${activeView === 'posts' ? 'bg-pink-100' : 'bg-gray-200'}`}
          onClick={() => setActiveView('posts')}
        >
          <Plus className={`${activeView === 'posts' ? 'text-pink-500' : 'text-gray-500'}`} />
        </div>
        <div 
          className={`mb-6 cursor-pointer ${activeView === 'friends' ? 'text-pink-500' : 'text-gray-400'}`}
          onClick={() => setActiveView('friends')}
        >
          <Users />
        </div>
        <FileText className="text-gray-400 mb-6" />
        <div 
          className={`mb-6 cursor-pointer ${activeView === 'messages' ? 'text-pink-500' : 'text-gray-400'}`}
          onClick={() => setActiveView('messages')}
        >
          <MessageSquare />
        </div>
        <User className="text-gray-400" />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Find Matches"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 pr-4 rounded-full bg-white shadow-sm"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <Filter 
            className="absolute right-3 top-2.5 text-gray-400 cursor-pointer" 
            size={20}
            onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
          />
        </div>

        {/* Advanced Search */}
        {showAdvancedSearch && (
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <h3 className="font-semibold mb-2">Advanced Search</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input 
                type="text" 
                placeholder="Interests" 
                value={advancedSearch.interests}
                onChange={(e) => setAdvancedSearch({ ...advancedSearch, interests: e.target.value })}
                className="p-2 border rounded" 
              />
              <input 
                type="text" 
                placeholder="Skills" 
                value={advancedSearch.skills}
                onChange={(e) => setAdvancedSearch({ ...advancedSearch, skills: e.target.value })}
                className="p-2 border rounded" 
              />
              <input 
                type="text" 
                placeholder="Goals" 
                value={advancedSearch.goals}
                onChange={(e) => setAdvancedSearch({ ...advancedSearch, goals: e.target.value })}
                className="p-2 border rounded" 
              />
            </div>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
              Search
            </button>
          </div>
        )}

        {/* Dynamic Content */}
        {activeView === 'matches' && renderMatches()}
        {activeView === 'posts' && renderPosts()}
        {activeView === 'friends' && renderFriends()}
        {activeView === 'messages' && renderMessages()}
      </div>
    </div>
  );
};

export default Dashboard;
