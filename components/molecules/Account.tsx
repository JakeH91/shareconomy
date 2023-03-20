import { useState, useEffect } from "react";
import {
  useUser,
  useSupabaseClient,
  Session,
} from "@supabase/auth-helpers-react";
import { Database } from "@/types/supabase";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export default function Account({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [first_name, setFirstName] = useState<Profiles["first_name"]>(null);
  const [last_name, setLastName] = useState<Profiles["last_name"]>(null);
  const [avatar_url, setAvatarUrl] = useState<Profiles["avatar_url"]>(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      const response = await fetch("api/profiles/get", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (data.message && response.status !== 406) {
        throw data.message;
      }

      if (data) {
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert(`Error: ${error}`);
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    first_name,
    last_name,
  }: {
    first_name: Profiles["first_name"];
    last_name: Profiles["last_name"];
    avatar_url: Profiles["avatar_url"];
  }) {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      const updates = {
        id: user.id,
        first_name,
        last_name,
        avatar_url,
        updated_at: new Date().toISOString(),
      };

      await fetch("api/profiles/upsert", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return loading ? (
    <h1>Loading</h1>
  ) : (
    <div className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="first_name">First Name</label>
        <input
          id="first_name"
          type="text"
          value={first_name || ""}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="last_name">Last Name</label>
        <input
          id="last_name"
          type="text"
          value={last_name || ""}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="avatar_url">Avatar URL</label>
        <input
          id="avatar_url"
          type="text"
          value={avatar_url || ""}
          onChange={(e) => setAvatarUrl(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile({ first_name, last_name, avatar_url })}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>
      <div>
        <button
          className="button block"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
