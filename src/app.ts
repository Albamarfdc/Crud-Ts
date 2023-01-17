import express from "express";
import morgan from "morgan";
import {create} from "express-handlebars";
import path from "path";



class Application {
  app: express.Application;

  constructor() {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  settings() {
    this.app.set("port", process.env.PORT || 3000);
    this.app.set("views", path.join(__dirname, "views"));
    this.app.engine(
      ".hbs",
      create({
        layoutsDir: path.join(this.app.get("views"), "layouts"),
        partialsDir: path.join(this.app.get("views"), "partials"),
        defaultLayout: "main",
        extname: ".hbs",
      }).engine
    );
    this.app.set("view engine", ".hbs");
  }


  middlewares() {
    this.app.use(morgan("dev"));
  }

  routes() {}

  start() {
    this.app.listen(this.app.get("port"), () => {
      console.log(`server on port 🟢 ${this.app.get("port")}`);
    });
  }
}

export default Application;
