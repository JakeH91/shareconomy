import styles from "@/styles/atoms/NavBarDropDown.module.css";

type NavBarDropDownProps = {
  // user: UserContext;
  expanded: boolean;
};

export default function NavBarDropDown({
  // user,
  expanded,
}: NavBarDropDownProps): React.ReactElement {
  return (
    <div
      className={`${styles.dropdownContainer} ${
        expanded ? styles.expanded : ""
      }`}
    >
      <p>Hi</p>
      {/* {user.user ? (
        <a className={styles.dropdownItem} href="/api/auth/logout">
          Logout
        </a>
      ) : (
        <a className={styles.dropdownItem} href="/api/auth/login">
          Login
        </a>
      )} */}
    </div>
  );
}
