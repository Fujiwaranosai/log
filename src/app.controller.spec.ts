import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { expect } from 'chai';
import { LogEntity, Severity } from 'db';
import { SinonSandbox } from 'sinon';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import Chai = require('chai');
import Sinon = require('sinon');
import SinonChai = require('sinon-chai');
import Faker = require('faker');

Chai.use(SinonChai);

describe('AppController', () => {
  let appController: AppController;
  let app: TestingModule;
  let sandbox: SinonSandbox;

  before(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: getRepositoryToken(LogEntity),
          useValue: {},
        },
        AppService,
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  beforeEach(() => {
    sandbox = Sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('logInfo should work', () => {
    const service = app.get(AppService);
    const stub = sandbox.stub(service, 'log').resolves();
    const entity = {
      channel: Faker.random.word(),
      content: Faker.random.word(),
      severity: Faker.random.word(),
    };
    appController.logInfo(entity);
    expect(stub).to.be.calledWith({ ...entity, severity: Severity.Info });
  });

  it('logError should work', () => {
    const service = app.get(AppService);
    const stub = sandbox.stub(service, 'log').resolves();
    const entity = {
      channel: Faker.random.word(),
      content: Faker.random.word(),
      severity: Faker.random.word(),
    };
    appController.logError(entity);
    expect(stub).to.be.calledWith({ ...entity, severity: Severity.Error });
  });
});
