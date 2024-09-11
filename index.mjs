export const aliasErrorType = errorType => class extends errorType {
  constructor(message, options = {}, ...extra) {
    super(message, options, ...extra);
    if (globalThis.preventErrorAliasing) {
      return;
    }
    const split = this.stack.split('\n');
    const newStack = [split.slice(0, 1), ...split.slice(1 + (options.depth ?? 1))];
    this.stack = 'Aliased' + newStack.join('\n');
  }
};

export class ErrorAlias extends aliasErrorType(Error) {};
export class AggregateErrorAlias extends aliasErrorType(AggregateError) {};
export class EvalErrorAlias extends aliasErrorType(EvalError) {};
export class RangeErrorAlias extends aliasErrorType(RangeError) {};
export class SyntaxErrorAlias extends aliasErrorType(SyntaxError) {};
export class TypeErrorAlias extends aliasErrorType(TypeError) {};
export class URIErrorAlias extends aliasErrorType(URIError) {};
