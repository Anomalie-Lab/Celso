export function getGoogleOAuthURL() {

    const options = {
      redirect_uri: `${process.env.NEXT_PUBLIC_API_URL}auth/google`,
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"].join(" "),
    };
  
    const qs = new URLSearchParams(options);
    return `https://accounts.google.com/o/oauth2/v2/auth?${qs.toString()}`;
  }