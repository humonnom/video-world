abstract class BaseSchema {
  protected rules: ((value: any) => void)[] = [];
  protected hasOptional = false;

  abstract validate(value: any): void;

  optional() {
    this.hasOptional = true;
    return this;
  }

  required() {
    this.rules.push((value: any) => {
      if (value === null || value === undefined || value === '') {
        throw new Error('해당 필드는 필수 입력 항목입니다.');
      }
    });
    return this;
  }

  validateSync(value: any): string | null {
    try {
      this.validate(value);
      return null;
    } catch (error) {
      return (error as Error).message;
    }
  }
}

export { BaseSchema };

class StringSchema extends BaseSchema {
  validate(value: string) {
    if (this.hasOptional && value === '') {
      return;
    }
    this.rules.forEach((rule) => rule(value));
  }

  email() {
    this.rules.push((value: any) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        throw new Error('유효한 이메일 주소를 입력해주세요.');
      }
    });
    return this;
  }

  min(length: number) {
    this.rules.push((value: any) => {
      if (value.length < length) {
        throw new Error(`최소 ${length}자 이상 입력해주세요.`);
      }
    });
    return this;
  }

  matches(regex: RegExp, options?: { message?: string }) {
    this.rules.push((value: any) => {
      if (!regex.test(value)) {
        throw new Error(options?.message ?? '입력 형식이 올바르지 않습니다.');
      }
    });
    return this;
  }
}

function string() {
  return new StringSchema();
}

export { StringSchema, string };

class ArraySchema extends BaseSchema {
  private itemSchema: BaseSchema;

  constructor(itemSchema: BaseSchema) {
    super();
    this.itemSchema = itemSchema;
  }

  validate(value: any[]) {
    if (this.hasOptional && value.length === 0) {
      return;
    }
    value.forEach((item, index) => {
      try {
        this.itemSchema.validate(item);
      } catch (error) {
        throw new Error(`${index}번 요소: ${(error as Error).message}`);
      }
    });
  }
}

function array(itemSchema: BaseSchema) {
  return new ArraySchema(itemSchema);
}

export { ArraySchema, array };
