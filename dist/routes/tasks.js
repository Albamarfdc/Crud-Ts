"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
//MODEL
const Tasks_1 = __importDefault(require("../models/Tasks"));
router
    .route("/create")
    .get((req, res) => {
    res.render("tasks/create");
})
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const newTask = new Tasks_1.default({ title, description });
    yield newTask.save();
    res.redirect("/tasks/list");
}));
router.route("/list").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield Tasks_1.default.find().lean();
    res.render("tasks/list", { tasks });
}));
router.route("/delete/:id").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield Tasks_1.default.findByIdAndDelete(id);
    res.redirect("/tasks/list");
}));
router
    .route("/edit/:id")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const tasks = yield Tasks_1.default.findById(id).lean();
    console.log(tasks);
    res.render("tasks/edit", { tasks });
}))
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description } = req.body;
    yield Tasks_1.default.findByIdAndUpdate(id, { title, description });
    res.redirect("/tasks/list");
}));
exports.default = router;
