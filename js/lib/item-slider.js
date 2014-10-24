/*-----------------------------------------------------
* ▼ itemSlide ▼
-----------------------------------------------------*/
var ItemSlide = function( i_el ) {

  this.$_el         = $( i_el );
  this.$_button     = $(" ボタン要素 ");
  this.$_prevButton = $(" 戻るボタン要素 ");
  this.$_nextButton = $(" 進むボタン要素 ");

  this._size   = "流すアイテムの幅";
  this._length = "何分割するのか";
  this._item   = this._size / this._length;

  // ここは状況に応じて増やす
  this._point1 = this._size - this._item * 5;
  this._point2 = this._size - this._item * 4;
  this._point3 = this._size - this._item * 3;
  this._point4 = this._size - this._item * 2;
  this._point5 = this._size - this._item;

  this._flg           = true;
  this._s             = null;
  this._matrix        = null;
  this._matrix3d      = null;
  this._matrixDefault = "matrix(1, 0, 0, 1, 0, 0)";

  this._init.apply( this );

}
ItemSlide.prototype = {

  //-------------------------------------------------
  // initialize
  //-------------------------------------------------
  _init : function() {

    var _userAgent = window.navigator.userAgent.toLowerCase();
    var _appVersion = window.navigator.appVersion.toLowerCase();

    if (( _userAgent.indexOf("msie") != -1 ) && ( _appVersion.indexOf("msie 9.") != -1 )) {

      this._ie();

    } else {

      this._animate();
      this.$_button.on( "click", $.proxy( this._isStop , this ) );
      this.$_prevButton.on( "click", $.proxy( this._onPrevClick, this ) );
      this.$_nextButton.on( "click", $.proxy( this._onNextClick, this ) );

    };

  },


  //-------------------------------------------------
  // block low version ie
  //-------------------------------------------------
  _ie : function() {

    this.$_el.attr("src", "/path/to/image"); // ie9 のときは代替画像を出す
    this.$_prevButton.hide();
    this.$_nextButton.hide();

  },


  //-------------------------------------------------
  // animate
  //-------------------------------------------------
  _animate : function() {

    if( this._flg === false ) {

      return;

    } else {

      this.$_el.css({

         "transform" : "matrix(1, 0, 0, 1, " + -this._size + ", 0)",
         "transition-duration" : "20s"

      }).on( "transitionend webkitTransitionEnd", $.proxy( this._complete, this ) );

    }

  },

  //-------------------------------------------------
  // complete
  //-------------------------------------------------
  _complete : function() {

    if( this._flg === false ) {

      return;

    } else {

      this.$_el.css({

       "transform" : this._matrixDefault,
       "transition-duration" : "1s"

      }).on( "transitionend webkitTransitionEnd", $.proxy( this._animate, this ) );

    }

  },

  //-------------------------------------------------
  // stop animation
  //-------------------------------------------------
  _isStop : function() {

    this._flg = false;
    this._matrix3d = this.$_el.css("transform");

    this.$_el.css({

     "transform" : this._matrix3d,
     "transition-duration" : "1s"

    });

  },

  //-------------------------------------------------
  // on prev click
  //-------------------------------------------------
  _onPrevClick : function() {

    if( this._matrix3d === this._matrixDefault ) {

      this._matrix = 0

    } else {

      this._matrix = this._matrix3d.split( "," );
      this._matrix = parseInt( this._matrix[4].replace( ",","" ), 10 );

    };

    // ここの if もよしなに増やす
    if( this._matrix <= this._point1 && this._matrix >= -this._point2 ) {

      this.$_prevButton.hide();
      this._s = this._matrixDefault;


    } else if( this._matrix <= -this._point2 && this._matrix >= -this._point3 ) {

      this._s = "matrix(1, 0, 0, 1, " + -this._point2 + ", 0)";

    } else if( this._matrix <= -this._point3 && this._matrix >= -this._point4 ) {

      this._s = "matrix(1, 0, 0, 1, " + -this._point3 + ", 0)";

    } else if( this._matrix <= -this._point4 && this._matrix >= -this._point5 ) {

      this._s = "matrix(1, 0, 0, 1, " + -this._point4 + ", 0)";

    } else if( this._matrix <= -this._point5 ) {

      this.$_nextButton.show();
      this._s = "matrix(1, 0, 0, 1, " + -this._point5 + ", 0)";

    }

    this.$_el.css({

     "transform" : this._s,
     "transition-duration" : "1s"

    });

    return false;

  },

  //-------------------------------------------------
  // on next click
  //-------------------------------------------------
  _onNextClick : function() {

    if( this._matrix3d === this._matrixDefault ) {

      this._matrix = 0

    } else {

      this._matrix = this._matrix3d.split( "," );
      this._matrix = parseInt( this._matrix[4].replace( ",","" ), 10 );

    };

    // ここの if もよしなに増やす
    if( this._matrix <= this._point1 && this._matrix > -this._point2 ) {

      this.$_prevButton.show();
      this._s = "matrix(1, 0, 0, 1, " + -this._point2 + ", 0)";

    } else if( this._matrix <= -this._point2 && this._matrix > -this._point3 ) {

      this._s = "matrix(1, 0, 0, 1, " + -this._point3 + ", 0)";

    } else if( this._matrix <= -this._point3 && this._matrix > -this._point4 ) {

      this._s = "matrix(1, 0, 0, 1, " + -this._point4 + ", 0)";

    } else if( this._matrix <= -this._point4 && this._matrix > -this._point5 ) {

      this._s = "matrix(1, 0, 0, 1, " + -this._point5 + ", 0)";

    } else if( this._matrix <= -this._point5 ) {

      this.$_nextButton.hide();
      this._s = "matrix(1, 0, 0, 1, " + -this._size + ", 0)";

    }

    this.$_el.css({

     "transform" : this._s,
     "transition-duration" : "1s"

    });

    return false;

  }

};
/*-----------------------------------------------------
* ▲ itemSlide ▲
-----------------------------------------------------*/
