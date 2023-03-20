import styles from "@/styles/atoms/NavBarDropDown.module.css";
import { User } from "@supabase/auth-helpers-react";

type NavBarDropDownProps = {
  user: User;
  expanded: boolean;
};

export default function NavBarDropDown({
  user,
  expanded,
}: NavBarDropDownProps): React.ReactElement {
  // TODO: Change the links to not be Auth0 shit anymore
  return (
    <div
      className={`${styles.dropdownContainer} ${
        expanded ? styles.expanded : ""
      }`}
    >
      {user ? (
        <a className={styles.dropdownItem} href="/api/auth/logout">
          Logout
        </a>
      ) : (
        <a className={styles.dropdownItem} href="/api/auth/login">
          Login
        </a>
      )}
    </div>
  );
}
