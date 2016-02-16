import {Page} from 'ionic/ionic';
import {Page2} from '../page2/page2';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab2Root = Page2;
  }
}
