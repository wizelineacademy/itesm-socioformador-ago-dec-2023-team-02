// Example from https://beta.reactjs.org/learn

import { useState } from "react";
import styles from "./counters.module.css";

function MyButton(): JSX.Element {
  const [count, setCount] = useState(0);

  function handleClick(): void {
    setCount(count + 1);
  }

  return (
    <div>
      <button className={styles.counter} onClick={handleClick} type="button">
        Clicked {count} times
      </button>
    </div>
  );
}

export default function MyApp(): JSX.Element {
  return <MyButton />;
}
