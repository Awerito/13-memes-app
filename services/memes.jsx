const baseUrl = "https://memes-api.grye.org";

export const login = async (username, password) => {
  try {
    const response = await fetch(`${baseUrl}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json",
      },
      body: new URLSearchParams({ username, password }).toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      return [null, data.detail || "Login failed"];
    }

    return [data, null];
  } catch (error) {
    return [null, error.message];
  }
};

export const getMemes = async (page, limit) => {
  try {
    const response = await fetch(
      `https://memes-api.grye.org/memes/?page=${page}&limit=${limit}`,
    );

    const data = await response.json();

    if (!response.ok) {
      return [null, "Failed to fetch memes"];
    }

    return [data, null];
  } catch (error) {
    return [null, error.message];
  }
};
