"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import University from "./University";

const UniversityList = ({ universities = [] }) => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchText, setSearchText] = useState("");

  const locations = useMemo(
    () => [...new Set(universities.map((university) => university?.location).filter(Boolean))].sort(),
    [universities]
  );

  const filteredUniversities = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase();

    return universities.filter((university) => {
      const universityName = university?.universityName?.toLowerCase() || "";
      const location = university?.location || "";
      const matchesLocation = selectedLocation ? location === selectedLocation : true;
      const matchesName = normalizedSearch ? universityName.includes(normalizedSearch) : true;

      return matchesLocation && matchesName;
    });
  }, [universities, selectedLocation, searchText]);

  const handleClearFilters = () => {
    setSelectedLocation("");
    setSearchText("");
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-24">

  {/* Section Header */}
  <div className="mb-16 text-center">

    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-(--color-border) bg-(--color-elevated) px-5 py-2 text-sm font-medium text-(--color-primary-blue) shadow-sm">
      🎓 Top Study Destinations
    </div>

    <h2 className="mx-auto max-w-3xl text-4xl font-black leading-tight tracking-tight text-(--color-primary-text) md:text-6xl">
      Explore Top Korean Universities
    </h2>

    <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-(--color-secondary-text) md:text-lg">
      Discover globally recognized universities in South Korea,
      explore QS rankings, locations, and official information —
      all in one modern platform.
    </p>

    <div className="mx-auto mt-10 flex w-full max-w-5xl flex-col gap-4 rounded-3xl border border-(--color-border) bg-(--color-card-bg) p-4 shadow-sm md:flex-row md:items-end md:justify-between">
      <div className="text-left">
        <p className="text-sm font-semibold text-(--color-primary-text)">Filter universities</p>
        <p className="text-sm text-(--color-secondary-text)">Search by name or narrow the list by location.</p>
      </div>

      <div className="grid w-full gap-3 sm:grid-cols-2 md:max-w-3xl md:grid-cols-3">
        <label className="flex flex-col gap-2 text-left text-sm font-medium text-(--color-primary-text)">
          University name
          <input
            type="search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search by university name"
            className="w-full rounded-2xl border border-(--color-border) bg-white px-4 py-3 text-sm font-medium text-(--color-primary-text) shadow-sm outline-none transition focus:border-(--color-primary-blue)"
          />
        </label>

        <label className="flex flex-col gap-2 text-left text-sm font-medium text-(--color-primary-text)">
          Location
          <select
            value={selectedLocation}
            onChange={(event) => setSelectedLocation(event.target.value)}
            className="w-full rounded-2xl border border-(--color-border) bg-white px-4 py-3 text-sm font-medium text-(--color-primary-text) shadow-sm outline-none transition focus:border-(--color-primary-blue)"
          >
            <option value="">All locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-end gap-2">
          <button
            type="button"
            onClick={handleClearFilters}
            className="w-full rounded-2xl border border-(--color-border) bg-white px-5 py-3 text-sm font-semibold text-(--color-primary-text) transition hover:bg-(--color-elevated)"
          >
            Clear
          </button>
        </div>
      </div>
    </div>

    <div className="mt-6 text-sm text-(--color-secondary-text)">
      Showing <span className="font-semibold text-(--color-primary-text)">{filteredUniversities.length}</span> universities
      {selectedLocation ? (
        <span>
          {' '}
          in <span className="font-semibold text-(--color-primary-text)">{selectedLocation}</span>
        </span>
      ) : null}
    </div>

  </div>

  {/* University Grid */}
  <div className="mt-10 grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
    {filteredUniversities.map((uni) => (
      <University
        key={uni.id}
        university={uni}
      />
    ))}
  </div>

  {filteredUniversities.length === 0 ? (
    <div className="mt-8 rounded-3xl border border-(--color-border) bg-(--color-card-bg) p-8 text-center text-(--color-secondary-text) shadow-sm">
      No universities found for this location.
    </div>
  ) : null}

</div>
  );
};

export default UniversityList;