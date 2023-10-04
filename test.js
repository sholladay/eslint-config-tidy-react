import test from 'ava';
import isPlainObj from 'is-plain-obj';
import { ESLint } from 'eslint';
import tidyReact from '.';

const getRules = (errors) => {
    const ruleIds = errors.map((error) => {
        return error.ruleId;
    });
    return [...new Set(ruleIds)];
};

const lint = async (input) => {
    const linter = new ESLint({
        useEslintrc    : false,
        overrideConfig : {
            ...tidyReact,
            parserOptions : {
                ...tidyReact.parserOptions,
                ecmaVersion : 'latest'
            }
        }
    });

    const [result] = await linter.lintText(input);
    return result.messages;
};

test('config is valid', (t) => {
    t.true(isPlainObj(tidyReact));
    t.is(typeof tidyReact.extends, 'string');
    t.true(tidyReact.extends.length > 1);
    t.true(isPlainObj(tidyReact.rules));
    t.true(Object.keys(tidyReact.rules).length >= 40);
});

test('requires react import', async (t) => {
    const bad = 'var el = <div />';
    const good = 'var React = require(react);\n' + bad;
    t.deepEqual(getRules(await lint(bad)), ['react/react-in-jsx-scope']);
    t.deepEqual(await lint(good), []);
});

test('requires indentation of multiline logical expressions', async (t) => {
    const bad = 'var React = require(\'react\');\nvar el = (\n    <div>\n        {condition && (\n        <div />\n        )}\n    </div>\n);';
    const good = 'var React = require(\'react\');\nvar el = (\n    <div>\n        {condition && (\n            <div />\n        )}\n    </div>\n);';
    t.deepEqual(getRules(await lint(bad)), ['react/jsx-indent']);
    t.deepEqual(await lint(good), []);
});

test('requires arrow function components', async (t) => {
    const bad = 'var React = require(\'react\');\nfunction Foo() {\n    return <p>hi</p>;\n}';
    const good = 'var React = require(\'react\');\nvar Foo = () => {\n    return <p>hi</p>;\n};';
    t.deepEqual(getRules(await lint(bad)), ['react/function-component-definition']);
    t.deepEqual(await lint(good), []);
});
