import Image from 'next/image';

export default function HeroBlock({ data }) {
  const imageUrl = data.image?.fields?.file?.url;

  return (
    <section className="bg-gray-100 py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="uppercase tracking-widest text-sm text-blue-600 mb-3">
            {data.eyebrow}
          </p>

          <h1 className="text-5xl font-bold mb-6">
            {data.headline}
          </h1>

          <p className="text-lg text-gray-700 mb-8">
            {data.body}
          </p>

          <a
            href={data.primaryCtaHref}
            className="bg-black text-white px-6 py-3 rounded-lg inline-block"
          >
            {data.primaryCtaLabel}
          </a>
        </div>

        {imageUrl && (
          <div>
            <Image
              src={`https:${imageUrl}`}
              alt={data.headline}
              width={1200}
              height={800}
              className="rounded-2xl"
            />
          </div>
        )}
      </div>
    </section>
  );
}