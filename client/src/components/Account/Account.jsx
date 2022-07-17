import styles from "./Account.module.css";

const Account = () => {
  return (
    <div className={styles.container}>
      <span
        onClick={() => {
          navigator.clipboard.writeText("aoxpeep@gmail.com");
        }}
      >
        <label>Email:</label>
        <p>aoxpeep@gmail.com</p>
      </span>
      <span
        onClick={() => {
          navigator.clipboard.writeText(12345678);
        }}
      >
        <label>Password:</label>
        <p
          onClick={() => {
            navigator.clipboard.writeText(12345678);
          }}
        >
          12345678
        </p>
      </span>
    </div>
  );
};

export default Account;
