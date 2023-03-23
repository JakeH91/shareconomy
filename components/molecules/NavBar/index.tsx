import styles from "@/styles/molecules/NavBar.module.css";
import Avatar from "@/components/atoms/Avatar";
import NavBarDropDown from "@/components/atoms/NavBarDropDown";
import { useSession, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useRef, useState } from "react";
import useGetProfile from "@/utils/hooks/useGetProfile";
import Link from "next/link";

/**
 * Hook that alerts clicks outside of the passed ref
 */

/**
 * Component that alerts if you click outside of it
 */

export default function NavBar(): React.ReactElement {
  const user = useUser();
  const session = useSession();
  const [profile, isLoading, error] = useGetProfile(session);
  const [expanded, setExpanded] = useState(false);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setExpanded(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <div ref={wrapperRef} className={styles.navbarWrapper}>
      <nav className={styles.navbar}>
        <Link className={styles.navbarButton} href={"/"}>
          Home
        </Link>
        {user ? (
          <div>
            <Avatar
              handleClick={() => setExpanded((current) => !current)}
              isActive={expanded}
              src={profile?.avatar_url}
            />
          </div>
        ) : (
          <div className={styles.navbarButtonCollection}>
            <Link className={styles.navbarButton} href={"/auth/sign-in"}>
              Sign In
            </Link>
            <Link className={styles.navbarButton} href={"/auth/sign-up"}>
              Create Account
            </Link>
          </div>
        )}
      </nav>
      {user && <NavBarDropDown expanded={expanded} />}
    </div>
  );
}
