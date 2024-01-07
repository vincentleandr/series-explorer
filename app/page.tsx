"use client"; 

import Link from "next/link";
import Image from 'next/image'
import { useState } from "react";

async function searchSeries(searchInput: string) {
  const res = await fetch(`https://api.tvmaze.com/search/shows?q=${searchInput}`)
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default function Home() {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchResult, setSearchResult] = useState<SearchSeriesResult[]>([]);

  const mappedSearchResult = searchResult.map((item: SearchSeriesResult) => {
    const seriesImage = item.show.image ? (
      <Image
        src={item.show.image.medium || item.show.image.original}
        width={160}
        height={224}
        alt={item.show.name}
        className="rounded-xl search-result-hover-target"
      />
    ) : (
      <div className="w-40 h-56 bg-gray-600 rounded-xl search-result-hover-target" />
    );

    return (
      <Link
        href={`/${item.show.id}`}
        key={item.show.id}
        className="search-result-container"
      >
        <div className="flex flex-col m-10">
          {seriesImage}
          <p className="mt-4">{item.show.name}</p>
        </div>
      </Link>
    );
  });

  const onSearch = async (e: any) => {
    e.preventDefault();
    const data: SearchSeriesResult[] = await searchSeries(searchInput);
    setSearchResult(data);
  };

  const searchBar = (
    <div className="relative w-96">
      <form onSubmit={onSearch}>
        <input
          type="text"
          className="text-black w-full h-14 p-4 rounded-xl"
          onChange={e => setSearchInput(e.target.value)}
          value={searchInput}
          placeholder="What do you want to watch?"
        />
        <Image
          src="/search.svg"
          width={30}
          height={30}
          alt={'search'}
          className="absolute top-3 right-4"
        />
      </form>
    </div>
  );

  return (
    <div className="flex justify-center items-center">
      <div className="w-10/12 p-4 lg:p-10 flex flex-col items-center">
        {searchBar}
        <div className="flex justify-center items-center flex-wrap">
          {mappedSearchResult}
        </div>
      </div>
    </div>
  )
}
