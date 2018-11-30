var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var User = require('../../model/user');
var Feedback = require('../../model/feedback')
var Category = require('../../model/category')
var Submission = require('../../model/submission')


chai.use(chaiHttp);

var uname = process.env.UNIT_TEST_USERNAME
var pword = process.env.UNIT_TEST_PASSWORD
var mail = process.env.UNIT_TEST_EMAIL

describe('test make a critique', function () {

    this.beforeAll(function () {
        User.findOne({ username: uname }).then((user) => {
            var token = user['tokens'][0]['token'][0]
            //add submission
            var info = {
                category: 'example category',
                submissionName: 'submission to be critiqued',
                submissionText: 'submission text to be critiqued'
            }

            chai.request(server)
                .post('/submission/add')
                .set('content-type', 'application/x-www-form-urlencoded')
                .set('token', token)
                .send(info)
                .end((err, res) => {
                    //give feedback to that submission

                    console.log("asdjasoids "+ res.res.text)
                    var obj = JSON.parse(res.res.text)
                    console.log(obj._id)
                    var critique_info = {
                        feedbackGood: 'good',
                        feedbackBad: 'bad',
                        feedbackWork: 'work',
                        submissionID: obj._id
                    }

                    chai.request(server)
                        .post('/feedback/critique')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .set('token', token)
                        .send(critique_info)
                        .end((err, res) => { })
                })
        })
    })

    describe('Critique without feedbackGood', function (done) {
        it('should return 400', function (done) {
            Submission.findOne({ submissionName: 'submission name' }).then((sub) => {
                var info = {
                    feedbackBad: 'bad',
                    feedbackWork: 'work',
                    submissionID: sub._id
                }
                User.findOne({ username: uname }, (err, user) => {
                    //do the get request here 

                    var token = user['tokens'][0]['token'][0]

                    chai.request(server)
                        .post('/feedback/critique')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .set('token', token)
                        .send(info)
                        .end((err, res) => {
                            // console.log(res)
                            res.should.have.status(400)
                            done()
                        })
                });
            })
        })
    })

    describe('Critique without feedbackBad', function (done) {
        it('should return 400', function (done) {
            Submission.findOne({ submissionName: 'submission name' }).then((sub) => {
                var info = {
                    feedbackGood: 'good',
                    feedbackWork: 'work',
                    submissionID: sub._id
                }
                User.findOne({ username: uname }, (err, user) => {
                    //do the get request here 

                    var token = user['tokens'][0]['token'][0]

                    chai.request(server)
                        .post('/feedback/critique')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .set('token', token)
                        .send(info)
                        .end((err, res) => {
                            res.should.have.status(400)
                            done()
                        })
                });
            })
        })
    })

    describe('Critique without feedbackWork', function (done) {
        it('should return 400', function (done) {
            Submission.findOne({ submissionName: 'submission name' }).then((sub) => {
                var info = {
                    feedbackGood: 'good',
                    feedbackBad: 'bad',
                    submissionID: sub._id
                }
                User.findOne({ username: uname }, (err, user) => {
                    //do the get request here 

                    var token = user['tokens'][0]['token'][0]

                    chai.request(server)
                        .post('/feedback/critique')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .set('token', token)
                        .send(info)
                        .end((err, res) => {
                            res.should.have.status(400)
                            done()
                        })
                });
            })
        })
    })

    describe('Critique without submissionID', function (done) {
        it('should return 400', function (done) {
            Submission.findOne({ submissionName: 'submission name' }).then((sub) => {
                var info = {
                    feedbackGood: 'good',
                    feedbackBad: 'bad',
                    feedbackWork: 'work',
                }
                User.findOne({ username: uname }, (err, user) => {
                    //do the get request here 

                    var token = user['tokens'][0]['token'][0]

                    chai.request(server)
                        .post('/feedback/critique')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .set('token', token)
                        .send(info)
                        .end((err, res) => {
                            res.should.have.status(400)
                            done()
                        })
                });
            })
        })
    })

    describe('Critique submission that user has already critiqued', function (done) {
        //need to use a beforeAll
        it('should return 401', function (done) {
            Submission.findOne({ submissionName: 'submission to be critiqued' }).then((sub) => {
                // console.log(sub)
                var info = {
                    feedbackGood: 'asdjasdoij',
                    feedbackBad: 'bad',
                    feedbackWork: 'work',
                    submissionID: sub._id.toString()
                }
                User.findOne({ username: uname }, (err, user) => {
                    //do the get request here 

                    var token = user['tokens'][0]['token'][0]

                    chai.request(server)
                        .post('/feedback/critique')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .set('token', token)
                        .send(info)
                        .end((err, res) => {
                            console.log(res)
                            res.should.have.status(401)
                            done()
                        })
                });
            })
        })
    })

    describe('Critique with bad auth', function (done) {
        it('should return 401', function (done) {
            Submission.findOne({ submissionName: 'submission name' }).then((sub) => {
                var info = {
                    feedbackGood: 'good',
                    feedbackBad: 'bad',
                    feedbackWork: 'work',
                    submissionID: sub._id
                }
                User.findOne({ username: uname }, (err, user) => {
                    //do the get request here 

                    var token = user['tokens'][0]['token'][0]

                    chai.request(server)
                        .post('/feedback/critique')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .set('token', 'bad token')
                        .send(info)
                        .end((err, res) => {
                            res.should.have.status(401)
                            done()
                        })
                });
            })
        })
    })

    describe('Critique with correct info', function (done) {
        it('should return 200', function (done) {
            Submission.findOne({ submissionName: 'submission name' }).then((sub) => {
                var info = {
                    feedbackGood: 'good',
                    feedbackBad: 'bad',
                    feedbackWork: 'work',
                    submissionID: sub._id.toString()
                }
                User.findOne({ username: uname }, (err, user) => {
                    //do the get request here 

                    var token = user['tokens'][0]['token'][0]

                    chai.request(server)
                        .post('/feedback/critique')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .set('token', token)
                        .send(info)
                        .end((err, res) => {
                            res.should.have.status(200)
                            done()
                        })
                });
            })
        })
    })

})