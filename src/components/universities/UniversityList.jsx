"use client";

import { useMemo, useState } from "react";
import University from "./University";
import { GraduationCap, Search, X } from "lucide-react";

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
    <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
      {/* Section Header */}
      <div className="mb-12">
        <div className="mb-3 inline-flex items-center gap-2 border border-[var(--color-border)] bg-[var(--color-secondary-bg)] px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[var(--color-primary-blue)]">
          <GraduationCap className="h-4 w-4" aria-hidden="true" />
          <span>Accredited Institutions</span>
        </div>

        <h1 className="text-4xl font-black leading-tight tracking-tight text-[var(--color-primary-text)] md:text-5xl font-inter">
          Explore Korean Universities
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-secondary-text)] md:text-lg">
          Official database of recognized South Korean universities, QS World Rankings, geographic districts, and admissions portals.
        </p>

        {/* Filter Bar (Swiss Control Console) */}
        <div className="mt-8 border border-[var(--color-border)] bg-[var(--color-secondary-bg)] p-6">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-12 md:items-end">
            <div className="md:col-span-6">
              <label htmlFor="search-input" className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-primary-text)] mb-2">
                University Name
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted-text)]" aria-hidden="true" />
                <input
                  id="search-input"
                  type="search"
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                  placeholder="Search by name (e.g. Korea, Yonsei)"
                  className="w-full border border-[var(--color-border)] bg-[var(--color-card-bg)] pl-10 pr-4 py-2.5 text-sm font-medium text-[var(--color-primary-text)] outline-none transition focus:border-[var(--color-border-strong)] focus:ring-2 focus:ring-[var(--color-ring)]"
                />
              </div>
            </div>

            <div className="md:col-span-4">
              <label htmlFor="location-select" className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-primary-text)] mb-2">
                Geographic District
              </label>
              <select
                id="location-select"
                value={selectedLocation}
                onChange={(event) => setSelectedLocation(event.target.value)}
                className="w-full border border-[var(--color-border)] bg-[var(--color-card-bg)] px-4 py-2.5 text-sm font-medium text-[var(--color-primary-text)] outline-none transition focus:border-[var(--color-border-strong)] focus:ring-2 focus:ring-[var(--color-ring)]"
              >
                <option value="">All Regions</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <button
                type="button"
                onClick={handleClearFilters}
                className="btn btn-outline w-full py-2.5 text-xs font-mono font-bold uppercase tracking-wider focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
              >
                <X className="h-3.5 w-3.5 mr-1" aria-hidden="true" />
                Clear
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 text-xs font-mono text-[var(--color-muted-text)]">
          INDEX COUNT: <span className="font-bold text-[var(--color-primary-text)]">{filteredUniversities.length}</span> entries
          {selectedLocation ? <span> IN REGION: {selectedLocation.toUpperCase()}</span> : null}
        </div>
      </div>

      {/* University Grid */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredUniversities.map((uni) => (
          <University key={uni.id || uni.universityName} university={uni} />
        ))}
      </div>

      {filteredUniversities.length === 0 ? (
        <div className="mt-8 border border-[var(--color-border)] bg-[var(--color-secondary-bg)] p-12 text-center text-[var(--color-secondary-text)]">
          <p className="font-mono text-sm uppercase tracking-wider">No matching institutions found</p>
          <button
            onClick={handleClearFilters}
            className="mt-4 btn btn-outline px-4 py-2 text-xs font-mono"
          >
            Reset Filters
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default UniversityList;
