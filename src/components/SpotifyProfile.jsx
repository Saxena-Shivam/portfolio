// Example: src/components/SpotifyProfile.js
import React, { useEffect, useState } from "react";

const accessToken = "YOUR_SPOTIFY";
function SpotifyProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProfile(data));
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h2>{profile.display_name}</h2>
      <img src={profile.images[0]?.url} alt="Profile" width={100} />
      <p>{profile.email}</p>
    </div>
  );
}

export default SpotifyProfile;
