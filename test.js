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
    t.true(Object.keys(tidyReact.rules).length > 50);
});

test('no errors for good code', (t) => {
    const errors = lint('var React = require(\'react\');\nvar el = <div />;');
    t.deepEqual(errors, []);
});

test('requires react import', (t) => {
    const errors = lint('var el = <div />');
    t.deepEqual(getRules(errors), ['react/react-in-jsx-scope']);
});
