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
exports.initiateUserConstraint = exports.signOutUser = exports.signInUser = exports.createUser = void 0;
const action_1 = require("../../config/action");
// TODO: create a better file name for this
const createUser = (data, name) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, emailVerified, uid, displayName, creationTime } = data;
    yield (0, action_1.write)(`
        CREATE 
        (u:User { uid: $uid, name: $name, email: $email,  emailVerified: $emailVerified, creationTime: $creationTime })
        WITH u
        CREATE (u)-[:HAS_SESSION]->(:Account { logginedInAt: datetime() })
     `, {
        uid: uid,
        name: !displayName ? name : displayName,
        email: email,
        emailVerified: emailVerified,
        creationTime: creationTime,
    });
});
exports.createUser = createUser;
const signInUser = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, action_1.write)(`
        MATCH (u:User { uid: $uid })
        CREATE (u)-[:HAS_SESSION]->(:Account { logginedInAt: datetime() })
        `, {
        uid: uid,
    });
});
exports.signInUser = signInUser;
const signOutUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, action_1.write)(`
      MATCH(u:User { email: $email })-[r:HAS_SESSION]->(a:Account)
      DETACH DELETE r, a 
      `, {
        email: email,
    });
});
exports.signOutUser = signOutUser;
const initiateUserConstraint = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, action_1.write)(`
   CREATE CONSTRAINT user_email_constraint IF NOT EXISTS FOR (u:User) REQUIRE u.email IS UNIQUE
      `)
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, action_1.write)(`
      CREATE CONSTRAINT user_id_constraint IF NOT EXISTS FOR (u:User) REQUIRE u.uid IS UNIQUE
      `);
    }))
        .catch((error) => console.log('Error:', error));
});
exports.initiateUserConstraint = initiateUserConstraint;
