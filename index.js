'use strict';

module.exports = {
    extends : 'xo-react',
    rules   : {
        'react/display-name'    : 'error',
        'react/forbid-elements' : ['error', {
            forbid : ['blink']
        }],
        'react/forbid-prop-types' : ['error', {
            forbid : ['any', 'array']
        }],
        'react/no-array-index-key'       : 'error',
        'react/no-children-prop'         : 'error',
        'react/no-danger'                : 'error',
        'react/no-danger-with-children'  : 'error',
        'react/no-deprecated'            : 'error',
        'react/no-did-mount-set-state'   : ['error', 'disallow-in-func'],
        'react/no-did-update-set-state'  : ['error', 'disallow-in-func'],
        'react/no-direct-mutation-state' : 'error',
        'react/no-find-dom-node'         : 'error',
        'react/no-is-mounted'            : 'error',
        'react/no-render-return-value'   : 'error',
        'react/no-unescaped-entities'    : 'error',
        'react/no-unknown-property'      : 'error',
        'react/no-unused-prop-types'     : ['error', {
            skipShapeProps : true
        }],
        'react/no-will-update-set-state'     : ['error', 'disallow-in-func'],
        'react/prefer-es6-class'             : 'error',
        'react/prefer-stateless-function'    : 'error',
        'react/prop-types'                   : 'error',
        'react/react-in-jsx-scope'           : 'error',
        'react/require-render-return'        : 'error',
        'react/sort-comp'                    : 'error',
        'react/sort-prop-types'              : 'error',
        'react/static-property-placement'    : ['error', 'property assignment'],
        'react/style-prop-object'            : 'error',
        'react/jsx-closing-bracket-location' : ['error', 'line-aligned'],
        'react/jsx-equals-spacing'           : ['error', 'never'],
        'react/jsx-filename-extension'       : 'error',
        'react/jsx-first-prop-new-line'      : ['error', 'multiline'],
        'react/jsx-handler-names'            : 'error',
        'react/jsx-indent'                   : ['error', 4, {
            checkAttributes          : true,
            indentLogicalExpressions : true
        }],
        'react/jsx-indent-props'       : ['error', 4],
        'react/jsx-max-props-per-line' : ['error', {
            maximum : 4,
            when    : 'always'
        }],
        'react/jsx-no-comment-textnodes' : 'error',
        'react/jsx-no-duplicate-props'   : ['error', {
            ignoreCase : true
        }],
        'react/jsx-sort-props' : ['error', {
            callbacksLast        : true,
            noSortAlphabetically : true,
            reservedFirst        : true,
            shorthandFirst       : true
        }],
        'react/jsx-tag-spacing' : ['error', {
            afterOpening      : 'never',
            beforeClosing     : 'never',
            beforeSelfClosing : 'always',
            closingSlash      : 'never'
        }],
        'react/jsx-uses-react' : 'error',
        'react/jsx-uses-vars'  : 'error'
    }
};
