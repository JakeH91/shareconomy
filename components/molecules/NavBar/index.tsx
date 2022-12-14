import { useUser } from "@auth0/nextjs-auth0/client";
import styles from "@/styles/molecules/NavBar.module.css";
import Avatar from "@/components/atoms/Avatar";
import NavBarDropDown from "@/components/atoms/NavBarDropDown";
import { useEffect, useRef, useState } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */

/**
 * Component that alerts if you click outside of it
 */

export default function NavBar(): React.ReactElement {
  const user = useUser();
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
        <Avatar
          handleClick={() => setExpanded((current) => !current)}
          isActive={expanded}
          src={user?.user?.picture}
        />
      </nav>
      <NavBarDropDown user={user} expanded={expanded} />
    </div>
  );
}
