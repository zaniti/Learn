import express from 'express';
import { addAnswer, getAllAnswers, getAnswer, getAnswerById, getAnswerReview, updateAnswer } from '../controllers/answerController.js';
import { getAllPayments, getUserPayments, requestPayment, updatePaymentState, updatePoints } from '../controllers/paymentController.js';
import { addProblem, deleteProblem, getAllProblems, getProblem, updateProblem } from '../controllers/problemController.js';
import { addTopic, countTopic, deleteTopic, getAllTopics, updateTopic } from '../controllers/topicController.js';
import { addUser, getAllUsers, getSingleUser, getUserDetails, updateEmail, updateUser, updatePassword, AdminUpdateUser, deleteUser, verifyOdlPassword } from '../controllers/userController.js';
const router = express.Router();

router.get('/', getAllUsers);
router.post('/register', addUser);
router.post('/login', getSingleUser);
router.post('/updateUserDetails', getUserDetails);


router.post('/update', updateUser);
router.post('/updateemail', updateEmail);


router.post('/adminupdate', AdminUpdateUser);
router.post('/admindelete', deleteUser);

// password update
router.post('/update/password/old', verifyOdlPassword);
router.post('/updatepassword', updatePassword);

//topics
router.post('/topic', addTopic);
router.get('/topic', getAllTopics);
router.post('/topicdelete', deleteTopic);
router.post('/topicupdate', updateTopic);
router.post('/topic/count', countTopic);


//problem
router.get('/problem', getAllProblems);
router.post('/problemid', getProblem);
router.post('/problem', addProblem);
router.post('/problemdelete', deleteProblem);
router.post('/problemupdate', updateProblem);

//Answer
router.post('/answer', addAnswer);
router.post('/answerid', getAnswerById);
router.get('/answer', getAllAnswers);
router.post('/answer/update', updateAnswer);
router.post('/answercount', getAnswerReview);
router.post('/answercount/valid', getAnswer);

//Payment request
router.post('/payment', requestPayment);
router.post('/payment/update', updatePoints);
router.get('/payment', getAllPayments);
router.post('/payment/update/state', updatePaymentState);
router.post('/payment/user', getUserPayments);

export default router;
