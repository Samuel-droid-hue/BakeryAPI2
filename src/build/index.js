"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const othersRoutes_1 = __importDefault(require("./routes/othersRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const productsRoutes_1 = __importDefault(require("./routes/productsRoutes"));
const basketsRoutes_1 = __importDefault(require("./routes/basketsRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
        this.app.use('/documentation', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/api/users/', usersRoutes_1.default);
        this.app.use('/api/auth/', authRoutes_1.default);
        this.app.use('/api/products/', productsRoutes_1.default);
        this.app.use('/api/baskets/', basketsRoutes_1.default);
        this.app.use('/api/others/', othersRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
