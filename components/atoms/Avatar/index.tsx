import styles from "@/styles/atoms/Avatar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

type AvatarProps = {
  src?: string;
  isActive: boolean;
  handleClick: () => void;
};

export default function Avatar({
  src,
  isActive,
  handleClick,
}: AvatarProps): React.ReactElement {
  if (!src) {
    return (
      <div
        onClick={handleClick}
        className={`${styles.emptyCircle} ${isActive ? styles.active : ""}`}
      >
        <FontAwesomeIcon icon={faCaretDown} />
      </div>
    );
  }
  return (
    <img
      onClick={handleClick}
      className={styles.avatar}
      src={src}
      alt="User Avatar"
    />
  );
}
