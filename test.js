import test from 'ava';
import isPlainObj from 'is-plain-obj';
import { ESLint } from 'eslint';
import tidyReact from './index.js';

const getRules = (errors) => {
    const ruleIds = errors.map((error) => {
        return error.ruleId;
    });
    return [...new Set(ruleIds)];
};

const lint = async (input, filePath = 'fixture.jsx') => {
    const [base, ...otherConfigs] = tidyReact;
    const linter = new ESLint({
        overrideConfig : [
            {
                ...base,
                // Work around ESLint not linting .jsx by default like XO does
                files : ['**/**.*']
            },
            ...otherConfigs
        ],
        overrideConfigFile : true
    });

    const [result] = await linter.lintText(input, { filePath });
    return result.messages;
};

test('config is valid', (t) => {
    t.true(Array.isArray(tidyReact));
    t.is(tidyReact.length, 1);
    t.true(isPlainObj(tidyReact[0]));
    t.true(isPlainObj(tidyReact[0].rules));
    t.true(Object.keys(tidyReact[0].rules).length >= 40);
    t.true(tidyReact[0].languageOptions.parserOptions.ecmaFeatures.jsx);
    t.is(typeof tidyReact[0].settings.react.version, 'string');
    t.true('react' in tidyReact[0].plugins);
});

test('requires react import', async (t) => {
    const bad = 'var el = <div />';
    const good = 'var React = require(\'react\');\n' + bad;
    t.deepEqual(getRules(await lint(bad)), ['react/react-in-jsx-scope']);
    t.deepEqual(await lint(good), []);
});

test('requires use of .jsx extension instead of .js', async (t) => {
    const good = 'var React = require(\'react\');\nvar el = <div />';
    t.deepEqual(getRules(await lint(good, 'fixture.js')), ['react/jsx-filename-extension']);
    t.deepEqual(await lint(good, 'fixture.jsx'), []);
    t.deepEqual(await lint(good), []);
});

test('requires arrow function components', async (t) => {
    const bad = 'var React = require(\'react\');\nfunction Foo() {\n    return <p>hi</p>;\n}';
    const good = 'var React = require(\'react\');\nvar Foo = () => {\n    return <p>hi</p>;\n};';
    t.deepEqual(getRules(await lint(bad)), ['react/function-component-definition']);
    t.deepEqual(await lint(good), []);
});

test('requires indentation of multiline logical expressions', async (t) => {
    const bad = 'var React = require(\'react\');\nvar el = (\n    <div>\n        {condition || (\n        <div />\n        )}\n    </div>\n);';
    const good = 'var React = require(\'react\');\nvar el = (\n    <div>\n        {condition || (\n            <div />\n        )}\n    </div>\n);';
    t.deepEqual(getRules(await lint(bad)), ['react/jsx-indent']);
    t.deepEqual(await lint(good), []);
});

test('prohibits use of && for conditionally rendering certain values', async (t) => {
    const bad = 'var React = require(\'react\');\nvar el = <div>{NaN && true}</div>';
    const good = 'var React = require(\'react\');\nvar el = <div>{Boolean(NaN) && true}</div>';
    const good2 = 'var React = require(\'react\');\nvar el = <div>{NaN || true}</div>';
    t.deepEqual(getRules(await lint(bad)), ['react/jsx-no-leaked-render']);
    t.deepEqual(await lint(good), []);
    t.deepEqual(await lint(good2), []);
});
