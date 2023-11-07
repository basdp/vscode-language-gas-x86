// Generate gas-preprocess.tmLanguage.json from gas.tmLanguage

'use strict';

var fs = require('fs');
var plist = require('fast-plist');

const original = plist.parse(fs.readFileSync('./syntaxes/gas.tmLanguage', 'utf8'));

const grammar = {
    name: 'GAS/AT&T x86/x64 to be preprocessed',
    fileTypes: ['S', 'sx'],
    patterns: [
        {
            name: 'support.constant.preprocessor',
            match: '^\\s*(?<!#)((#(#(?!#)|(un)?assert|define|elif|else|endif|error|ident|(ifn?|un)?def|if|import|include(_next)?|line|pragma|sccs|warning))|__(FILE|LINE|DATE|TIME(STAMP)?|STDC_(VERSION|HOSTED)?|GNUC|GNUC_MINOR|GNUC_PATCHLEVEL|VERSION|STRICT_ANSI|BASE_FILE|INCLUDE_LEVEL|OPTIMIZE|OPTIMIZE_SIZE|NO_INLINE|CHAR_UNSIGNED|CHAR_BIT|INT_SHORT|SCHAR_MAX|SHRT_MAX|INT_MAX|LONG_MAX|LONG_LONG_MAX|REGISTER_PREFIX|USER_LABEL_PREFIX)__)\\b'
        },
        {
            name: 'invalid.warnings',
            match: '^\\s*(#\\s+((un)?assert|define|elif|else|endif|error|ident|(ifn?|un)?def|if|import|include(_next)?|line|pragma|sccs|warning)\\b).*'
        }
    ].concat(original.patterns),
    scopeName: 'source.x86.preprocess',
};

fs.writeFileSync('./syntaxes/gas-preprocess.tmLanguage.json', JSON.stringify(grammar, null, 2));
