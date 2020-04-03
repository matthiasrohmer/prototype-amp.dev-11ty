const { RenderedDocument } = require('./RenderedDocument.js');

module.exports.do = function(nunjucksEngine) {
  return new function() {
    this.tags = ['do'];

    this.parse = function(parser, nodes, lexer) {
      var tok = parser.nextToken();

      var args = parser.parseSignature(null, true);
      parser.advanceAfterBlockEnd(tok.value);

      return new nodes.CallExtensionAsync(this, 'run', args);
    };

    this.run = function(context, arg, callback) {
      // if (!context['doc']) {
      //   context['doc'] = new RenderedDocument();
      // }
      //
      callback(null, new nunjucksEngine.runtime.SafeString(''));
    };
  }();
}

module.exports.with = function(nunjucksEngine) {
    this.tags = ['with'];

    this.parse = (parser, nodes, lexer) => {
        var start = parser.tokens.index;
        var symboltok = parser.nextToken();

        var args = parser.parseSignature(null, true);
        var current = parser.tokens.index;

        // fast backup to where we started
        parser.tokens.backN(current - start);
        // slow backup to before block open
        while (parser.tokens.current() !== '{') {
            parser.tokens.back();
        }
        // clear saved peek
        parser.peeked = null;
        // peek up to block end
        var peek;
        while (peek = parser.peekToken()) {
            if (peek.type === lexer.TOKEN_BLOCK_END) {
                break;
            }
            parser.nextToken();
        }
        // the length of the block end
        parser.tokens.backN(2);
        // fake symboltok to fool advanceAfterBlockEnd name detection in parseRaw
        parser.peeked = symboltok;
        // we are right up to the edge of end-block, so we are "in_code"
        parser.tokens.in_code = true;
        // get the raw body!
        var body = parser.parseRaw('with');

        return new nodes.CallExtension(this, 'run', args, [body]);
    };

    this.run = (context, args, body) => {
        // custom logic ...
        // var ctx = Object.assign({}, context.ctx, {
        //     newVar: 'new',
        //     overrideVar: 'override'
        // });
        // return new nunjucksEngine.runtime.SafeString(nunjucksEngine.renderString(body(), ctx));
        return '';
    };
}
