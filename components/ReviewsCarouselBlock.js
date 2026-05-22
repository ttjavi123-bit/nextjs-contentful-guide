export default function ReviewsCarouselBlock({ data }) {
  const reviews = data.reviews || [];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">
          {data.heading}
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {reviews.map((review) => (
            <article
              key={review.sys.id}
              className="border rounded-2xl p-6 shadow-sm"
            >
              <div className="mb-4 text-yellow-500 text-xl">
                {'★'.repeat(review.fields.rating)}
              </div>

              <p className="text-gray-700 mb-6">
                “{review.fields.quote}”
              </p>

              <div>
                <p className="font-semibold">
                  {review.fields.name}
                </p>

                <p className="text-sm text-gray-500">
                  {review.fields.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}