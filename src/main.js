"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var node_sass_1 = __importDefault(require("node-sass"));
//Routes
var routes_1 = require("./routes");
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
node_sass_1.default.render({
    file: path_1.default.join(__dirname, 'styles', 'styles.scss'),
    outFile: path_1.default.join(__dirname, 'public', 'styles', 'styles.css')
}, function (err, res) {
    fs_1.default.writeFile(path_1.default.join(__dirname, 'public', 'styles', 'styles.css'), res.css, function (err) {
        if (err)
            throw err;
    });
});
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// view engine setup
app.engine('handlebars', express_handlebars_1.default());
app.set('view engine', 'handlebars');
app.set('views', path_1.default.join(__dirname, 'views'));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/', routes_1.indexRouter);
app.listen(3000, function () {
    console.log('server running on port 3000');
});
