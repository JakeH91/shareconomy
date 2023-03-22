import styles from "@/styles/atoms/NavBarDropDown.module.css";
import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "@/types/supabase";

type NavBarDropDownProps = {
  expanded: boolean;
};

export default function NavBarDropDown({
  expanded,
}: NavBarDropDownProps): React.ReactElement {
  const supabase = useSupabaseClient<Database>();
  return (
    <div
      className={`${styles.dropdownContainer} ${
        expanded ? styles.expanded : ""
      }`}
    >
      <>
        <Link className={styles.dropdownItem} href="/profile">
          Profile
        </Link>
        <button
          className={styles.dropdownItem}
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </>
    </div>
  );
}
