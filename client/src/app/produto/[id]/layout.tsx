import { Products } from '@/api/products.api';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface ProductLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

// Função para buscar dados do produto (você pode adaptar conforme sua API)
async function getProduct(id: string) {
  try {
    const response = await Products.getById(Number(id));
    
    if(!response) {
      return null;
    }
    
    return response;
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await getProduct(params.id);
  
  if (!product) {
    return {
      title: 'Produto Não Encontrado',
      description: 'O produto que você está procurando não foi encontrado.',
    };
  }

  const averageRating = product.comments?.length > 0 
    ? (product.comments.reduce((acc: number, comment: any) => acc + comment.rating, 0) / product.comments.length).toFixed(1)
    : '0';

  const title = `${product.title} - Compre Online | Sua Loja`;
  const description = product.summary || product.description || `Compre ${product.title} com qualidade garantida. Entrega rápida e preços competitivos.`;

  return {
    title,
    description,
    keywords: [
      product.title,
      product.brand,
      ...(product.categories || []),
      'comprar online',
      'loja virtual',
      'e-commerce'
    ].filter(Boolean).join(', '),
    openGraph: {
      title,
      description,
      type: 'website',
      images: product.images?.length && product.images.length > 0 ? [
        {
          url: product.images[0],
          width: 800,
          height: 600,
          alt: product.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: product.images?.length && product.images.length > 0 ? [product.images[0]] : [],
    },
    alternates: {
      canonical: `/produto/${params.id}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'product:price:amount': product.price?.toString(),
      'product:price:currency': 'BRL',
      'product:availability': product.stock > 0 ? 'in stock' : 'out of stock',
      'product:condition': 'new',
      'product:brand': product.brand,
      'product:rating': averageRating,
      'product:rating_count': product.comments?.length?.toString() || '0',
    },
  };
}

export default async function ProductLayout({ children, params }: ProductLayoutProps) {
  const product = await getProduct(params.id);
  
  if (!product) {
    notFound();
  }

  return (
    <>
      {/* Structured Data para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.title,
            description: product.description || product.summary,
            image: product.images || [],
            brand: {
              '@type': 'Brand',
              name: product.brand,
            },
            offers: {
              '@type': 'Offer',
              price: product.price,
              priceCurrency: 'BRL',
              availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
              seller: {
                '@type': 'Organization',
                name: 'Sua Loja',
              },
            },
            aggregateRating: product.comments?.length > 0 ? {
              '@type': 'AggregateRating',
              ratingValue: (product.comments.reduce((acc: number, comment: any) => acc + comment.rating, 0) / product.comments.length).toFixed(1),
              reviewCount: product.comments.length,
              bestRating: 5,
              worstRating: 1,
            } : undefined,
            review: product.comments?.slice(0, 5).map((comment: any) => ({
              '@type': 'Review',
              reviewRating: {
                '@type': 'Rating',
                ratingValue: comment.rating,
                bestRating: 5,
                worstRating: 1,
              },
              author: {
                '@type': 'Person',
                name: comment.user.fullname,
              },
              reviewBody: comment.message,
              datePublished: comment.created_at,
            })) || [],
          }),
        }}
      />
      {children}
    </>
  );
}
