import styles from "./styles.module.scss";

function Offices() {
  return (
    <section>
      <div className={styles.wrapper}>
        <div className={styles.office}>
          <div className={styles.image} />
          <div className={styles.heading}>Berlin</div>
          <div className={styles.text}>
            <a>welcome@foundry.berlin</a>
          </div>
          <div className={`${styles.phone} ${styles.hasMargin}`}>
            <a>....</a>
          </div>
          <div className={styles.address}>Loading address...</div>
        </div>
        <div className={styles.office}>
          <div className={styles.image} />
          <div className={styles.heading}>Zurich</div>
          <div className={styles.text}>
            <a>welcome@foundry.ch</a>
          </div>
          <div className={`${styles.phone} ${styles.hasMargin}`}>
            <a>....</a>
          </div>
          <div className={styles.address}>Loading address...</div>
        </div>
        <div className={styles.office}>
          <div className={styles.image} />
          <div className={styles.heading}>New York</div>
          <div className={styles.text}>
            <a>welcome@foundry.newyork</a>
          </div>
          <div className={`${styles.phone} ${styles.hasMargin}`}>
            <a>....</a>
          </div>
          <div className={styles.address}>Loading address...</div>
        </div>
      </div>
    </section>
  );
}

export default Offices;
