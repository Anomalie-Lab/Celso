import axios from "axios";

export async function GetGoogleOAuthToken(code: string) {
  const url = "https://oauth2.googleapis.com/token";

  const params = {
    code,
    client_id: process.env.VITE_GOOGLE_CLIENT_ID as string,
    client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
    redirect_uri: process.env.GOOGLE_URI_REDIRECT as string,
    grant_type: "authorization_code",
  };

  const qs = new URLSearchParams(params);

  try {
    const res = await axios.post<Auth.GoogleTokensResult>(url, qs.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function GetGoogleUser(access_token: string, id_token: string): Promise<Auth.GoogleUserResult> {
  try {
    const res = await axios.get<Auth.GoogleUserResult>(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
      headers: {
        Authorization: `Bearer ${id_token}`,
      },
    });

    return res.data;
  } catch (error: any) {
    throw new Error(`Failed to get Google user: ${error.message}`);
  }
}
