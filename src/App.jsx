import styles from "./style";
import { Authenti } from "./components";


export const App = () => {
  return (
  //className="bg-primary w-full overflow-hidden"
  <div >
  <div className={` ${styles.flexCenter}`}>
    <div className='-mx-4 flex flex-wrap'>
      <Authenti />
    </div>
  </div>
  </div>
  )
}

export default App