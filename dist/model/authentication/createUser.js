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
exports.signOutUser = exports.signInUser = exports.createUser = void 0;
const action_1 = require("../../config/action");
const createUser = (data, name) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, emailVerified, uid, displayName, creationTime } = data;
    yield (0, action_1.write)(`
        CREATE 
        (u:User { uid: $uid, name: $name, email: $email,  emailVerified: $emailVerified, creationTime: $creationTime })
        WITH u
        CREATE (u)-[:HAS_SESSION]->(:Account { logginedInAt: $datetime })
     `, {
        uid: uid,
        name: !displayName ? name : displayName,
        email: email,
        emailVerified: emailVerified,
        creationTime: creationTime,
        datetime: new Date(),
    });
});
exports.createUser = createUser;
const signInUser = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, action_1.write)(`
        MATCH (u:User { uid: $uid })
        CREATE (u)-[:HAS_SESSION]->(:Account, { logginedInAt: $datetime })
        `, {
        datetime: new Date(),
    });
});
exports.signInUser = signInUser;
const signOutUser = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, action_1.write)(`
      MATCH(u:User { uid: $uid })-[r:HAS_SESSION]->(a:Account)
      DETACH DELETE r, a 
      `, {
        uid: uid,
    });
});
exports.signOutUser = signOutUser;
