import { useState } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "@/types/supabase";
import Loading from "@/components/organisms/Loading";
import FormSubmit from "@/components/atoms/FormAtoms/FormSubmit";
import { SubmitHandler } from "react-hook-form";
import styles from "@/styles/organisms/Auth.module.css";
import InputWithLabel from "@/components/atoms/FormAtoms/InputWithLabel";

type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export default function Account({ profileData }: { profileData: Profiles }) {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [loading, setLoading] = useState(false);
  const [first_name, setFirstName] = useState<Profiles["first_name"]>(
    profileData.first_name
  );
  const [last_name, setLastName] = useState<Profiles["last_name"]>(
    profileData.last_name
  );
  const [avatar_url, setAvatarUrl] = useState<Profiles["avatar_url"]>(
    profileData.avatar_url
  );

  const onSubmit: SubmitHandler<Profiles> = async (data) => {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      const updates = {
        id: user.id,
        first_name: data.first_name,
        last_name: data.last_name,
        avatar_url: data.avatar_url,
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
  };

  // TODO: Refresh after update, to repopulate the form fields

  return loading ? (
    <Loading />
  ) : (
    <div>
      <FormSubmit
        styles={styles}
        onSubmit={onSubmit}
        buttonText={loading ? "Loading ..." : "Update"}
      >
        <>
          <InputWithLabel
            id={"email"}
            label={"Email:"}
            type={"text"}
            value={profileData.email}
            disabled
          />
          <InputWithLabel
            id={"first_name"}
            label={"First Name:"}
            type={"text"}
            value={first_name || ""}
            autoComplete={"given-name"}
          />
          <InputWithLabel
            id={"last_name"}
            label={"Last Name:"}
            type={"text"}
            value={last_name || ""}
            autoComplete={"family-name"}
          />
          <InputWithLabel
            id={"avatar_url"}
            label={"Avatar URL::"}
            type={"text"}
            value={avatar_url || ""}
          />
        </>
      </FormSubmit>
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
