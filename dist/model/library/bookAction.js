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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.createCategory = exports.createAuthors = exports.getFinishedDates = exports.editBooks = void 0;
const action_1 = require("../../config/action");
// lets run a speed test for fitting everthing under one go
const editBooks = (uid, book, relType) => __awaiter(void 0, void 0, void 0, function* () {
    const data = book === null || book === void 0 ? void 0 : book.data;
    yield (0, action_1.write)(`
      MATCH (u:User { uid: $uid })
      OPTIONAL MATCH (b:Book { id: $id })
      WITH u, b
      CALL apoc.do.case([b is NOT NULL, 
          "MATCH (u)-[r]-(b) 
          CALL apoc.refactor.setType(r, relType) YIELD input, output 
          RETURN input, output",
          b is NULL,
          'MERGE (new:Book { id: id}) ON CREATE SET new = data 
          WITH u, new CALL apoc.create.relationship(u, $relType, { dateAdded: datetime() }, new )
          YIELD rel RETURN rel'
      ], 'CREATE (u)-[:READING]->(b)', {
         u: u, 
         b: b, 
         id: $id,
         relType: $relType, 
         data: $data 
      })
      YIELD value
      RETURN value
        `, {
        uid: uid,
        id: data === null || data === void 0 ? void 0 : data.id,
        relType: relType,
        data: data,
    });
});
exports.editBooks = editBooks;
const getFinishedDates = (uid, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { year, month, day } = data, props = __rest(data, ["year", "month", "day"]);
    yield (0, action_1.write)(`
      MATCH (u:User { uid: $uid})
      MERGE (u)-[rel:FINISHED]-(b:Book { id: $id })
         ON MATCH SET 
            rel.dateAdded = datetime(), 
            rel.year = $year, 
            rel.month = $month, 
            rel.day = $day
         ON CREATE SET 
            b = $props,
            rel.dateAdded = datetime(), 
            rel.year = $year, 
            rel.month = $month, 
            rel.day = $day
      `, {
        uid: uid,
        id: props.data.id,
        props: props.data,
        year: year,
        month: month,
        day: day,
    });
});
exports.getFinishedDates = getFinishedDates;
const createAuthors = (book) => __awaiter(void 0, void 0, void 0, function* () {
    const authors = book === null || book === void 0 ? void 0 : book.authors;
    if (!authors)
        return;
    (0, action_1.write)(`
      MATCH (book:Book { id: $id })
      UNWIND $authors as author
      MERGE (auth:Author { name: author })
      MERGE (book)<-[:WROTE]-(auth)
      `, {
        id: book === null || book === void 0 ? void 0 : book.data.id,
        authors: authors,
    });
});
exports.createAuthors = createAuthors;
// consider whether to have subcategories
// the concept is that it can get real messy?
const createCategory = (book) => __awaiter(void 0, void 0, void 0, function* () {
    const id = book === null || book === void 0 ? void 0 : book.data.id;
    const categories = book === null || book === void 0 ? void 0 : book.categories;
    if (!categories)
        return;
    (0, action_1.write)(`
      MATCH (book:Book { id: $id })
      UNWIND $categories as category
      WITH category[0] as titles, category, book
      UNWIND titles as title
      MERGE (cat:Category { name: title })
      WITH cat, category[1] as sections, book
      UNWIND sections as section 
      MERGE (sec:Section { name: section })

      WITH book, sec, cat
      MERGE (cat)<-[:IN_SECTION]-(sec)<-[:HAS_SECTION]-(book)
      MERGE (book)-[:IN_CATEGORY]->(cat)
      `, {
        id: id,
        categories: categories,
    });
});
exports.createCategory = createCategory;
// this should give warning to users
const deleteBook = (uid, book) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, action_1.write)(`
      MATCH (user:User { uid: $uid })--(book:Book { id: $id })
      DETACH DELETE book
      `);
});
exports.deleteBook = deleteBook;
