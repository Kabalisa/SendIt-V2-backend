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
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const graphql_1 = require("graphql");
class IsAdminDirective extends apollo_server_express_1.SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = graphql_1.defaultFieldResolver } = field;
        field.resolve = function (...args) {
            return __awaiter(this, void 0, void 0, function* () {
                let _, __, UserModel;
                [_, __, { UserModel }] = args;
                const user = yield UserModel.findOne({ email: 'ikabalisa20@gmail.com' }, (err, user) => {
                    return user;
                });
                if (user.role === 'ADMIN') {
                    const result = yield resolve.apply(this, args);
                    return result;
                }
                else {
                    throw new Error('you are not the admin');
                }
            });
        };
    }
}
exports.IsAdminDirective = IsAdminDirective;
//# sourceMappingURL=authDirective.js.map