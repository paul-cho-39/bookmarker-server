import express from 'express';
import { getUserRecordById, inititateAuthentication } from '../../../middleware/user/getUserById';
import {
   signin,
   signinWithProviderasync,
   signout,
   signup,
} from '../../../controllers/authentication/handleAuthentication';
import { checkUserStatus, createParseProviderData } from '../../../middleware/user/provider';
import { transportDataToNeo4j } from '../../../controllers/helpers/authentication/userData';

const route = express.Router();
route.use('/signup', inititateAuthentication);
route.use('/provider', createParseProviderData(transportDataToNeo4j), checkUserStatus);

// TODO: when user recieves its first time then possibly change
route.post('/signin', getUserRecordById, signin);
route.post('/provider', signinWithProviderasync);
route.post('/signup', getUserRecordById, signup);

route.delete('/signout', signout);

export default route;
