import { swiper } from 'src/swiper2';

import { annualReports } from './annualReport';
import { jobylon } from './jobylon';
import { library } from './library';
import { openCoaching } from './openCoaching';
import { senja } from './senja';
import { globalSwiper } from './swiper';

window.Webflow ||= [];
window.Webflow.push(() => {
  annualReports();
  jobylon();
  library();
  openCoaching();
  swiper();
  senja();
  // globalSwiper();
});
