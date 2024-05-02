const styles = require("./my-style.scss");
const div = <div className={ styles.app }>demo</div>

const div2 = <div className={ styles.appName }>demo</div>

const div3 = <div className={ styles["app-root"] }>demo</div>

const div4 = <div className={ styles.appRoot }>demo</div>