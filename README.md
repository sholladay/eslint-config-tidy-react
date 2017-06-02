# eslint-config-tidy-react [![Build status for eslint-config-tidy-react on Circle CI.](https://img.shields.io/circleci/project/sholladay/eslint-config-tidy-react/master.svg "Circle Build Status")](https://circleci.com/gh/sholladay/eslint-config-tidy-react "ESLint Config Tidy React Builds")

> ESLint [shareable config](http://eslint.org/docs/developer-guide/shareable-configs.html) for [React](https://facebook.github.io/react/) with Tidy style.

## Why?

 - Consistency.
 - Clarity.
 - Simplicity.

## Install

```sh
npm install eslint-config-tidy eslint-config-tidy-react eslint-plugin-react --save-dev
```

## Usage

Add some [XO](https://github.com/sindresorhus/xo) config to your package.json:

```json
{
    "name": "my-awesome-project",
    "xo": {
        "extend": ["tidy", "tidy-react"]
    }
}
```

## Related

- [eslint-config-tidy](https://github.com/sholladay/eslint-config-tidy) - ESLint shareable config for Tidy style
- [XO](https://github.com/sindresorhus/xo) - Linter based on ESLint

## Contributing

See our [contributing guidelines](https://github.com/sholladay/eslint-config-tidy-react/blob/master/CONTRIBUTING.md "The guidelines for participating in this project.") for more details.

1. [Fork it](https://github.com/sholladay/eslint-config-tidy-react/fork).
2. Make a feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. [Submit a pull request](https://github.com/sholladay/eslint-config-tidy-react/compare "Submit code to this project for review.").

## License

[MPL-2.0](https://github.com/sholladay/eslint-config-tidy-react/blob/master/LICENSE "The license for eslint-config-tidy-react.") © [Seth Holladay](http://seth-holladay.com "Author of eslint-config-tidy-react.")

Go make something, dang it.
