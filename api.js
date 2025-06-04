const BASE_URL = "https://backendtracker-83f28ff70a26.herokuapp.com";

export async function sendCode(email) {
  const res = await fetch(`${BASE_URL}/auth/send-code`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });
  return await res.json();
}

export async function checkCode(email, code) {
  const res = await fetch(`${BASE_URL}/auth/check-code`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code })
  });
  return await res.json();
}

export async function getHistory(device_id, date) {
  let url = `${BASE_URL}/locations/history?device_id=${encodeURIComponent(device_id)}`;
  if (date) url += `&date=${date}`;
  const res = await fetch(url);
  return await res.json();
}
