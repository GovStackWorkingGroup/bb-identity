import supertest from 'supertest';
import StatusCodes from 'http-status-codes';
import { SuperTest, Test, Response } from 'supertest';

import app from '@server';
import { pErr } from '@shared/functions';
import { p as userPaths } from '@routes/user-router';
import loginAgent from '../support/login-agent';
import { ParamMissingError, UserNotFoundError } from '@shared/errors';

type TReqBody = string | object | undefined;

import authenticateResponse from '../../src/views/authenticateResponse.json';

describe('user-router', () => {

    const authenticatePath = '/api/authenticate';

    const { BAD_REQUEST, CREATED, OK } = StatusCodes;

    let agent: SuperTest<Test>;
    let jwtCookie: string;

    beforeAll((done) => {
        agent = supertest.agent(app);
        loginAgent.login(agent, (cookie: string) => {
            jwtCookie = cookie;
            done();
        });
    });


    /***********************************************************************************
     *                                    Test Post
     **********************************************************************************/

     describe(`"POST:${authenticatePath}"`, () => {

        const callApi = () => {
            return agent.post(authenticatePath).set('Cookie', jwtCookie);
        };


        it(`should return a JSON object with the stubbed response and a status code of "${OK}" if the
            request was successful.`, (done) => {
            // Call API
            callApi()
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(OK);
                    expect(res.body.transactionId).toEqual('TXN123456789');
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });
    });
});
