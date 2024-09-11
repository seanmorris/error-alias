# seanmorris/error-alias

Install with NPM.

```bash
$ npm i error-alias
```

The Error Alias package allows library designers to provide downstream developers with cleaner stack traces. It adda a new option, `{depth}` to the second parameter of `Error` types. Tbhis allows you to remove internal layers from the top of your traces.

This allows your traces to point directly to the line your external function was called on, rather than to a point deep within your library.

```javascript
import ErrorAlias from 'error-alias';

function canThrow(x) {
  if (typeof x !== 'string') {
    throw new ErrorAlias(`canThrow param.0 must be a string, got ${typeof x}`);
  }
}

canThrow(321);
```
```
AliasedError: canThrow param.0 must be a string, got number
    at file:///home/sean/projects/errorAlias/scratch.mjs:9:1
    at ModuleJob.run (node:internal/modules/esm/module_job:195:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:336:24)
    at async loadESM (node:internal/process/esm_loader:34:7)
    at async handleMainPromise (node:internal/modules/run_main:106:12)
```

You can also provide the `depth` option if you're throwing the error from deeper in the code:

```javascript
import ErrorAlias from 'error-alias';

function internalFunc(x) {
  if (typeof x !== 'string') {
    throw new ErrorAlias(`canThrow param.0 must be a string, got ${typeof x}`, {depth: 2});
  }
}

function canThrow(x) {
  internalFunc(x);
}

canThrow(321);
```


If you, or a downstream developer need to see more detail, they can disable the stacktrace alteration by setting `globalThis.preventErrorAliasing` to `true`.

```javascript
globalThis.preventErrorAliasing = true;
```

## Built-in Error Types

The Error Alias package provides aliases for standard `Error` objects and seven built-in subtypes:

### ErrorAlias

Aliases `Error()`:

```javascript
import { ErrorAlias } from 'error-alias';

// throw new Error();
throw new ErrorAlias();
```

### AggregateErrorAlias

Aliases `AggregateError()`:

```javascript
import { AggregateErrorAlias } from 'error-alias';

// throw new AggregateError();
throw new AggregateErrorAlias();
```

### EvalErrorAlias

Aliases `EvalError()`:

```javascript
import { EvalErrorAlias } from 'error-alias';

// throw new EvalError();
throw new EvalErrorAlias();
```

### RangeErrorAlias

Aliases `RangeError()`:

```javascript
import { RangeErrorAlias } from 'error-alias';

// throw new RangeError();
throw new RangeErrorAlias();
```

### SyntaxErrorAlias

Aliases `SyntaxError()`:

```javascript
import { SyntaxErrorAlias } from 'error-alias';

// throw new SyntaxError();
throw new SyntaxErrorAlias();
```

### SyntaxErrorAlias

Aliases `TypeError()`:

```javascript
import { TypeErrorAlias } from 'error-alias';

// throw new TypeError();
throw new TypeErrorAlias();
```

### URIErrorAlias

Aliases `URIError()`:

```javascript
import { URIErrorAlias } from 'error-alias';

// throw new URIError();
throw new URIErrorAlias();
```

## Aliasing Custom Error Types

You can import the function `aliasErrorType` and pass it a class to create an Alias type.

```javascript
import { aliasErrorType } from 'error-alias';

class MyErrorType extends Error { /* Custom implementation here */ };

const MyErrorAlias = aliasErrorType(MyErrorType);

// throw new MyError();
throw new MyErrorAlias();
```

## 🍻 Licensed under the Apache License, Version 2.0

&copy; 2024 Sean Morris

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

http://www.apache.org/licenses/LICENSE-2.0
