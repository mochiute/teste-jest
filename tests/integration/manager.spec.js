//subir o servidor no supertest
//Criar variavel de ambiente para rodar o teste no bd de teste

const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database");
const { cpf } = require("cpf-cnpj-validator");
const truncate = require("./truncate");

describe("MANAGERS", () => {
  afterAll(() => {
    connection.close();
  });

  beforeEach(async (done) => {
    await truncate(connection.models);
    done();
  });

  it("é possível criar um novo gerente", async () => {
    const response = await request(app).post("/managers").send({
      name: "Teste Teste",
      cpf: cpf.generate(),
      email: "teste@teste.com",
      cellphone: "551111111111",
      password: "123456",
    });

    expect(response.ok).toBeTruthy();
    expect(response.body).toHaveProperty("id");
  });

  it("não é possível cadastrar um gerente com cpf existente", async () => {
    let cpfGenerate = cpf.generate();
    let response = await request(app).post("/managers").send({
      name: "Teste Teste",
      cpf: cpfGenerate,
      email: "teste@teste.com",
      cellphone: "551111111111",
      password: "123456",
    });

    response = await request(app).post("/managers").send({
      name: "Alisson",
      cpf: cpfGenerate,
      email: "teste2@teste.com",
      cellphone: "552222222222",
      password: "123456",
    });

    expect(response.ok).toBeFalsy();
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("cpf already exists");
  });
});
