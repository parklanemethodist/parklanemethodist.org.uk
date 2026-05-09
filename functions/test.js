export async function onRequest(context) {
  return new Response("Functions are working!", {
    headers: { "content-type": "text/plain" },
  });
}
