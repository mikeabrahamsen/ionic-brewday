import {Page} from 'ionic-angular';
import {RecipeList} from '../recipes/recipes';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab2Root = RecipeList;
  }
}
