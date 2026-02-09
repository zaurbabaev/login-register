import api from ".";

export const register = async (data) => {
  const check = await api.get(`/users?email=${data.email}`);

  if (check.data.length > 0) {
    throw new Error("Email already exists");
  }

  return api.post("/users", data);
};

export const login = async ({ email, password }) => {
  const res = await api.get(`/users?email=${email}&password=${password}`);

  if (res.data.length === 0) {
    throw new Error("Invalid credentials");
  }

  return res.data[0];
};
