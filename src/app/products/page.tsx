import { readFileSync } from "fs";
import { join } from "path";
import Image from "next/image";

// GraphQL query type definition
interface Product {
  id: string;
  name: string;
  sku: string;
  price_range: {
    minimum_price: {
      final_price: {
        value: number;
        currency: string;
      };
    };
    maximum_price: {
      final_price: {
        value: number;
        currency: string;
      };
    };
  };
  small_image: {
    url: string;
    label: string;
  };
  url_key?: string;
  type_id?: string;
}

interface ProductsResponse {
  products: {
    items: Product[];
    total_count: number;
    page_info: {
      current_page: number;
      page_size: number;
      total_pages: number;
    };
  };
}

// Server-side data fetching function
async function fetchProducts(
  pageSize: number = 5,
  currentPage: number = 1,
  search: string = "",
  filter: any = {},
  sort: any = {}
): Promise<ProductsResponse | null> {
  try {
    // Read the GraphQL query from the file
    const queryPath = join(
      process.cwd(),
      "src",
      "app",
      "qraphql",
      "query",
      "test.graphql"
    );
    const query = readFileSync(queryPath, "utf8");

    const GRAPHQL_ENDPOINT = process.env.GRAPHQL_URL ?? "";

    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any necessary authentication headers here
        // 'Authorization': `Bearer ${process.env.API_TOKEN}`,
      },
      body: JSON.stringify({
        query,
        variables: {
          pageSize,
          currentPage,
          search,
          filter,
          sort,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    console.log("GraphQL Response Data:", data);
    if (data.errors) {
      console.error("GraphQL errors:", data.errors);
      return null;
    }

    return data.data;
  } catch (error) {
    console.error("Error fetching bestseller products:", error);
    return null;
  }
}

// SSR Component
export default async function ProductsPage() {
  // Fetch data on the server - you can add filters/search here
  const data = await fetchProducts(110, 5, "", {}, {});
  console.log("Fetched Products Data:", data);
  if (!data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Bestseller Products</h1>
        <p className="text-red-500">
          Failed to load products. Please try again later.
        </p>
      </div>
    );
  }

  const { items: products, total_count, page_info } = data.products;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Bestseller Products</h1>

      <div className="mb-4 text-sm text-gray-600">
        Showing page {page_info.current_page} of {page_info.total_pages} (
        {total_count} total products)
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="aspect-square mb-4 bg-gray-100 rounded overflow-hidden relative">
              <Image
                src={product.small_image.url}
                alt={product.small_image.label}
                fill
                // className="object-cover"
                // sizes="(max-width: 7px) 10vw, (max-width: 1000px) 50vw, 33vw"
              />
            </div>

            <h3 className="font-semibold text-lg mb-2 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2">SKU: {product.sku}</p>

            <div className="price">
              <span className="text-lg font-bold text-green-600">
                {product.price_range.minimum_price.final_price.currency}{" "}
                {product.price_range.minimum_price.final_price.value}
              </span>
              {product.price_range.minimum_price.final_price.value !==
                product.price_range.maximum_price.final_price.value && (
                <span className="text-sm text-gray-500 ml-2">
                  - {product.price_range.maximum_price.final_price.currency}{" "}
                  {product.price_range.maximum_price.final_price.value}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No products found.</p>
      )}
    </div>
  );
}
