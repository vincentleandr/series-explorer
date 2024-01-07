import Image from 'next/image'

async function getSeriesDetails(id: string) {
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }

export default async function Details({ params }: { params: { id: string } }) {
    const data: Series = await getSeriesDetails(params.id);
    console.log(data);

    const seriesImage = data.image ? (
      <Image
        src={data.image.original || data.image.medium}
        width={400}
        height={400}
        alt={data.name}
        className="rounded-xl search-result-hover-target"
      />
    ) : (
      <div className="w-40 h-56 bg-gray-600 rounded-xl search-result-hover-target" />
    );

    const seriesRating = data.rating?.average && <p className='mt-4'>Rating: {data.rating.average} / 10</p>

    return (
      <div className='flex justify-center items-center'>
        <div className="w-10/12 p-10 flex">
          {seriesImage}
          <div className='flex flex-col ml-10'>
            <h1 className='text-3xl font-bold'>{data.name}</h1>
            {seriesRating}
            <div
              className='mt-4'
              dangerouslySetInnerHTML={{ __html: data.summary }}
            />
          </div>
        </div>
      </div>
    )
  }