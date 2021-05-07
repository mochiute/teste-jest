const generatedId = require("../../src/utils/generateUUID");
//Se é possível gerar um uuid unico
//Se está vindo um id
//Se esse id é uma string
//Se o tamnaho da string é oq eu espero, 36 caracteres

describe("generateUUID", () => {
  it("Se é possivel gerar um id único", () => {
    const id = generatedId();

    expect(id).toBeDefined();
    expect(typeof id).toBe("string");
    expect(id).toHaveLength(36);
  });
});
