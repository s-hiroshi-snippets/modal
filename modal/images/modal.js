/**
 * modal dialog
 *
 * IE8 and more
 * Usage
 * $(window).modal();
 * $(window).modal('.modal');
 * $('div').modal();
 * ...
 *
 * @param {String} className a element class name
 */
jQuery.fn.modal = function(className) {

    // this refer to jQuery Object pointed to $('selector')
    var parent = (this.selector !== '') ? this.selector : '';
    className = className || '.modal';

    var hasDialog = false;

    return function() {
        var identifier;
        if (parent !== '') {
            identifier = parent + ' ' + 'a' + className;
        } else {
            identifier = 'a' + className;
        }
        $(identifier).click(function (e) {

            e.preventDefault();
            // ダイアログが作成されていないとき作成
            if (hasDialog === false) {
                $('body').append('<div id="modal-back"></div><div id="modal-front"></div>');
                $('#modal-back').click(function () {
                    $("#modal-back").hide();
                    $("#modal-front").hide();
                });
                hasDialog = true;
            }

            // 背景表示
            $('#modal-back').show();

            // ダイアログに表示する画像作成
            var img = new Image();
            // ミリ秒を指定することでImage.onloadイベントを必ず発生させる
            // this refer to HTMLAnchorElement
            img.src = $(this).attr('href') + '?'+ new Date().getTime();

            // 画像をダイアログに表示
            $(img).load(function() {
                $('#modal-front').html('<div><a class="close" href="#">close</a></div><div><img src="' + this.src + '" /></div>');

                // 画像を中央配置
                // this refer to HTMLImageElement

                // 横
                var left = Math.floor(($(window).width() - this.width) / 2);
                left = (left < 0) ? 30 : left;

                // 縦
                // スクロールバーのスクロール量取得
                var scroll = $(window).scrollTop();
                var top  = Math.floor(($(window).height() - this.height) / 2);
                top = scroll + ((top < 0) ? 30 : top);

                // 画像を配置
                $('#modal-front').css({
                    'position': 'absolute',
                    'z-index' : 40,
                    'top': top,
                    'left': left
                });

                // モーダルダイアログ表示
                $('#modal-front').fadeIn('slow');

                // モーダルダイアログを閉じる処理
                $('#modal-front .close').click(function(){
                    $("#modal-back").hide();
                    $("#modal-front").hide();
                    return false;
                });

            });

            return false;
        });

    }();
};