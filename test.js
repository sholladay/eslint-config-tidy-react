import path from 'path';
import test from 'ava';
import isPlainObj from 'is-plain-obj';
import eslint from 'eslint';
import tidyReact from '.';

const getRules = (errors) => {
    const ruleIds = errors.map((error) => {
        return error.ruleId;
    });
    return [...new Set(ruleIds)];
};

const lint = (input) => {
    const linter = new eslint.CLIEngine({
        useEslintrc : false,
        configFile  : path.join(__dirname, 'index.js')
    });

    return linter.executeOnText(input).results[0].messages;
};

test('config is valid', (t) => {
    t.true(isPlainObj(tidyReact));
    t.is(typeof tidyReact.extends, 'string');
    t.true(tidyReact.extends.length > 1);
    t.true(isPlainObj(tidyReact.rules));
    t.true(Object.keys(tidyReact.rules).length >= 40);
});

test('requires react import', (t) => {
    const bad = 'var el = <div />';
    const good = 'var React = require(react);\n' + bad;
    t.deepEqual(getRules(lint(bad)), ['react/react-in-jsx-scope']);
    t.deepEqual(lint(good), []);
});

test('requires indentation of multiline logical expressions', (t) => {
    const bad = 'var React = require(\'react\');\nvar el = (\n    <div>\n        {condition && (\n        <div />\n        )}\n    </div>\n);';
    const good = 'var React = require(\'react\');\nvar el = (\n    <div>\n        {condition && (\n            <div />\n        )}\n    </div>\n);';
    t.deepEqual(getRules(lint(bad)), ['react/jsx-indent']);
    t.deepEqual(lint(good), []);
});
