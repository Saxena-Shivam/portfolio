// Example: src/components/SpotifyProfile.js
import React, { useEffect, useState } from "react";

const accessToken =
  "BQAoCjwrXxlE2APndmedsW5kGhKAAtH87yIrKwjOeHW6ydx9TfeT-YJecsq9U_J8XhPz04Fh04cV52BIBzbUzxlDof5NHQ6KhyGWAyRODwisdmyBCJ6ysL3UG6NRoTMv_8xuzcJBBamlT3yXquB8YPsqzadJQkZAlX3K8wVmki5Lg6rG5Gc0IWg48CQY7laovzOEUZCr3gkcCfz70RGnJRLqmy73WMFQ5iAkLrcA0N-shNAa7B9QSfZptrc"; // Replace with your token

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
