import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaTag, FaSearch } from 'react-icons/fa';

const Updates = () => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUpdates, setFilteredUpdates] = useState([]);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        await new Promise((r) => setTimeout(r, 800));
        const data = [
          {
            id: 1,
            title: 'Servocci Counsellors new main website under construction',
            description:
              'We are delighted to tell you that our new website with advanced features is under construction, check it out here https://servocci-main.vercel.app/psychometric-tests',
            date: '2025-05-05',
            tag: 'Website',
          },
          {
            id: 2,
            title: 'New Courses Added to PIIT college List',
            description:
              'We’ve onboarded many new courses for PIIT along with their fee structures. Check it out under Institutions.',
            date: '2025-05-05',
            tag: 'Institution',
          },
          {
            id: 3,
            title: 'Psychometric Page Enhanced',
            description:
              'New theories added: Howard Gardner, RIASEC. Also improved test UI, Check it out under https://servocci-main.vercel.app/psychometric-tests',
            date: '2025-04-05',
            tag: 'Psychometric',
          },
          {
            id: 4,
            title: 'Pre-Admission Referral System Live',
            description:
              'Counsellors can now share QR or links auto-attached with their code.',
            date: '2025-04-05',
            tag: 'Counsellor Tools',
          },
          {
            id: 5,
            title: 'More Student Data Added for Calling',
            description:
              'More verified student data has been added. Check it in the Application List under the Students section.',
            date: '2025-06-06',
            tag: 'Student Leads',
          },
          {
            id: 6,
            title: 'New Columns for MBBS Institutions & International/Domestic',
            description:
              'Two new filters added to help categorize institutions by MBBS and International/Domestic status in the department listing.',
            date: '2025-06-06',
            tag: 'Feature Update',
          },
        ];
        setUpdates(data);
        setFilteredUpdates(data);
      } catch (err) {
        console.error('Error fetching updates:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUpdates();
  }, []);

  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    const filtered = updates.filter(
      (u) =>
        u.title.toLowerCase().includes(lower) ||
        u.description.toLowerCase().includes(lower)
    );
    setFilteredUpdates(filtered);
  }, [searchTerm, updates]);

  const renderDescription = (text) =>
    text.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
      part.startsWith('http') ? (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          {part}
        </a>
      ) : (
        part
      )
    );

  return (
    <div className="p-6 md:p-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--primary-dark)]">
          Latest Updates
        </h1>
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search updates..."
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {loading ? (
        <p className="text-gray-700">Loading updates...</p>
      ) : filteredUpdates.length === 0 ? (
        <p className="text-gray-600">No updates found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredUpdates.map((update) => (
            <div
              key={update.id}
              className="bg-white border border-gray-300 rounded-2xl shadow-lg p-6 transition hover:shadow-2xl"
            >
              <h2 className="text-lg font-semibold text-[var(--primary-dark)]">
                {update.title}
              </h2>
              <p className="text-gray-900 mt-3 text-sm leading-relaxed">
                {renderDescription(update.description)}
              </p>
              <div className="flex justify-between items-center text-sm mt-5">
                <span className="flex items-center gap-1 text-[var(--accent-orange)] font-semibold">
                  <FaCalendarAlt />
                  {new Date(update.date).toLocaleDateString()}
                </span>
                {update.tag && (
                  <span className="flex items-center gap-1 bg-[var(--accent-light-orange)] text-black px-3 py-1 rounded-full text-xs font-semibold select-none">
                    <FaTag />
                    {update.tag}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Updates;
