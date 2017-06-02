import test from 'ava';
import isPlainObj from 'is-plain-obj';
import eslint from 'eslint';
import tempWrite from 'temp-write';
import tidyReact from '.';

const hasRule = (errors, ruleId) => {
    return errors.some((err) => {
        return err.ruleId === ruleId;
    });
};

const runEslint = (str, conf) => {
    const linter = new eslint.CLIEngine({
        useEslintrc : false,
        configFile  : tempWrite.sync(JSON.stringify(conf))
    });

    return linter.executeOnText(str).results[0].messages;
};

test('main', (t) => {
    t.true(isPlainObj(tidyReact));
    t.true(isPlainObj(tidyReact.rules));

    const errors = runEslint('var app = <div className="foo">Unicorn</div>', tidyReact);
    t.true(hasRule(errors, 'react/react-in-jsx-scope'));
});

test('no errors', (t) => {
    const errors = runEslint('var React = require(\'react\');\nvar el = <div />;', tidyReact);
    t.deepEqual(errors, []);
});
