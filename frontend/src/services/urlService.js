import api from "../utils/http";

export async function fetchUrlsApi() {
  const res = await api.get("/api/url");
  return res.data;
}

export async function createShortUrl(payload) {
  const res = await api.post("/api/url/shorten", payload);
  return res.data;
}

export async function removeUrl(id) {
  const res = await api.delete(`/api/url/${id}`);
  return res.data;
}

export async function fetchQrCodeApi(id) {
  const res = await api.get(`/api/url/qr/${id}`);
  return res.data;
}
