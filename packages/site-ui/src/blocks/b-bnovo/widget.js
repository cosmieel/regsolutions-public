function pageSize() {
  const w = window;
  const d = document;
  const element = d.documentElement;
  const g = d.querySelectorAll('body')[0];
  const x = w.innerWidth || element.clientWidth || g.clientWidth;
  const y = w.innerHeight || element.clientHeight || g.clientHeight;

  return { width: x, height: y };
}

export function createWidget(blockId, settings) {
  return {
    fullMode: () => `
<div id="booking_iframe" style="padding-bottom: 0px; position: relative;">
  <div id="bn_iframe" style='margin-top: 0px; font-family: "Proxima nova", "Helvetica Neue", "Cera Pro Medium", Arial, Helvetica, sans-serif; font-size: 12px; line-height: 1em; opacity: 0.5; z-index: 3;'>
    <div style='color: #1403FC !important; background: rgba(0, 0, 0, 0) !important;'>
      <a id="bnovo_link" href="https://bnovo.ru/bnovo-mb/?utm_source=client_modul_br" target="_blank" style="color: #808080 !important; background: #ffffff !important;">Система управления отелем Bnovo ©</a>
    </div>
  </div>
</div>

<style>
#bnovo_link {
  display: none !important;
}
</style>

<script src="https://widget.reservationsteps.ru/iframe/library/dist/booking_iframe.js"></script>
<script type="text/javascript">
  var BookingIframe = new BookingIframe(
    ${JSON.stringify(settings.bookingMode)}
  )
  BookingIframe.init()
</script>
`,

    miniMode() {
      const { width } = pageSize();
      const isSmallWindow = width <= 1024;

      return isSmallWindow ? this.mobile() : this.desktop();
    },

    desktop: () => `
<div class="div_for__bn_widget_fullwidth_page" id="div_for__bn_widget_full">
  <div id="absolute_div_for__bn_widget_full">
    <div class="left" id="_bn_widget_">
      <a href="http://bnovo.ru/" id="_bnovo_link_" target="_blank">Bnovo</a>
    </div>
  </div>
</div>

<div style="height:120px;" class="div_for__bn_widget_fullwidth_page"></div>

<script src="//widget.reservationsteps.ru/js/bnovo.js"></script>
<script type="text/javascript">
Bnovo_Widget.init(function() {
  Bnovo_Widget.open('_bn_widget_',
    ${JSON.stringify(Object.assign(settings.widgetMode, { type: 'horizontal' }))}
  );
});
</script>

<style>
#div_for__bn_widget_full {width: 100%; max-width: 936px; margin: auto; }
#absolute_div_for__bn_widget_full {position: absolute; width: 100%; max-width: 936px; z-index: 10}
#div_for__bn_widget_mobile {max-width: 640px;width: 100%; margin: auto;}
#absolute_div_for__bn_widget_mobile {position: absolute; width: calc(100% - 10px); max-width: 640px; z-index: 10}

.div_for__bn_widget_ {display: none;}

@media (max-width: 1024px) {
  #block-${blockId} { display: none; }
}

#block-bnovo-${blockId} {
  margin-bottom: -35px;
}

#_bn_widget_ a {
  background: transparent !important;
}
</style>
`,

    mobile: () => `
<div id="absolute_div_for__bn_widget_full">
  <div class="left" id="_bn_widget_">
    <a href="https://bnovo.ru/" id="_bnovo_link_" target="_blank">Bnovo</a>
  </div>
</div>

<div class="div_for__bn_widget_fullwidth_page"></div>

<script src="//widget.reservationsteps.ru/js/bnovo.js"></script>
<script type="text/javascript">
Bnovo_Widget.init(function() {
  Bnovo_Widget.open('_bn_widget_',
    ${JSON.stringify(Object.assign(settings.widgetMode, { type: 'vertical' }))}
  );
});
</script>

<style>
#div_for__bn_widget_full {
  width: 100%;
  margin: auto;
}

.div_for__bn_widget_fullwidth_page {
  height: 288px;
}

.bnovo-block_with-promo .div_for__bn_widget_fullwidth_page {
  height: 352px;
}

#absolute_div_for__bn_widget_full {
  position: absolute;
  z-index: 10;
}

@media (max-width: 620px) {
  #absolute_div_for__bn_widget_full {
    width: calc(100% - 32px);
  }
}

@media (min-width: 621px) and (max-width: 1024px) {
  #absolute_div_for__bn_widget_full {
    width: calc(100% - 48px);
  }
}

@media (min-width: 1024px) {
  #block-${blockId} { display: none; }
}

#_bn_widget_ a {
  background: transparent !important;
}
</style>
`,
  };
}
