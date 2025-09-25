//api url надо вынести в .env но для теста пойдет и так

export const signIn = async (name: string, password: string) => {
  const response = await fetch("http://127.0.0.1:8000/auth/sign-in", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, password }),
  });

  if (!response.ok) throw new Error("Sign in failed");
  return response.json();
};

export const register = async (name: string, password: string) => {
  const response = await fetch("http://127.0.0.1:8000/auth/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, password }),
  });

  if (!response.ok) throw new Error("Registration failed");
  return response.json();
};
