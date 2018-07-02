import { createData, createValidations } from "."

describe("createData()", () => {
  it("creates data object", () => {
    const required = () => {}
    const numeric = () => {}

    const schema = {
      test: {
        field: {
          required,
          $length: 1,
          $each: {
            id: {
              required,
              $value: 1
            }
          }
        },
        anotherField: {
          required,
          numeric
        }
      }
    }

    expect(createData(schema)).toEqual({
      test: {
        field: [{ id: 1 }],
        anotherField: null
      }
    })
  })
})

describe("createValidations()", () => {
  it("creates validation schema", () => {
    const required = () => {}
    const numeric = () => {}

    const schema = {
      test: {
        field: {
          required,
          $length: 1,
          $each: {
            id: {
              required,
              $value: 1
            }
          }
        },
        anotherField: {
          required,
          numeric
        }
      }
    }

    expect(createValidations(schema)).toEqual({
      test: {
        field: {
          required,
          $each: {
            id: {
              required
            }
          }
        },
        anotherField: {
          required,
          numeric
        }
      }
    })
  })
})
