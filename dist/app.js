"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const express_handlebars_1 = require("express-handlebars");
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("./routes/index"));
const tasks_1 = __importDefault(require("./routes/tasks"));
class Application {
    constructor() {
        this.app = (0, express_1.default)();
        this.settings();
        this.middlewares();
        this.routes();
    }
    settings() {
        this.app.set("port", process.env.PORT || 3000);
        this.app.set("views", path_1.default.join(__dirname, "views"));
        this.app.engine(".hbs", (0, express_handlebars_1.create)({
            layoutsDir: path_1.default.join(this.app.get("views"), "layouts"),
            partialsDir: path_1.default.join(this.app.get("views"), "partials"),
            defaultLayout: "main",
            extname: ".hbs",
        }).engine);
        this.app.set("view engine", ".hbs");
    }
    middlewares() {
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use(index_1.default);
        this.app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
        this.app.use("/tasks", tasks_1.default);
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log(`server on port 🟢 ${this.app.get("port")}`);
        });
    }
}
exports.default = Application;
