import { contentfulClient } from '@/lib/contentful';
import HeroBlock from '@/components/HeroBlock';
import ReviewsCarouselBlock from '@/components/ReviewsCarouselBlock';
import LeadFormBlock from '@/components/LeadFormBlock';

async function getLandingPage(slug) {
  const response = await contentfulClient.getEntries({
    content_type: 'landingPage',
    'fields.slug': slug,
    include: 10,
  });

  return response.items[0];
}

export async function generateMetadata({ params }) {
  const page = await getLandingPage(params.slug);

  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: page.fields.seoTitle,
    description: page.fields.seoDescription,
  };
}

export default async function LandingPage({ params }) {
  const page = await getLandingPage(params.slug);

  if (!page) {
    return <div className="p-10">Page not found.</div>;
  }

  const blocks = page.fields.blocks || [];

  return (
    <main>
      {blocks.map((block) => {
        const contentType = block.sys.contentType.sys.id;

        switch (contentType) {
          case 'heroBlock':
            return (
              <HeroBlock
                key={block.sys.id}
                data={block.fields}
              />
            );

          case 'reviewsCarouselBlock':
            return (
              <ReviewsCarouselBlock
                key={block.sys.id}
                data={block.fields}
              />
            );

          case 'leadFormBlock':
            return (
              <LeadFormBlock
                key={block.sys.id}
                data={block.fields}
              />
            );

          default:
            return null;
        }
      })}
    </main>
  );
}