const API_URL = process.env.WORDPRESS_API_URL;

export default async function fetchAPI(
  query,
  { variables } = {},
  { cache, revalidate } = {}
) {
  const headers = { "Content-Type": "application/json" };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      "Authorization"
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
    cache,
    next: { revalidate },
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error("Failed to fetch API");
  }
  return json.data;
}
