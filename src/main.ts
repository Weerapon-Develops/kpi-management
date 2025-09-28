import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';

// ⭐ import Chart.js register helpers
import { Chart, registerables } from 'chart.js';

// ⭐ register controllers/elements/plugins ทุกอย่าง
Chart.register(...registerables);

platformBrowser().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));
