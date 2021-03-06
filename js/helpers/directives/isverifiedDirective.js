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
class IsVerifiedDirective extends apollo_server_express_1.SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = graphql_1.defaultFieldResolver } = field;
        field.resolve = function (...args) {
            return __awaiter(this, void 0, void 0, function* () {
                let _, input, UserModel;
                [_, { input }, { UserModel }] = args;
                const user = yield UserModel.findOne({ email: input.email }, (err, user) => {
                    return user;
                });
                const errorType = 'user login in error';
                if (!user) {
                    return { errorType, errorMessage: 'user does not exists' };
                }
                else if (!user.isVerified) {
                    return { errorType, errorMessage: 'verify your email first' };
                }
                else {
                    const result = yield resolve.apply(this, args);
                    return result;
                }
            });
        };
    }
}
exports.IsVerifiedDirective = IsVerifiedDirective;
//# sourceMappingURL=isverifiedDirective.js.map