import { Component, OnInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { WidgetModule } from './widget/widget.module';

declare global {
  interface Window {
    Studio: any;
  }
}

const config = {
  jsUrl: 'https://api.dev.mapworks.io/studio/latest/js/studio-core.js',
  cssUrl: 'https://api.dev.mapworks.io/studio/latest/css/studio-core.css',
  resourceUrl: 'https://api.dev.mapworks.io/resources',
  mapUrl: 'https://api.dev.mapworks.io/maps/latest',
  studioUrl: 'https://api.dev.mapworks.io/studio/latest',
  mapId: 'AVLi4IKVzzDc1QqSK-km',
  challenge: 'lky',
  peliasPath: 'https://pelias.dev.mapworks.io',
  sessionPath: 'https://app.dev.mapworks.io/users/plugins/mapworks/getLoginStatus.php',
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  map: any;

  fetchStudio() {
    if (!window.Studio) {
      let toLoad = 2;
      const onLoad = () => {
        toLoad--;
        return toLoad || this.renderStudio();
      };

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = config.jsUrl || '';
      script.onload = onLoad;
      document.head.appendChild(script);

      const link = document.createElement('link');
      link.href = config.cssUrl || '';
      link.rel = 'stylesheet';
      link.onload = onLoad;
      document.head.appendChild(link);
    } else {
      this.renderStudio();
    }
  }

  renderStudio() {
    const conf = {
      map: config.mapId,
      mode: window.Studio.core.Map.Mode.MAP,
      resourcesPath: config.resourceUrl,
      mapPath: config.mapUrl,
      studioPath: config.studioUrl,
      navigationControl: false,
      scaleControl: true,
      toolbarControl: true,
      zoomControl: false,
      challenge: config.challenge,
      mapworksPeliasPath: config.peliasPath,
      mapworksSessionPath: config.sessionPath,
    };

    this.map = new window.Studio.core.Map(
      document.getElementsByClassName('studio-container'),
      conf
    )
    .load((err, map) => (
      err
      ? console.error(err)
      : map.once('ready', () => {
        window.Studio.app.App.init(
          window.Studio,
          map,
          conf
        );
        this.initTool();
      })
    ));
  }

  initTool() {
    const toolbar = this.map.getControl('toolbar');
    const { _, Backbone } = window.Studio;
    const TabModel = _.findValue(
      window.Studio,
      [
        'app',
        'component',
        'panel',
        'tab',
        'Model',
      ].join('.')
    );

    const MyView = Backbone.View.extend({
      template: '<app-widget-container></app-widget-container>',
      render() {
        this.$el.html(this.template);
        return this;
      }
    });

    const view = new MyView().render();


    toolbar.collection.add(
      new TabModel({
        id: 'widget',
        title: 'Widget',
        iconClass: 'glyphicon glyphicon-ice-lolly',
        view: view,
      }),
      { at: 3 }
    );

    view.once('show', () => {
      platformBrowserDynamic().bootstrapModule(WidgetModule);
    });
  }

  ngOnInit() {
    this.fetchStudio();
  }
}
