import { Variable, Statement, Program } from './interfaces';
import { Lexer, WordToken } from './lexer';
import * as Is from './is';

// const isNormal = c => !isWhitespace(c) && !isCommandDelimiter(c) && !isSubs(c) && c !== '"' && c !== ')' && c !== ']' && !isBrace(c)

/**
 * Consume white-space and return resulting position.
 */
function skipWhitespace(
  input: string,
  start: number,
  includeNewlines: boolean = false,
): number {
  let pos = start;
  let c = input.charAt(pos);
  while (
    pos < input.length &&
    (Is.Whitespace(c) || (includeNewlines && c === '\n'))
  ) {
    pos += 1;
    c = input.charAt(pos);
  }
  return pos;
}

/**
 * Consume leading whitespace and comment and return resulting position.
 */
function skipComment(input: string, start: number): number {
  let pos = skipWhitespace(input, start, true);
  let c = input.charAt(pos);
  if (c === '#') {
    while (pos < input.length && c !== '\n') {
      pos += 1;
      c = input.charAt(pos);
    }
    if (c === '\n') {
      pos += 1;
    }
  }
  return pos;
}

/**
 * Parse the first command of the given input.
 */
function parseCommand(
  input: string,
  start: number,
  isNested: boolean,
): Variable {
  const node: Variable = {
    type: 'Command',
    value: '',
    start: 0,
    end: 0,
  };
  return node;
}

function parseOctal(input: string, start: number): Variable | null {
  let pos = start;
  let c = input.charAt(pos);
  let result = '';

  while (pos < input.length && result.length <= 3 && Is.Octal(c)) {
    result += c;
    pos += 1;
    c = input.charAt(pos);
  }

  if (!result) return null;

  return {
    type: 'Octal',
    value: String.fromCharCode(parseInt(result, 8)),
    start,
    end: start + result.length - 1,
  };
}

function parseHex(
  input: string,
  start: number,
  max: number,
): Variable | null {
  let pos = start;
  let c = input.charAt(pos);
  let result = '';

  while (pos < input.length && result.length <= max && Is.Hex(c)) {
    result += c;
    pos += 1;
    c = input.charAt(pos);
  }

  if (!result) return null;

  return {
    type: 'Hex',
    value: String.fromCharCode(parseInt(result, 16)),
    start,
    end: start + result.length - 1,
  };
}

function parseBackslash(input: string, start: number): Variable {
  let c = input.charAt(start + 1); // Assume first char is backslash
  let result = c;
  let end = start + 1;
  switch (true) {
    case c === 'a':
      result = String.fromCharCode(7);
      break;
    case c === 'b':
      result = '\b';
      break;
    case c === 'f':
      result = '\f';
      break;
    case c === 'n':
      result = '\n';
      break;
    case c === 'r':
      result = '\r';
      break;
    case c === 't':
      result = '\t';
      break;
    case c === 'v':
      result = '\v';
      break;
    case c === 'x': {
      const hex = parseHex(input, start + 2, 2);
      if (hex) {
        result = hex.value;
        end = hex.end;
      }
      break;
    }
    case c === 'u': {
      const hex = parseHex(input, start + 2, 4);
      if (hex) {
        result = hex.value;
        end = hex.end;
      }
      break;
    }
    case c === 'U': {
      const hex = parseHex(input, start + 2, 8);
      if (hex) {
        result = hex.value;
        end = hex.end;
      }
      break;
    }
    case Is.Octal(c): {
      const octal = parseOctal(input, start + 1);
      if (octal) {
        result = octal.value;
        end = octal.end;
      }
      break;
    }
    default: /* do nothing */
  }
  return {
    type: 'Backslash',
    value: result,
    start,
    end,
  };
}

function parseQuotedString(input: string, start: number) {}

function parseBraces(input: string, start: number): Variable {
  let pos = start + 1;
  let c = input.charAt(pos);
  let level = 1;
  let result = '';
  let done = false;

  while (pos < input.length && !done) {
    switch (c) {
      case '{':
        level += 1;
        result += c;
        break;

      case '}':
        level -= 1;
        if (level === 0) {
          done = true;
        } else {
          result += c;
        }
        break;

      case '\\': {
        const bs = parseBackslash(input, pos);
        result += bs.value === '\n' ? ' ' : bs.value;
        pos = bs.end;
        break;
      }

      default:
        result += c;
    }

    pos += 1;
    c = input.charAt(pos);
  }

  if (level !== 0) {
    // TODO: fix error message
    throw new Error('unmatched closing }');
  }

  return {
    type: 'Text',
    value: result,
    start,
    end: pos - 1,
  };
}

function parseWords(input: string, start: number) {
  let pos = start;
  let c = input.charAt(pos);
  let subVars = c !== '{';
  const tokens = [];

  while (pos < input.length) {}
}

export function Parse(input: string): Program {
  const lexer = Lexer(input);
  let token = lexer.nextToken();

  function nextToken(): WordToken | null {
    const val = token;
    token = lexer.nextToken();
    return val;
  }

  function nextStatement(): Statement | null {
    if (token === null) return null;

    const node = {
      type: 'Statement',
      words: [<WordToken>nextToken()],
    };
    while (token !== null && <number>token.index !== 0) {
      node.words.push(<WordToken>nextToken());
    }
    return node;
  }

  function program(): Program {
    const node: Program = {
      type: 'Program',
      statements: [],
    };
    let stmt: Statement | null = nextStatement();
    while (stmt) {
      node.statements.push(stmt);
      stmt = nextStatement();
    }
    return node;
  }

  return program();
}

// module.exports.parseScript = parseScript
// module.exports.parseWords = parseWords
// module.exports.parseWord = parseWord
export { parseBackslash, parseOctal, parseHex, parseBraces };